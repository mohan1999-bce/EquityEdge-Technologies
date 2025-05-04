from App.db import get_session
from App.Models.user import User

def create_user(username, password, balance):
    user = User(username=username,password=password,balance=balance)
    with get_session() as session:
        session.add(user)
        session.commit()

def get_all():
    session = get_session()
    return session.query(User).all()
