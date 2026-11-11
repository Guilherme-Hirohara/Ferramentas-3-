import type { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path:'login', 
    loadComponent: () => import('./pages/login.page/login.page.component').then(m => m.LoginPageComponent)
  }, 
  {
    path: 'register', 
    loadComponent: () => import('./pages/register.page/register.page.component').then(m => m.RegisterPageComponent),  
  }, 
  {
    path: 'admin', 
    loadComponent: () => import('./pages/admin.page/admin.page.component').then(m => m.AdminPageComponent), 
    canActivate: [authGuard]
  }, 
  {
    path: 'products/:id', 
    loadComponent:() => import('./pages/products.page/products.page.component').then(m => m.ProductsPageComponent),
    canActivate: [authGuard]
  }, 
  {
    path:"products-add", 
    loadComponent:() => import("./pages/add-products/add-products.component").then(m => m.AddProductsComponent), 
    canActivate: [authGuard]
  }
];
