import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

export const authGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService); 
  const router = inject(Router);
  const toastController = inject(ToastController);

  // Busca o usuário salvo no localStorage (ou o payload do token caso exista)
  const user = userService.getUser(); 
  const userPayload: any = userService.getPayload();

  const cargo = user?.cargo || userPayload?.cargo;

  console.log('Cargo verificado no guard:', cargo); 

  if (cargo === 'Admin') {
    return true;
  } else {
    return false; 
  }
};

