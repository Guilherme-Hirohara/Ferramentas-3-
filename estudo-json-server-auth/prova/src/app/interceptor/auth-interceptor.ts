import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../service/login.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(LoginService).getToken(); 
  
  if(token){
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    }); 
    return next(authReq); 
  }
  return next(req);
};
