import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { UserResponse } from '../interfaces/user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private httpClient = inject(HttpClient); 
  private urlBase = environment.api + '/users'; 

  public getAll(){
    return this.httpClient.get<User[]>(this.urlBase); 
  }

  public cadastrar(user:User){

  }

  public delete(id: number){
    return this.httpClient.delete(`${this.urlBase}/${id}`); 
  }

  public getUserId(id:number){

  }


}
