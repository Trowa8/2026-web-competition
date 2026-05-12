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
                path: "home",
                loadComponent: () => import("./pages/home/home").then(m => m.Home),
            },
            {
                path: "tables",
                loadComponent: () => import("./pages/tables/tables").then(m => m.Tables),
            },
            {
                path: "profile",
                loadComponent: () => import("./pages/profile/profile").then(m => m.Profile),
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
                loadComponent: () => import("./pages/tournament/tournament").then(m => m.Tournament),
            },
            {
                path: "teams",
                loadComponent: () => import("./pages/tournament-list/tournament-list").then(m => m.TournamentList),
            },
            {
                path: "create-team",
                loadComponent: () => import("./pages/create-team/create-team").then(m => m.CreateTeam),
            },
            {
                path: "create-tournament",
                loadComponent: () =>
                    import("./pages/create-tournament/create-tournament").then(m => m.CreateTournament),
            },
            {
                path: "submit-solution",
                loadComponent: () => import("./pages/submit-solution/submit-solution").then(m => m.SubmitSolution),
            },
            {
                path: "review-solution",
                loadComponent: () => import("./pages/review-solution/review-solution").then(m => m.ReviewSolution),
            },
            {
                path: "team-profile",
                loadComponent: () => import("./pages/team-profile/team-profile").then(m => m.TeamProfile),
            },
            { path: "results", loadComponent: () => import("./pages/results/results").then(m => m.Results) },
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
