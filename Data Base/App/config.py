def get_cnx_string():
    username ="admin"
    password ="admin1234"
    hostname="my-portfolio.czmu4so2wyrz.us-east-2.rds.amazonaws.com"
    port="3306"
    database="Equity_Edge"
    return f"mysql+pymysql://{username}:{password}@{hostname}:{port}/{database}"


