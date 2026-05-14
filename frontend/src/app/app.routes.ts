import { Routes } from "@angular/router";
import { authGuard } from "./shared/core/guards/auth.guard";

export const routes: Routes = [
    {
        path: "tasks",
        loadComponent: () => import("./layouts/main-layout/main-layout").then(m => m.MainLayout),
        children: [
            {
                path: "",
                loadComponent: () => import("./pages/tasks/tasks").then(m => m.TasksComponent)
            }
        ],
    },
    {
        path: "auth",
        loadComponent: () => import("./layouts/auth-layout/auth-layout").then(m => m.AuthLayout),
        children: [
            { path: "login", loadComponent: () => import("./pages/login/login").then(m => m.LoginComponent) },
            { path: "register", loadComponent: () => import("./pages/register/register").then(m => m.RegisterComponent) },
        ],
    },
    { path: "**", redirectTo: "tasks" }
];