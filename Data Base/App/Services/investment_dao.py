from App.db import get_session
from App.Models.investment import Investment
from App.Services.user_dao import get_balance, update_balance
from App.Services.portfolio_dao import get_portfolio_by_id
from datetime import date
from App.Models.exceptions.queryexception import QueryException
from app.models.investment import Investment


from typing import List
from datetime import date
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound

def get_investments_by_portfolio(portfolio_id: int) -> List[Investment]:
    try:
        if not isinstance(portfolio_id, int):
            raise Exception(f'Portfolio ID must be an int. Found {portfolio_id}')
        return Investment.query.filter_by(portfolio_id=portfolio_id).all()
    except Exception as e:
        raise QueryException(f'Failed to get investments with portfolio ID {portfolio_id}: {str(e)}')


def get_investment_by_id(investment_id: int) -> Investment:
    try:
        if not isinstance(investment_id, int):
            raise Exception(f'Investment ID must be an int. Found {investment_id}')
        return Investment.query.filter_by(id=investment_id).one()
    except NoResultFound:
        raise QueryException(f'No investment exists with ID {investment_id}')
    except MultipleResultsFound:
        raise QueryException(f'Multiple investments found with the same ID {investment_id}')
    except Exception as e:
        raise QueryException(f'Failed to get investment with ID {investment_id}: {str(e)}')


def harvest_investment(investment_id: int) -> None:
    try:
        if not isinstance(investment_id, int):
            raise Exception(f'Investment ID must be an int. Found {investment_id}')
        investment = get_investment_by_id(investment_id)
        db.session.delete(investment)
        db.session.commit()
    except NoResultFound:
        raise QueryException(f'No investment exists with ID {investment_id}')
    except MultipleResultsFound:
        raise QueryException(f'Multiple investments found with the same ID {investment_id}')
    except Exception as e:
        db.session.rollback()
        raise QueryException(f'Failed to harvest investment with ID {investment_id}: {str(e)}')


def update_qty(investment_id: int, quantity: int) -> None:
    try:
        if not isinstance(investment_id, int) or not isinstance(quantity, int):
            raise Exception(f'Both investment ID and quantity must be integers. Found: ID={investment_id}, Qty={quantity}')
        investment = get_investment_by_id(investment_id)
        investment.quantity = quantity
        db.session.commit()
    except NoResultFound:
        raise QueryException(f'No investment exists with ID {investment_id}')
    except MultipleResultsFound:
        raise QueryException(f'Multiple investments found with the same ID {investment_id}')
    except Exception as e:
        db.session.rollback()
        raise QueryException(f'Failed to update quantity for investment ID {investment_id}: {str(e)}')


def create_new(portfolio_id: int, ticker: str, price: float, quantity: int) -> None:
    try:
        portfolios = get_portfolio_by_id(portfolio_id)
        if not portfolios:
            raise Exception(f'Portfolio with ID {portfolio_id} does not exist')
        userId = portfolios[0].userId
        balance = get_balance(userId)
        purchase_price = price * quantity
        if balance < purchase_price:
            raise Exception('Insufficient funds to complete the investment')
        investment = Investment(portfolio_id=portfolio_id, ticker=ticker, price=price, quantity=quantity, date=date.today())
        db.session.add(investment)
        db.session.commit()
        update_balance(userId, balance - purchase_price)
    except Exception as e:
        db.session.rollback()
        raise QueryException('Failed to create new investment', e)


def sell(investment_id: int, quantity: int, sale_price: float) -> None:
    try:
        investment = get_investment_by_id(investment_id)
        available_quantity = investment.quantity
        if quantity > available_quantity:
            raise Exception(f'Requested quantity ({quantity}) exceeds available quantity ({available_quantity})')
        if quantity == available_quantity:
            harvest_investment(investment_id)
        else:
            update_qty(investment_id, available_quantity - quantity)
        proceeds = quantity * sale_price
        portfolio = get_portfolio_by_id(investment.portfolio_id)
        userId = portfolio.userId
        old_balance = get_balance(userId)
        update_balance(userId, old_balance + proceeds)
    except Exception as e:
        raise QueryException(f'Failed to process sale for investment ID {investment_id}: {str(e)}')
