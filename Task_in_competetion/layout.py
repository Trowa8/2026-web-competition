from nicegui import ui

def layout():
    with ui.header().classes('bg-blue-600 text-white'):
        ui.label('🏆 Турнірний додаток').classes('text-lg')
        ui.button('Вхід', on_click=lambda: ui.navigate.to('/')).classes('ml-4')
        ui.button('Турніри', on_click=lambda: ui.navigate.to('/tournaments')).classes('ml-2')

    with ui.footer().classes('bg-gray-200'):
        ui.label('© 2026 My App')
