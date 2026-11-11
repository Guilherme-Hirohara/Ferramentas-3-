import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';

@Service()
export class AdminService {
    private urlBase = `${environment.api}/admin/users`; 
    private http = inject(HttpClient); 

    public getUsers(){
        return this.http.get<User[]>(this.urlBase); 
    }
}
