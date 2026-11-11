import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'produto',
    pathMatch: 'full',
  },
  {
    path: 'produto',
    loadComponent: () => import('./produto/produto.page').then( m => m.ProdutoPage), 
  },
  {
    path: 'cadastrar-produto',
    loadComponent: () => import('./cadastrar-produto/cadastrar-produto.page').then( m => m.CadastrarProdutoPage)
  },
];
