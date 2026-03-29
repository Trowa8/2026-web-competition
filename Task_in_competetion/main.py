from nicegui import ui
from pages.login import login_page
from pages.tournaments import tournaments_page
from pages.tournament_detail import tournament_detail_page

@ui.page('/')
def login():
    login_page()

@ui.page('/tournaments')
def tournaments():
    tournaments_page()

@ui.page('/tournament/{tournament_id}')
def tournament_detail(tournament_id: int):
    tournament_detail_page(tournament_id)

ui.run()