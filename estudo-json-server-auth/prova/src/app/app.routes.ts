import type { Routes } from '@angular/router';
import { authGuard } from './guard/auth-guard';
import { guestGuard } from './guard/guest-guard';
import { adminGuard } from './guard/admin-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent), 
    canActivate: [guestGuard]
  }, 
  {
    path: 'tasks', 
    loadComponent: () => import('./components/tarefas/tarefas.component').then(m => m.TarefasComponent), 
    canActivate: [authGuard]
  }, 
  {
    path: 'admin/users', 
    loadComponent: () => import('./components/list-user/list-user.component').then(m => m.ListUserComponent), 
    canActivate: [adminGuard]
  }
];
