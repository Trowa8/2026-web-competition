from nicegui import ui
from layout import layout
from i18n import t
from services.tournament_service import get_tournaments


def tournaments_page():
    layout()

    ui.label(t("tournaments")).classes('text-3xl font-bold m-6')

    tournaments = get_tournaments()

    with ui.row().classes('gap-4 p-4 w-full flex-wrap'):
        for index, t_item in enumerate(tournaments):
            with ui.card().classes('w-80 p-4 hover:shadow-lg transition-shadow'):
                ui.label(t_item['name']).classes('text-xl font-semibold')
                ui.label('Дата: 15.04.2026').classes('text-gray-500 text-sm')

                tournament_id = index + 1

                ui.button('Переглянути',
                          color='primary',
                          on_click=lambda tid=tournament_id: ui.navigate.to(f'/tournament/{tid}')) \
                    .classes('mt-4 w-full')
