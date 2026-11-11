import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Produto } from '../interface/produto';

@Service()
export class Api {
    private http = inject(HttpClient); 
    private urlBase = `${environment.api}/produtos`; 

    public getProduto(){
        return this.http.get<Produto[]>(this.urlBase); 
    }

    public cadastrarProduto(produto: Produto){
        return this.http.post(this.urlBase, produto); 
    }

    public deletarProduto(index: string){
        console.log(`${this.urlBase}/${index}`);
        return this.http.delete(`${this.urlBase}/${index}`); 
    }
}
