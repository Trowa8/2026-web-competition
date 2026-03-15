from nicegui import ui
from src.app.pages.home.page import home_page
from src.app.pages.login.page import login_page

ui.page("/")(home_page)
ui.page("/login")(login_page)

@ui.page("/not-found")
def not_found():
    ui.label("404 - Сторінку не знайдено").classes("text-4xl text-red-500")
    ui.link("На головну", "/").classes("text-blue-500")

ui.run(
    title="Мій додаток",
    favicon="🚀",
    dark=False,
    port=8080
)