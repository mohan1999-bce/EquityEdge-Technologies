from App.db import get_session
from App.Models.portfolio import Portfolio


def create_new(name, strategy, userId):
    portfolio = Portfolio(name=name, strategy=strategy, userId=userId)
    with get_session() as session:
        session.add(portfolio)
        session.commit()


def get_portfolios_by_user(userId):
    session = get_session()
    portfolios = session.query(Portfolio).filter(Portfolio.userId == userId).all()
    return portfolios
    
def get_portfolio_by_id(id):
    return get_session().query(Portfolio).filter(Portfolio.id == id).all()