from nicegui import ui

def button(text, callback):
    ui.button(text, on_click=callback)