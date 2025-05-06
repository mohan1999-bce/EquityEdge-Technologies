from App.db import get_session
from App.Models.investment import Investment
from App.Services.user_dao import get_balance, update_balance
from App.Services.portfolio_dao import get_portfolio_by_id
from datetime import date


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