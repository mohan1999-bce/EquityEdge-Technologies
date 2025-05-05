def get_cnx_string():
    username ="admin"
    password ="admin"
    hostname=""
    port=""
    database=""
    return f"mysql+pymysql://{username}:{password}@{hostname}:{port}/{database}"


