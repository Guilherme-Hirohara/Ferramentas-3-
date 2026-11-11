import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../modelo/produto';

@Service()
export class ProdutosService {
    private urlBase = environment.api; 
    private http = inject(HttpClient);
    
    public getProducts(){
        return this.http.get<Produto[]>(`${this.urlBase}/produtos`); 
    }

    public setProducts(produto: Produto){
        return this.http.post(`${this.urlBase}/produtos`, produto); 
    }

    public getProductsId(id: number){
        return this.http.get<Produto>(`${this.urlBase}/produtos/${id}`); 
    }

    public putProductsId(id: number, produto: Produto){
        return this.http.put(`${this.urlBase}/produtos/${id}`, produto); 
    }

    public deleteProduct(id: number){
        return this.http.delete(`${this.urlBase}/produtos/${id}`); 
    }
}
