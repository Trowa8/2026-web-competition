import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";
import {
    SolutionType,
    SolutionListItemType,
    SolutionDetailType,
    UploadFileResponse,
    CreateSolutionRequest,
    UploadFileRequest,
} from "../types/solution.types";

@Injectable({ providedIn: "root" })
export class SolutionService {
    private readonly http = inject(HttpClient);

    public async createSolution(body: CreateSolutionRequest): Promise<SolutionType> {
        return firstValueFrom(this.http.post<SolutionType>(`${environment.apiUrl}/solutions`, body));
    }

    public async uploadFile(body: UploadFileRequest): Promise<UploadFileResponse> {
        const formData = new FormData();
        formData.append("taskId", body.taskId);
        formData.append("teamId", body.teamId);
        formData.append("file", body.file);

        return firstValueFrom(this.http.post<UploadFileResponse>(`${environment.apiUrl}/solutions/upload`, formData));
    }

    public async getSolutionsByTask(taskId: string): Promise<SolutionListItemType[]> {
        return firstValueFrom(this.http.get<SolutionListItemType[]>(`${environment.apiUrl}/solutions/${taskId}`));
    }

    public async getSolutionByTaskAndTeam(taskId: string, teamId: string): Promise<SolutionDetailType> {
        return firstValueFrom(this.http.get<SolutionDetailType>(`${environment.apiUrl}/solutions/${taskId}/${teamId}`));
    }
}
