import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';


export const adminGuard: CanActivateFn = (route, state) => {
  const payload = inject(LoginService).getPayLoad(); 
  if(payload?.role == 'admin'){
    return true;
  }

  const router = inject(Router); 
  router.navigate(['/tasks']); 
  return false; 
};
