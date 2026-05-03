import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Team {
    id: number;
    name: string;
    description?: string;
    captainId?: number;
}

@Injectable({ providedIn: 'root' })
export class TeamService {

    private teamsSignal = signal<Team[]>([]);
    public teams = this.teamsSignal.asReadonly();

    constructor(private http: HttpClient) { }

    public async getTeams(): Promise<Team[]> {
        return await firstValueFrom(this.http.get<Team[]>('/api/teams'))
            .then(data => {
                this.teamsSignal.set(data || []);
                return data || [];
            })
            .catch(() => []);
    }

    public async createTeam(name: string, description: string) {
        await firstValueFrom(this.http.post('/api/teams', { name, description }));
        await this.getTeams();
    }
}