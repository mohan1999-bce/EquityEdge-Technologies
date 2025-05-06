from App.db import Base
from sqlalchemy import Column, String, Integer, Float, Date



class Investment(Base):
    __tablename__ = 'Investment'

    id = Column(Integer, primary_key=True, autoincrement=True)
    portfolio_id = Column(Integer, nullable=False)
    ticker = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    date = Column(Date)

    def __str__(self):
        return f'[id: {self.id}, portfolio_id: {self.portfolio_id}, ticker: {self.ticker}, price: {self.price}]'