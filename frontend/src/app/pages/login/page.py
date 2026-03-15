from nicegui import ui
from src.app.layouts.main_layout.layout import layout
from src.shared.services.api_service import api_service
from src.shared.components.button import button


def login_page():
    def content():
        email = ui.input(
            "Електронна пошта",
            placeholder="your@email.com"
        ).classes("w-96").props("outlined")

        password = ui.input(
            "Пароль",
            password=True,
            placeholder="••••••••"
        ).classes("w-96").props("outlined")

        error_label = ui.label().classes("text-red-500 text-sm")
        success_label = ui.label().classes("text-green-500 text-sm")

        loading = False

        async def handle_login():
            nonlocal loading
            if loading:
                return

            if not email.value:
                error_label.set_text("Будь ласка, введіть email")
                return
            if not password.value:
                error_label.set_text("Будь ласка, введіть пароль")
                return
            if "@" not in email.value:
                error_label.set_text("Невірний формат email")
                return

            error_label.set_text("")
            success_label.set_text("")

            loading = True

            status_row = ui.row().classes("items-center gap-2")
            with status_row:
                spinner = ui.spinner(size="sm")
                status_label = ui.label("Вхід...").classes("text-gray-600")

            try:
                result = api_service.login(email.value, password.value)

                status_row.delete()

                if result["success"]:
                    success_label.set_text("✅ Вхід успішний!")
                    ui.timer(1.5, lambda: ui.navigate.to("/"), once=True)
                else:
                    error_label.set_text(f"❌ {result['error']}")
            except Exception as e:
                status_row.delete()
                error_label.set_text(f"❌ Помилка: {str(e)}")
            finally:
                loading = False

        ui.row().classes("mt-4")
        button("УВІЙТИ", on_click=handle_login, type="primary")

        ui.link("Забули пароль?", "#").classes("text-sm text-blue-500 mt-2")

    layout(content)