from nicegui import ui
from src.app.layouts.main_layout.header import header


def layout(content_function):
    ui.add_head_html('''
        <style>
            .page-content {
                min-height: calc(100vh - 80px);
            }
        </style>
    ''')

    header()

    ui.separator().classes("my-0")

    with ui.column().classes("page-content p-8 max-w-4xl mx-auto w-full"):
        content_function()