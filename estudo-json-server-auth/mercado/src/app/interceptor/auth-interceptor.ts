import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = inject(UserService).getToken(); 
  
  const newReq = req.clone({
    headers: req.headers.append(
      'Authorization', 'Bearer ' + accessToken
    ),
  })
  return next(newReq);
};
