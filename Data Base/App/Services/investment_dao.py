from App.db import get_session
from App.Models.investment import Investment
from App.Services.user_dao import get_balance, update_balance
from App.Services.portfolio_dao import get_portfolio_by_id
from datetime import date


def get_investment(investment_id):
    with get_session() as session:
        Investments = session.query(Investment).filter(Investment.id == investment_id).all()
        return Investments

def harvest_investment(investment_id):
    with get_session() as session:
        investment = session.query(Investment).filter(Investment.id == investment_id).all()
        if len(investment) == 0:
            return
        investment = investment[0]
        session.delete(investment)  # delete the investment from the database
        session.commit()
        if investment is None:
            raise Exception(f"Investment with id {investment_id} does not exist")                     # raise error
        investment.is_harvested = True
        session.commit()

def update_qty(investment_id, quantity):
    with get_session() as session:
        investment = session.query(Investment).filter(Investment.id == investment_id).all()
        if len(investment) == 0:
            raise Exception(f"Investment with id {investment_id} does not exist")                     # raise error
        investment = investment[0]
        investment.quantity = quantity
        session.commit()

def create_new(portfolio_id, ticker, price, quantity):
    # Check if the user has enogh balance to make the investment
    portfolios = get_portfolio_by_id(portfolio_id)
    if len(portfolios) == 0:
        raise Exception(f"Portfolio with id {portfolio_id} does not exist")                     # raise error
    userId = portfolios[0].userId
    balance = get_balance(userId)
    purchase_price = price * quantity
    if balance < purchase_price:
        raise Exception(f"You not have enough balance to make the investment")                  # raise error
    
    investment = Investment(portfolio_id=portfolio_id, quantity=quantity, ticker=ticker, price=price, date=date.today())
    with get_session() as session:
        session.add(investment)
        session.commit()
        # Update the user's balance
        update_balance(userId, balance - purchase_price)
    
def sell(investment_id, quantity, sale_price):
    investment = get_investment_by_id(investment_id)
    if len(investment) == 0:
        raise Exception(f"Investment with id {investment_id} does not exist")                     # raise error
    investment = investment[0]
    available_quantity = investment.quantity
    if available_quantity == 0:
        raise Exception(f"You not have any quantity to sell")                                     # raise error
    if investment.quantity < quantity:
        raise Exception(f"You not have enough quantity to sell")                                 # raise error
    proceeds = sale_price * quantity
    with get_session() as session:
        investment.quantity -= quantity
        session.commit()
    if quantity == available_quantity:
        harvest_investment(investment_id)
    else:
        update_qty=available_quantity - quantity
        update_qty(investment_id, update_qty)
    proceeds = sale_price * quantity
    portfolio = get_portfolio_by_id(investment.portfolio_id)
    userId = portfolio.userId
    old_balance = get_balance(userId)
    update_balance(userId, old_balance + proceeds)  # Update the user's balance
    