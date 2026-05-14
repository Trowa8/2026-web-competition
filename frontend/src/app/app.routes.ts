import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "tasks",
        loadComponent: () => import("./layouts/main-layout/main-layout").then(m => m.MainLayout),
        children: [
            { path: "", loadComponent: () => import("./pages/tasks/tasks").then(m => m.TasksComponent) }
        ],
    },
    {
        path: "team-profile",
        loadComponent: () => import("./pages/team-profile/team-profile").then(m => m.TeamProfileComponent)
    },
    {
        path: "auth",
        loadComponent: () => import("./layouts/auth-layout/auth-layout").then(m => m.AuthLayout),
        children: [
            { path: "login", loadComponent: () => import("./pages/login/login").then(m => m.LoginComponent) },
            { path: "register", loadComponent: () => import("./pages/register/register").then(m => m.RegisterComponent) },
        ],
    },
    { path: "", redirectTo: "tasks", pathMatch: "full" },
    { path: "**", redirectTo: "tasks" }
];