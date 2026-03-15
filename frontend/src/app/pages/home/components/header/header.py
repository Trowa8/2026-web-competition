from nicegui import ui

def header():
    with ui.row().classes("items-center justify-between w-full p-4 bg-blue-500 text-white"):
        ui.label("Мій додаток")
        with ui.row():
            ui.button("Дім")
            ui.button("Вхід")