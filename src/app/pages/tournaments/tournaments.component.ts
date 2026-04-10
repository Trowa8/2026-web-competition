import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../../shared/services/tournament.service';
import { Tournament } from '../../shared/types/tournament.types';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';

@Component({
    selector: 'app-tournaments',
    standalone: true,
    imports: [CommonModule, MainLayoutComponent],
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
    tournaments: Tournament[] = [];
    isLoading = true;
    errorMessage = '';

    constructor(private tournamentService: TournamentService) {
        console.log('TournamentsComponent constructor');
    }

    async ngOnInit() {
        console.log('ngOnInit called');
        await this.loadTournaments();
    }

    public async loadTournaments(): Promise<void> {
        console.log('loadTournaments started');
        this.isLoading = true;
        this.errorMessage = '';

        try {
            this.tournaments = await this.tournamentService.getTournaments();
            console.log('Tournaments loaded:', this.tournaments);
        } catch (error: any) {
            console.error('Error loading tournaments:', error);
            this.errorMessage = error.message || 'Помилка завантаження турнірів';
        } finally {
            this.isLoading = false;
            console.log('isLoading set to false');
        }
    }

    public async joinTournament(tournamentId: number): Promise<void> {
        console.log('joinTournament called with id:', tournamentId);
        try {
            await this.tournamentService.joinTournament(tournamentId);
            await this.loadTournaments();
        } catch (error: any) {
            alert('Помилка приєднання до турніру');
        }
    }
}