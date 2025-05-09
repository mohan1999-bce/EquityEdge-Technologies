from App.db import get_session
from App.Models.user import User
from app.models.exceptions.queryexception import QueryException

def create_user(username: str, password: str, balance: float) -> None:
    try:
        if not isinstance(balance, float):
            raise Exception(f'Balance must be a decimal, found {balance}')
        if username is None or password is None:
            raise Exception('Username and password are both required fields!')
        user = User(username=username, password=password, balance=balance)
        with get_session() as session:
            session.add(user)
            session.commit()
    except Exception as e:
        raise QueryException('Failed to create a new user', e)


def password_matches(username: str, password: str) -> User:
    try:
        with get_session() as session:
            user = session.query(User).filter_by(username=username).one()
            if password == user.password:
                return user
            else:
                raise Exception('Username and password do not match')
    except NoResultFound:
        raise Exception(f'No user found with username: {username}')
    except MultipleResultsFound:
        raise Exception(f'Unexpected state - multiple users found with username: {username}')
    except Exception as e:
        raise QueryException('Failed while checking username & password', e)


def get_all() -> List[User]:
    try:
        with get_session() as session:
            return session.query(User).all()
    except Exception as e:
        raise QueryException('Failed to get all users', e)


def get_balance(userId: int) -> float:
    try:
        if not isinstance(userId, int):
            raise ValueError('userId must be an integer')
        with get_session() as session:
            user = session.query(User).filter_by(id=userId).one()
            return user.balance
    except NoResultFound as e:
        raise QueryException(f'No user exists with ID {userId}', e)
    except MultipleResultsFound as e:
        raise QueryException(f'More than one user exists with ID {userId}', e)
    except Exception as e:
        raise QueryException(f'Failed to get user balance for user with ID {userId}', e)


def delete_user(userId: int) -> None:
    try:
        with get_session() as session:
            user = session.query(User).filter_by(id=userId).one()
            session.delete(user)
            session.commit()
    except Exception as e:
        raise QueryException(f'Failed to delete user with ID {userId}', e)


def update_balance(userId: int, balance: float) -> None:
    try:
        with get_session() as session:
            user = session.query(User).filter_by(id=userId).one()
            user.balance = balance
            session.commit()
    except Exception as e:
        raise QueryException(f'Failed to update balance for user with ID {userId}', e)