import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonListHeader, IonList, IonLabel, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, ToastController, IonAlert } from '@ionic/angular';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { Produto } from '../interface/produto';
import { Api } from '../service/api';
import { take } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.page.html',
  styleUrls: ['./cadastrar-produto.page.scss'],
  imports: [RouterLink, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonListHeader, IonList, IonLabel, IonItem, IonInput, ReactiveFormsModule, IonSelect, IonSelectOption, IonAlert, IonButton]
})

export class CadastrarProdutoPage implements OnInit {

  protected formBuilder = inject(NonNullableFormBuilder); 
  protected api = inject(Api);
  protected router =inject(Router); 
  protected form = this.formBuilder.group({
    id: [''],
    nome: ['', [Validators.required, Validators.minLength(5)]], 
    categoria:['', [Validators.required]],
    preco:[0, [Validators.required, Validators.min(1)]],
    quantidade:[0, [Validators.required, Validators.min(1)]], 
    fornecedor: ['',[Validators.required]],
  })
  
  protected categoria: string[] = ['Informática',
  'Periféricos',
  'Celulares',
  'Eletrônicos',
  'Áudio e Vídeo',
  'Acessórios']; 

  protected alertButton = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log("Alert canceled"); 
        this.form.reset(); 
      }
    },
    {
      text: 'Confirmar', 
      role: 'confirm', 
      handler: () => {
        console.log("Alert confirm"); 
        this.cadastrarProduto(); 
      }
    }
  ]



  constructor(private toastController: ToastController) { }

  ngOnInit() {
  }

  protected cadastrarProduto(){
    if(this.form.valid){
      const produto: Produto = this.form.getRawValue();  
      this.api.cadastrarProduto(produto).pipe(take(1)).subscribe({
        next:() => {
          this.presentToast(" cadastrado com sucesso", "success");
          // this.form.reset(); 
          this.router.navigate(['/produto']);
        }
      })
    }else{
      this.presentToast(" não cadastrado", "danger"); 
    }
  }

  async presentToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: `${this.form.value.nome}` + mensagem,
      duration: 1500,
      position: 'top',
      color: cor 
    });
    await toast.present(); 
}

}
