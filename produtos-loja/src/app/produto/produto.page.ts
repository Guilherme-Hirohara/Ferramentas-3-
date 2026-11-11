import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonButton, IonAlert, AlertController } from '@ionic/angular';
import { Api } from '../service/api';
import { Produto } from '../interface/produto';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import type { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
  imports: [IonAlert, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonButton]
})
export class ProdutoPage implements OnInit {

  protected api = inject(Api); 
  protected produtos = signal<Produto[]>([]); 
  protected router = inject(Router); 
  protected alertOpen: boolean = false; 
  protected alertButtons = [
    {
      text: 'Calcelar',
      role: 'calcel', 
      handler: () => {
        console.log("Cancelar deletar"); 
      }
    },  
    {
      text: 'Confirmar', 
      role: 'confirm', 
      handler: () => {
        console.log("Confirmar deletar"); 
      }
    }
  ]


  constructor(private alertController: AlertController) { 
    this.getProduto();
  }

   ionViewWillEnter() {
    this.getProduto();
  }

  ngOnInit() {
  }

  protected getProduto(){
    this.api.getProduto().pipe(take(1)).subscribe({
      next: (p) => {
        console.log("Produto buscado com sucesso");
        this.produtos.set(p);
      },
      error: () => {
        console.error('Erro ao buscar produto'); 
      }
    })
  }

  protected navegarCadastro(){
    this.router.navigate(['/cadastrar-produto']);
  }

    async deletarProduto(index: string) {
    const alert = await this.alertController.create({
      header: 'Deletar produto',
      subHeader: 'Deseja realmente deletar este produto',
      buttons: [
        {
          text: 'Cancelar', 
          role: 'cancel', 
          handler: () => {
            console.log("Cancelar")
          }
        }, 
        {
          text: 'Confirmar', 
          role: 'confirm', 
          handler: () =>{
            this.api.deletarProduto(index).subscribe({
              next: () => {
                console.log("Produto deletado")
                this.getProduto(); 
              }, 
              error: () => {
                console.error("Erro ao deletar"); 
              }
            }) 
          }
        }
    ],
    });

    await alert.present();
  }

}
