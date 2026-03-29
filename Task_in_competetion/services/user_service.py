def login_user(username: str, password: str):
    if username.strip() == "Timofey" and password.strip() == "zaq7210021":
        return {"username": username, "id": 1, "full_name": "Тимофій Сиваш"}

    return None