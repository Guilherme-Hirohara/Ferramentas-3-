import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonBackButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonIcon,
  ToastController,
  ViewWillEnter
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  personCircleOutline,
  cubeOutline,
  pricetagOutline,
  layersOutline,
  trash
} from 'ionicons/icons';
import { ProdutosService } from '../../service/produtos.service';
import { Produto } from '../../modelo/produto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin.page',
  templateUrl: './admin.page.component.html',
  styleUrls: ['./admin.page.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonBackButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonIcon,
    RouterLink
  ],
})
export class AdminPageComponent implements OnInit, ViewWillEnter {
  private produtoService = inject(ProdutosService);
  protected produtos = signal<Produto[]>([]);

  constructor(private toastController: ToastController) {
    addIcons({
      addOutline,
      personCircleOutline,
      cubeOutline,
      pricetagOutline,
      layersOutline,
      trash
    });
  }

  ngOnInit() {
    this.getProdutos();
  }

  ionViewWillEnter() {
    this.getProdutos();
  }

  private getProdutos() {
    this.produtoService.getProducts().subscribe({
      next: (p) => {
        this.produtos.set(p);
      },
      error: () => {
        console.error('Error in getProdutos');
      }
    });
  }

  protected formatarPreco(valor: any): string {
    const num = Number(valor);
    return (isNaN(num) ? 0 : num).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  protected getTotal(valorUn: any, qtd: any): string {
    const preco = Number(valorUn) || 0;
    const quantidade = Number(qtd) || 0;
    return (preco * quantidade).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  async presentToast(msg: string, cor: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
      color: cor
    });

    await toast.present();
  }

  deletarProduto(id: number) {
    this.produtoService.deleteProduct(id).subscribe({
      next: () => {
        this.presentToast('Produto Deletado com sucesso!!', 'success');
        this.getProdutos();
      },
      error: () => {
        this.presentToast('Erro ao Deletar o produto!!', 'danger');
      }
    });
  }
}
