import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'venda',
    pathMatch: 'full',
  },
  {
    path: 'venda',
    loadComponent: () => import('./venda/venda.page').then( m => m.VendaPage)
  },
];
