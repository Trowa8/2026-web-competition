import { Injectable } from '@angular/core';
import { Tournament } from '../types/tournament.types';

@Injectable({
    providedIn: 'root'
})
export class TournamentService {
    private tournaments: Tournament[] = [
        {
            id: 1,
            name: '🏆 Хакатон 2024',
            game: 'Веб-розробка',
            startDate: new Date('2024-12-15'),
            endDate: new Date('2024-12-17'),
            maxPlayers: 20,
            currentPlayers: 15,
            status: 'upcoming',
            prizePool: 50000,
            description: 'Командний хакатон з веб-розробки. Створіть інноваційний веб-додаток за 48 годин!'
        },
        {
            id: 2,
            name: '🔒 Кібербезпека Челлендж',
            game: 'Кібербезпека',
            startDate: new Date('2024-12-10'),
            endDate: new Date('2024-12-14'),
            maxPlayers: 30,
            currentPlayers: 28,
            status: 'ongoing',
            prizePool: 75000,
            description: 'Змагання з кібербезпеки: CTF, пентест, аналіз вразливостей'
        },
        {
            id: 3,
            name: '🤖 AI/ML Турнір',
            game: 'Штучний інтелект',
            startDate: new Date('2025-01-10'),
            endDate: new Date('2025-01-20'),
            maxPlayers: 15,
            currentPlayers: 8,
            status: 'upcoming',
            prizePool: 100000,
            description: 'Розробка моделей машинного навчання для вирішення реальних задач'
        },
        {
            id: 4,
            name: '📱 Мобільна розробка',
            game: 'Mobile Dev',
            startDate: new Date('2024-11-20'),
            endDate: new Date('2024-11-25'),
            maxPlayers: 25,
            currentPlayers: 25,
            status: 'completed',
            prizePool: 30000,
            description: 'Конкурс мобільних додатків на Flutter та React Native'
        },
        {
            id: 5,
            name: '🐍 Python Masters',
            game: 'Python',
            startDate: new Date('2025-01-05'),
            endDate: new Date('2025-01-12'),
            maxPlayers: 40,
            currentPlayers: 22,
            status: 'upcoming',
            prizePool: 45000,
            description: 'Алгоритмічний турнір з програмування на Python'
        }
    ];

    async getTournaments(): Promise<Tournament[]> {
        return this.tournaments;
    }

    async joinTournament(id: number): Promise<any> {
        const tournament = this.tournaments.find(t => t.id === id);
        if (tournament && tournament.currentPlayers < tournament.maxPlayers && tournament.status === 'upcoming') {
            tournament.currentPlayers++;
            return { success: true, message: '✅ Ви приєдналися до турніру!' };
        }
        return { success: false, message: '❌ Не вдалося приєднатися' };
    }

    async leaveTournament(id: number): Promise<any> {
        const tournament = this.tournaments.find(t => t.id === id);
        if (tournament && tournament.currentPlayers > 0 && tournament.status === 'upcoming') {
            tournament.currentPlayers--;
            return { success: true, message: '✅ Ви вийшли з турніру!' };
        }
        return { success: false, message: '❌ Не вдалося вийти з турніру' };
    }

    async createTournament(data: any): Promise<Tournament> {
        const newId = this.tournaments.length + 1;
        const newTournament: Tournament = {
            id: newId,
            name: data.name,
            game: data.game,
            startDate: data.startDate,
            endDate: data.endDate,
            maxPlayers: data.maxPlayers,
            currentPlayers: 0,
            status: 'upcoming',
            prizePool: data.prizePool || 0,
            description: data.description || ''
        };
        this.tournaments.push(newTournament);
        return newTournament;
    }
}