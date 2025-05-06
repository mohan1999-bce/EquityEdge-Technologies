from app.services.investment_dao import create_new
#create_new(1, "AAPL", 150.0, 10)

sell(5,3,20)

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