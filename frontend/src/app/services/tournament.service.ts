import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { TournamentDto } from '../shared/types/tournament.types';

@Injectable({ providedIn: 'root' })
export class TournamentService {
    constructor(private http: HttpClient, private api: ApiService) { }

    async getAll(): Promise<TournamentDto[]> {
        return await firstValueFrom(
            this.http.get<TournamentDto[]>(
                this.api.getUrl('/tournaments')
            )
        );
    }
}