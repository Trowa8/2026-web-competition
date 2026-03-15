import requests
from src.shared.config.env import API_URL
from src.shared.models.user import User


class ApiService:
    def __init__(self):
        self.base_url = API_URL
        self.session = requests.Session()
        self.use_mock = True

    def login(self, email: str, password: str):
        if self.use_mock:
            print("🔧 Використовується мок-режим для login")  # Для відладки
            if email == "test@example.com" and password == "password":
                return {
                    "success": True,
                    "data": {
                        "token": "mock-token-123",
                        "user": {
                            "id": 1,
                            "name": "Тестовий Користувач",
                            "email": "test@example.com"
                        }
                    }
                }
            else:
                return {
                    "success": False,
                    "error": "Невірна пошта або пароль (спробуйте test@example.com / password)"
                }

        try:
            response = self.session.post(
                f"{self.base_url}/login",
                json={"email": email, "password": password},
                timeout=5
            )

            if response.status_code == 200:
                return {"success": True, "data": response.json()}
            elif response.status_code == 401:
                return {"success": False, "error": "Невірна пошта або пароль"}
            else:
                return {"success": False, "error": f"Помилка сервера: {response.status_code}"}

        except requests.exceptions.ConnectionError:
            return {"success": False, "error": "Не вдалося підключитися до сервера"}
        except requests.exceptions.Timeout:
            return {"success": False, "error": "Час очікування відповіді вичерпано"}
        except Exception as e:
            return {"success": False, "error": f"Невідома помилка: {str(e)}"}

    def get_users(self):
        if self.use_mock:
            print("🔧 Використовується мок-режим для get_users")
            return {
                "success": True,
                "data": [
                    User(id=1, name="Іван Петренко", email="ivan@example.com"),
                    User(id=2, name="Марія Коваленко", email="maria@example.com"),
                    User(id=3, name="Петро Сидоренко", email="petro@example.com"),
                    User(id=4, name="Олена Шевченко", email="olena@example.com"),
                    User(id=5, name="Андрій Мельник", email="andriy@example.com"),
                ]
            }

        try:
            print(f"📡 Запит до {self.base_url}/users")
            r = self.session.get(f"{self.base_url}/users", timeout=5)
            print(f"📡 Відповідь: {r.status_code}")

            if r.status_code == 200:
                return {"success": True, "data": [User(**user) for user in r.json()]}
            else:
                return {"success": False, "error": f"Помилка: {r.status_code}"}
        except requests.exceptions.ConnectionError:
            return {"success": False, "error": "Не вдалося підключитися до сервера"}
        except requests.exceptions.Timeout:
            return {"success": False, "error": "Час очікування відповіді вичерпано"}
        except Exception as e:
            return {"success": False, "error": str(e)}

api_service = ApiService()