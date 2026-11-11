import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tarefa } from '../interface/tarefa';


@Service()
export class TarefaService {
    private urlBase = `${environment.api}/tasks`; 
    private http = inject(HttpClient); 

    public getTarefas(){
        return this.http.get<Tarefa[]>(this.urlBase); 
    }

    public deleteTarefa(id: number | undefined){
        return this.http.delete(`${this.urlBase}/${id}`); 
    }
}
