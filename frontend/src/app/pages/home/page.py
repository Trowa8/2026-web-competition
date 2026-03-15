from nicegui import ui
from src.app.layouts.main_layout.layout import layout
from src.shared.services.api_service import api_service


def home_page():
    def content():
        ui.label("Головна сторінка").classes("text-4xl font-bold text-blue-600 mb-6")

        ui.label("Список користувачів:").classes("text-xl font-semibold mb-2")

        users_container = ui.column().classes("w-full bg-gray-50 p-4 rounded-lg")

        async def load_users():
            users_container.clear()

            with users_container:
                spinner = ui.spinner().classes("mx-auto")

                try:
                    result = api_service.get_users()

                    spinner.delete()

                    if result["success"]:
                        if result["data"]:
                            for user in result["data"]:
                                with ui.card().classes("w-full mb-2 hover:shadow-md transition-shadow"):
                                    ui.label(f"👤 {user.name}").classes("font-bold")
                                    ui.label(f"✉️ {user.email}").classes("text-gray-600 text-sm")
                        else:
                            ui.label("Немає користувачів").classes("text-gray-500 italic")
                    else:
                        ui.label(f"❌ {result['error']}").classes("text-red-500")
                except Exception as e:
                    spinner.delete()
                    ui.label(f"❌ Помилка: {str(e)}").classes("text-red-500")

        ui.button(
            "📥 Завантажити користувачів",
            on_click=load_users
        ).classes("bg-green-500 hover:bg-green-700 text-white mb-4")

        ui.timer(0.1, load_users, once=True)

    layout(content)