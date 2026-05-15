import { Routes } from "@angular/router";
import { authGuard } from "./shared/core/guards/auth.guard";

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./layouts/main-layout/main-layout").then(m => m.MainLayout),
        children: [
            {
                path: "tournaments",
                loadComponent: () => import("./pages/tournaments/tournaments").then(m => m.Tournaments),
                canActivate: [authGuard],
            },
            {
                path: "create-task",
                loadComponent: () => import("./pages/create-task/create-task").then(m => m.CreateTask),
                canActivate: [authGuard],
            },
            {
                path: "home",
                loadComponent: () => import("./pages/home/home").then(m => m.Home),
            },
            {
                path: "tables",
                loadComponent: () => import("./pages/tables/tables").then(m => m.Tables),
            },
            {
                path: "search-info",
                loadComponent: () => import("./pages/search-info/search-info").then(m => m.SearchInfo),
            },
            {
                path: "qa",
                loadComponent: () => import("./pages/qa/qa").then(m => m.Qa),
            },
            {
                path: "tournament",
                loadComponent: () =>
                    import("./pages/tournament-detail/tournament-detail").then(m => m.TournamentDetailComponent),
            },
            {
                path: "submit-solution",
                loadComponent: () => import("./pages/submit-solution/submit-solution").then(m => m.SubmitSolution),
                canActivate: [authGuard],
            },
            {
                path: "review-solution",
                loadComponent: () =>
                    import("./pages/review-solution/review-solution").then(m => m.ReviewSolutionComponent),
            },
            {
                path: "team-profile",
                loadComponent: () => import("./pages/team-profile/team-profile").then(m => m.TeamProfileComponent),
            },
            {
                path: "create-tournament",
                loadComponent: () =>
                    import("./pages/create-tournament/create-tournament").then(m => m.CreateTournamentComponent),
            },
            {
                path: "create-team",
                loadComponent: () => import("./pages/create-team/create-team").then(m => m.CreateTeam),
            },
        ],
    },
    {
        path: "auth",
        loadComponent: () => import("./layouts/auth-layout/auth-layout").then(m => m.AuthLayout),
        children: [
            {
                path: "login",
                loadComponent: () => import("./pages/login/login").then(m => m.LoginComponent),
            },
            {
                path: "register",
                loadComponent: () => import("./pages/register/register").then(m => m.RegisterComponent),
            },
        ],
    },

    { path: "**", redirectTo: "/auth/login" },
];
