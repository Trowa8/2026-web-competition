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
