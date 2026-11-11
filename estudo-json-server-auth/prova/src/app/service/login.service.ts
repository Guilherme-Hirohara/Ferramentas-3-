import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../interface/login-response';
import { jwtDecode } from  'jwt-decode'
import { Payload } from '../interface/payload';
import { Login } from '../interface/login';

@Service()
export class LoginService {
    private urlBase = `${environment.api}/auth/login`; 
    private http = inject(HttpClient); 

    public realizarLogin(user: Login){
        return this.http.post<LoginResponse>(this.urlBase, user); 
    }

    public setToken(token: string){
        localStorage.setItem('TOKEN', token); 
    }

    public getToken(){
        return localStorage.getItem('TOKEN'); 
    }

    public deleteToken(){
        localStorage.removeItem('TOKEN'); 
    }

    public getPayLoad(){
        const token = this.getToken(); 
        if(token){
            const payload:Payload = jwtDecode(token); 
            return payload;  
        }
        else{
            return null; 
        }
    }
}
