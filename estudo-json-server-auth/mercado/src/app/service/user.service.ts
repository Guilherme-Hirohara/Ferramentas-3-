import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../modelo/user';
import { LoginResponse } from '../modelo/loginResponse';
import { jwtDecode } from 'jwt-decode'; //Lembrar de sempre importar ele pela mão 
@Service()
export class UserService {
    private urlBase = `${environment.api}`; 
    private http = inject(HttpClient); 

    public loginUser(user: any){
       return this.http.post<LoginResponse>(`${this.urlBase}/login`, user); 
    }

    public registerUser(user: User){
        return this.http.post(`${this.urlBase}/users`, user);
    }

    public setToken(token: string){
        localStorage.setItem('TOKEN', token); 
    }

    public getToken(){
       return localStorage.getItem('TOKEN'); 
    }

    public removeToken(){
        localStorage.removeItem('TOKEN'); 
    }

    public setUser(user: User){
        localStorage.setItem('USER', JSON.stringify(user));
    }

    public getUser(): User | null {
        const user = localStorage.getItem('USER');
        return user ? JSON.parse(user) : null;
    }

    public removeUser(){
        localStorage.removeItem('USER');
    }

    public getPayload(){
        try{
            return jwtDecode(this.getToken()!); 
        }catch(error){
            return null; 
        }
    }
}
