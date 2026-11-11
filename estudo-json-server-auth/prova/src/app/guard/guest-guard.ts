import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const token = inject(LoginService).getToken(); 
  if(token){
    const router = inject(Router); 
    router.navigate(['/tasks']); 
    return false; 
  }
  return true;
};
