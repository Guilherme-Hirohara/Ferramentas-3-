import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Vendas } from '../interface/vendas';

@Service()
export class Api {
    private http = inject(HttpClient); 
    private urlBase = `${environment.api}/vendas`

    public getVendas(){
        return this.http.get<Vendas[]>(this.urlBase);
    }

    public getVendaId(index: number){
        return this.http.get<Vendas> (`${this.urlBase}/${index}`);
    }

    public deletarVenda(index: number){
        return this.http.delete(`${this.urlBase}/${index}`); 
    }
}
