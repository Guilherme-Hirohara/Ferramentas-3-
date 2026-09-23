import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonSelect, IonSelectOption, IonButton } from '@ionic/angular';
import { Vendas } from '../interface/vendas';
import { Api } from '../service/api';
import { take } from 'rxjs';
import { ItensVenda } from '../interface/itens.venda';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.page.html',
  styleUrls: ['./venda.page.scss'],
  imports: [CurrencyPipe, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonCol, IonRow, IonSelect, IonSelectOption, IonButton],
})
export class VendaPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getVenda(); 
  }


  protected vendas = signal<Vendas[]>([]); 
  protected api = inject(Api); 
  protected id: number=-1; 
  protected itens = signal<ItensVenda[]>([]); 
  protected total: number = 0; 

  protected getVenda(){
    this.api.getVendas().pipe(take(1)).subscribe({
      next: (v) => {
        this.vendas.set(v); 
        
      },
      error: () => {
        console.error('Falha ao buscar na API'); 
      }
    })
  }

  protected handleEvent(event: CustomEvent){
    this.id = event.detail.value; 
    this.getItems(); 
  }

  protected getItems(){
  this.api.getVendaId(this.id).pipe(take(1)).subscribe({
    next:(v) => {
      this.itens.set(v.itens); 
      this.total = v.itens.reduce((soma, elemento) => {
        return soma + (elemento.quantidade * elemento.valorUnitario); 
      }, 0)
    },
    error: () => {
      this.itens.set([]); 
      console.error("Erro ao buscar itens"); 
    }
  })
  }

  protected subTotal(qtd: number, preco: number){
      return preco * qtd; 
  }

  protected deletarVenda(){
      this.api.deletarVenda(this.id).pipe(take(1)).subscribe({
        next: ()=> {
          console.log("Venda deletada"); 
          this.getVenda(); 
          this.getItems(); 
          this.total = 0; 
          this.id = -1; 
        },
        error: () => {
          console.error("Erro ao excluir"); 
        }
      }); 
  }

  
}
