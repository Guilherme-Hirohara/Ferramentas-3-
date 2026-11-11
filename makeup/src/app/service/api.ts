import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Brand } from '../interface/brand';

@Service()
export class Api {
    private http = inject(HttpClient); 
    private urlBase = `${environment.api}`; 

    public searchBrand(brand: string){
        const url = `${this.urlBase}?brand=${brand}`; 
        return this.http.get<Brand[]>(url); 
    }
}
