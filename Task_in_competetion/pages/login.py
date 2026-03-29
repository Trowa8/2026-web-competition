from nicegui import ui
from layout import layout
from i18n import t
from services.user_service import login_user

def login_page():
    layout()

    with ui.column().classes('items-center justify-center w-full h-screen bg-gray-50'):

        with ui.card().classes('w-96 p-8 shadow-xl'):
            ui.label(t("login")).classes('text-3xl font-bold mb-6 text-center')

            username_input = ui.input(t("username")).classes('w-full mb-4')
            password_input = ui.input(t("password"), password=True).classes('w-full mb-6')

            message = ui.label('').classes('text-red-500 text-center')

            def handle_login():
                # Очищаємо попереднє повідомлення
                message.set_text('')

                username = username_input.value.strip()
                password = password_input.value.strip()

                if not username or not password:
                    message.set_text('Будь ласка, заповніть усі поля')
                    ui.notify('Заповніть усі поля', type='warning')
                    return

                user = login_user(username, password)
                if user:
                    ui.notify(f'Вітаємо, {user.get("full_name", username)}!', type='positive')
                    ui.navigate.to('/tournaments')
                else:
                    message.set_text('Невірний логін або пароль')
                    ui.notify('Невірний логін або пароль', type='negative')

            ui.button(t("login_button"), on_click=handle_login) \
                .classes('bg-blue-600 hover:bg-blue-700 text-white w-full py-3 text-lg font-medium')