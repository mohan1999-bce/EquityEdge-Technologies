from app.db import get_session
from app.models.user import User
from termcolor import colored
from app.services.investment_dao import create_new

def print_main_menu():
    return (
"""
Welcome to the Investment Management System!
MAIN MENU:

1. User Menu
2. Portfolio Menu
3. Market Menu
0. Exit

""")

def print_user_menu():
    return (
"""
1. View all users
2. Add user
3. Delete user
0. Return to main menu
    
    """)


def create_user(username, password, balance):
    # Create a new user in the database
    try:
        balance = float(balance)
    except Exception as e:
        raise ValueError(f"Invalid balance amount provided: {balance}")

    user = User(username=username, password=password, balance=balance)
    with get_session() as session:
        session.add(user)
        session.commit()


def password_matches(username, password):
    # Check if the provided username/password match a user in the database
    print(f'Checking whether the provided username/pass match: {username} / {password}')
    with get_session() as session:
        users = session.query(User).filter(User.username == username).all()
        if len(users) != 1:
            return False
        user = users[0]
        return password == user.password


def user_prompt():
    while True:
        user_input = input(print_user_menu())

        if user_input == '1':
            users = get_all()
            for user in users:
                print(colored(user, 'blue'))

        elif user_input == '2':
            username_input = input('Username: ')
            password_input = input('Password: ')
            balance_input = input('Balance: ')

            try:
                balance_input = float(balance_input)
                create_user(username_input, password_input, balance_input)
                print(colored('User created successfully', 'green'))
            except ValueError:
                print(colored('Balance must be a number.', 'red'))
            except Exception as e:
                print(colored(f'Error: {e}', 'red'))

        elif user_input == '3':
            userid_input = input('ID: ')
            try:
                userid_input = int(userid_input)
                user = get_user_by_id(userid_input)  # make sure this function is defined
                if user:
                    print(colored(user, 'yellow'))
                else:
                    print(colored('User not found.', 'red'))
            except ValueError:
                print(colored('ID must be a number.', 'red'))
            except Exception as e:
                print(colored(f'Error: {e}', 'red'))

        elif user_input == '0':
            break






















def print_main_menu():
    return (
"""
Welcome to the Investment Management System!
MAIN MENU:

1. User Menu
2. Portfolio Menu
3. Market Menu
0. Exit

""")

def print_user_menu():
    return (
"""
1. View all users
2. Add user
3. Delete user
0. Return to main menu
    
    """)