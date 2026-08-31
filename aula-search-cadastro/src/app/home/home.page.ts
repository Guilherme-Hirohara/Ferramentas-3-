import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastController, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonList, IonInput, IonItem, IonGrid, IonRow, IonCol } from '@ionic/angular';
import {addIcons} from 'ionicons'; 
import { heart, trashOutline } from 'ionicons/icons';

interface Pessoa{
  nome?: string, 
  endereco?: string, 
  salario?: number
}

@Component({ 
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonGrid, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonInput, IonItem, IonRow, IonCol, IonRow, FormsModule],
})

export class HomePage {
  protected pessoas: Pessoa[] = [];  
  protected pessoa: Pessoa = {}; //Toda interface deve inicializar. Tipo instanciar que nem em java. Sempre a boa prática é inicilizar no constructor
  constructor(private toastController: ToastController) {
    addIcons({ heart, trashOutline }); 
  }

  //   async exibirMensagem(mensagem: string) {
  //   const toast = await this.toastController.create({
  //     message: mensagem,
  //     duration: 2000,
  //     position: 'bottom',
  //   }); 

  //   await toast.present();
  // }

  protected exibir(){
    console.log("Método exibir"); 
    console.log(this.pessoa.nome);
  }

  protected adicionar(){
    if(this.pessoa.nome?.length && this.pessoa.endereco?.length && this.pessoa.salario){
      console.log(this.pessoa.nome, this.pessoa.endereco);
      this.pessoas.push(this.pessoa); 
     // this.exibirMensagem("Pessoa adicionada");
    }
    this.pessoa = {}; 
    console.log(this.pessoas); 
  }

  protected deletar(index: number){
    this.pessoas.splice(index, 1); 
    //this.exibirMensagem("Pessoa removida");
  }
}
