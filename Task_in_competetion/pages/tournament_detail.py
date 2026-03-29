from nicegui import ui
from layout import layout

def tournament_detail_page(tournament_id: int):
    layout()

    ui.label(f'Турнір #{tournament_id}').classes('text-3xl font-bold m-6')

    with ui.card().classes('max-w-2xl mx-auto p-8'):
        ui.label(f'Турнір {tournament_id}').classes('text-2xl font-semibold mb-2')
        ui.label('Дата проведення: 15 квітня 2026 року').classes('text-gray-600 mb-6')

        with ui.row().classes('gap-8 mb-8'):
            with ui.column():
                ui.label('Місце').classes('font-medium')
                ui.label('Dnipro Arena, Дніпро').classes('text-lg')

            with ui.column():
                ui.label('Статус').classes('font-medium')
                ui.label('Реєстрація відкрита').classes('text-green-600 font-medium')

            with ui.column():
                ui.label('Кількість учасників').classes('font-medium')
                ui.label('12 / 32').classes('text-lg')

        ui.separator().classes('my-6')

        def register():
            ui.notify('✅ Ви успішно зареєстровані на турнір!',
                      type='positive',
                      close_button=True)

        ui.button('Зареєструватися на турнір',
                  color='positive',
                  icon='how_to_reg',
                  on_click=register) \
            .classes('w-full py-4 text-lg font-medium')

        ui.button('Повернутися до списку турнірів',
                  color='secondary',
                  on_click=lambda: ui.navigate.to('/tournaments')) \
            .classes('w-full mt-4')

        ui.label('Після реєстрації ви отримаєте підтвердження на email').classes(
            'text-xs text-gray-500 text-center mt-6')