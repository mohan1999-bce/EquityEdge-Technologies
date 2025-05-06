from sqlalchemy import Column, String, Integer, Boolean, Float
from App.db import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__='Users'
    id=Column(Integer,primary_keys=True,autoincrement=True)
    username=Column(String, nullabe=False)
    password=Column(String, nullabe=False)
    is_active=Column(Boolean,default=True)
    balance=Column(Float)