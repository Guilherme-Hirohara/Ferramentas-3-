import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonGrid, IonRow, IonCol, IonButton, IonAlert, ToastController } from '@ionic/angular';
import { Brand } from '../interface/brand';
import { Api } from '../service/api';
import { take } from 'rxjs';
import { ProductBrand } from '../interface/product.brand';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
  imports: [CurrencyPipe, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonGrid, IonRow, IonCol, IonButton, IonAlert]
})
export class ListProductsPage implements OnInit {

  protected total: number = 0; 
  protected lista: ProductBrand[] = [];
  protected productBrand = signal<ProductBrand[]>([]);
  protected api = inject(Api);
  protected brandName: string = '';
  protected brands = signal<Brand[]>([])
  protected isAlertOpen = false;
  protected idBrand: number = -1;
  protected alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log("Cancelado");
      }
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => { 
        this.productBrand.update((v) => {
          this.presentToast(`The ${v[this.idBrand].brand} ${v[this.idBrand].name_product} was deleted`); 
          v.splice(this.idBrand, 1); 
          this.calcularTotal(); 
          return v;
        })
      }
    }
  ]
  constructor(private toastController: ToastController) {

  }

  ngOnInit() {
  }

  async presentToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'middle',
    });

    await toast.present();
  }

  remover(isOpen: boolean, index: number) {
    this.idBrand = index;
    this.isAlertOpen = isOpen;
  }

  protected getBrand() {
    this.api.searchBrand(this.brandName.toLowerCase()).pipe(take(1)).subscribe({
      next: (b) => {
        if (b.length) {
          let biggestBrand: Brand;
          biggestBrand = b.reduce((v, b) => {
            if (v.price < b.price) {
              return b;
            }
            return v;
          });
          this.brandName = '';
          const produto: ProductBrand = {
            brand: biggestBrand.brand,
            name_product: biggestBrand.name,
            price: biggestBrand.price,
            quantity: b.length
          };

          const novaLista: ProductBrand[] = [...this.productBrand(), produto]; //Ele cria um vetor novo, com os dados do antigo mais o novo produto
          this.productBrand.set(novaLista);
          this.calcularTotal(); 
        }
        else {
          this.presentToast(`No products found with the brand ${this.brandName}`);
          this.brandName = '';
        }
      }
    })
  }

  protected calcularTotal(){
    this.total = this.productBrand().reduce((soma, p) => {
      return soma = soma + Number(p.price); 
    }, 0 )
    console.log(this.total); 

  }

}
