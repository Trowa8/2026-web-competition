from nicegui import ui

def header():
    with ui.row().classes("items-center justify-between w-full p-4 bg-blue-600 text-white shadow-lg"):
        ui.label("Мій додаток").classes("text-2xl font-bold")

        with ui.row().classes("gap-2"):
            ui.button("🏠 ГОЛОВНА", on_click=lambda: ui.navigate.to("/")).classes(
                "bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded"
            )
            ui.button("🔑 ВХІД", on_click=lambda: ui.navigate.to("/login")).classes(
                "bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded"
            )
