import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const token = inject(LoginService).getToken(); 
  if(token){
    return true;
  }
  const router = inject(Router); 
  router.navigate(['/']); 
  return false; 
  
};
