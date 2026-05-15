import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team, CreateTeamRequest } from '../../shared/types/team.type';

@Injectable({
    providedIn: 'root'
})
export class TeamService {
    private readonly apiUrl = '/api/teams';

    constructor(private http: HttpClient) { }
    createTeam(payload: CreateTeamRequest): Observable<Team> {
        return this.http.post<Team>(this.apiUrl, payload);
    }
}