import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'list-products',
    pathMatch: 'full',
  },
  {
    path: 'list-products',
    loadComponent: () => import('./list-products/list-products.page').then( m => m.ListProductsPage)
  }
];
