import requests

BASE_URL = "http://localhost:8000"

def get_users():
    r = requests.get(f"{BASE_URL}/users")
    return r.json()