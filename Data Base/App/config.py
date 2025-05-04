def get_cnx_string():
    username ="admin"
    password ="admin"
    hostname=""
    port=""
    dabase=""
    return f"mysql+pymysql://<username>:<password>@<host>:<port>/<database>"


