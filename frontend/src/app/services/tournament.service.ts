import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import {
    Tournament,
    CreateTournamentRequest,
    UpdateTournamentRequest,
    TournamentsResponse,
    TournamentFilters,
    TournamentStats
} from '../shared/types/tournament.types';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    private readonly API_URL = `${environment.apiUrl}/tournaments`;

    private tournamentsState = signal<Tournament[]>([]);
    private currentTournamentState = signal<Tournament | null>(null);
    private loadingState = signal<boolean>(false);
    private errorState = signal<string | null>(null);

    public tournaments = computed(() => this.tournamentsState());
    public currentTournament = computed(() => this.currentTournamentState());
    public isLoading = computed(() => this.loadingState());
    public error = computed(() => this.errorState());

    public stats = computed<TournamentStats>(() => {
        const tournaments = this.tournamentsState();
        return {
            total: tournaments.length,
            active: tournaments.filter(t => t.status === 'ongoing' || t.status === 'registration').length,
            completed: tournaments.filter(t => t.status === 'completed').length
        };
    });

    constructor(private http: HttpClient) { }

    public async getTournaments(filters?: TournamentFilters): Promise<Tournament[]> {
        this.loadingState.set(true);
        this.errorState.set(null);

        try {
            let params = new HttpParams();
            if (filters) {
                if (filters.status) params = params.set('status', filters.status);
                if (filters.gameType) params = params.set('gameType', filters.gameType);
                if (filters.search) params = params.set('search', filters.search);
                if (filters.page) params = params.set('page', filters.page.toString());
                if (filters.pageSize) params = params.set('pageSize', filters.pageSize.toString());
            }

            const response = await firstValueFrom<TournamentsResponse>(
                this.http.get<TournamentsResponse>(this.API_URL, { params })
            );

            this.tournamentsState.set(response.tournaments);
            return response.tournaments;
        } catch (error) {
            console.error('Error loading tournaments:', error);
            const mockData = this.getMockTournaments();
            this.tournamentsState.set(mockData);
            return mockData;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async getTournamentById(id: number): Promise<Tournament> {
        this.loadingState.set(true);

        try {
            const tournament = await firstValueFrom<Tournament>(
                this.http.get<Tournament>(`${this.API_URL}/${id}`)
            );
            this.currentTournamentState.set(tournament);
            return tournament;
        } catch (error) {
            console.error('Error loading tournament:', error);
            const mockTournament = this.getMockTournamentById(id);
            this.currentTournamentState.set(mockTournament);
            return mockTournament;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async createTournament(data: CreateTournamentRequest): Promise<Tournament> {
        this.loadingState.set(true);

        try {
            const tournament = await firstValueFrom<Tournament>(
                this.http.post<Tournament>(this.API_URL, data)
            );
            const current = this.tournamentsState();
            this.tournamentsState.set([tournament, ...current]);
            return tournament;
        } catch (error) {
            console.error('Error creating tournament:', error);
            const mockTournament = this.createMockTournament(data);
            const current = this.tournamentsState();
            this.tournamentsState.set([mockTournament, ...current]);
            return mockTournament;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async updateTournament(id: number, data: UpdateTournamentRequest): Promise<Tournament> {
        this.loadingState.set(true);

        try {
            const tournament = await firstValueFrom<Tournament>(
                this.http.put<Tournament>(`${this.API_URL}/${id}`, data)
            );
            this.updateTournamentInList(tournament);
            return tournament;
        } catch (error) {
            console.error('Error updating tournament:', error);
            throw error;
        } finally {
            this.loadingState.set(false);
        }
    }

    public async deleteTournament(id: number): Promise<void> {
        this.loadingState.set(true);

        try {
            await firstValueFrom(
                this.http.delete(`${this.API_URL}/${id}`)
            );
            const current = this.tournamentsState();
            this.tournamentsState.set(current.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting tournament:', error);
            const current = this.tournamentsState();
            this.tournamentsState.set(current.filter(t => t.id !== id));
        } finally {
            this.loadingState.set(false);
        }
    }

    private updateTournamentInList(updated: Tournament): void {
        const current = this.tournamentsState();
        const index = current.findIndex(t => t.id === updated.id);
        if (index !== -1) {
            current[index] = updated;
            this.tournamentsState.set([...current]);
        }
    }

    private getMockTournaments(): Tournament[] {
        return [
            {
                id: 1,
                name: 'CS2 Cup 2024',
                description: 'Міжнародний турнір з CS2',
                startDate: new Date('2024-06-01'),
                endDate: new Date('2024-06-10'),
                location: 'Київ, Україна',
                maxPlayers: 16,
                status: 'registration',
                gameType: 'CS2',
                prizePool: 50000,
            },
            {
                id: 2,
                name: 'Dota 2 League',
                description: 'Ліга з Dota 2',
                startDate: new Date('2024-05-15'),
                endDate: new Date('2024-05-25'),
                location: 'Онлайн',
                maxPlayers: 8,
                status: 'ongoing',
                gameType: 'Dota 2',
                prizePool: 25000,
            },
            {
                id: 3,
                name: 'Valorant Masters',
                description: 'Професійний турнір з Valorant',
                startDate: new Date('2024-04-01'),
                endDate: new Date('2024-04-15'),
                location: 'Лондон, Велика Британія',
                maxPlayers: 12,
                status: 'completed',
                gameType: 'Valorant',
                prizePool: 100000,
            }
        ];
    }

    private getMockTournamentById(id: number): Tournament {
        const tournaments = this.getMockTournaments();
        const found = tournaments.find(t => t.id === id);
        if (found) return found;

        return {
            id: id,
            name: 'Турнір',
            description: 'Опис турніру',
            startDate: new Date(),
            endDate: new Date(),
            location: 'Місце проведення',
            maxPlayers: 16,
            status: 'draft',
            gameType: 'CS2',
        };
    }

    private createMockTournament(data: CreateTournamentRequest): Tournament {
        return {
            id: Date.now(),
            name: data.name,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
            location: data.location,
            maxPlayers: data.maxPlayers,
            status: 'draft',
            gameType: data.gameType,
            prizePool: data.prizePool,
        };
    }
}