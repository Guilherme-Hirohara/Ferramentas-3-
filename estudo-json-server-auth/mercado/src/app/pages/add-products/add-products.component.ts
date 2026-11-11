import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonInput,
  IonButtons,
  IonButton,
  IonBackButton,
  IonIcon,
  ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addCircleOutline, arrowBackOutline, closeOutline, checkmarkOutline } from 'ionicons/icons';
import { ProdutosService } from '../../service/produtos.service';
import { Produto } from '../../modelo/produto';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonInput,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AddProductsComponent implements OnInit {
  private produtoService = inject(ProdutosService);
  private formsModule = inject(NonNullableFormBuilder);
  private router = inject(Router);

  protected forms = this.formsModule.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    quantidade: [0, [Validators.required, Validators.min(0)]],
    valorUnitario: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(private toastController: ToastController) {
    addIcons({ addCircleOutline, arrowBackOutline, closeOutline, checkmarkOutline });
  }

  ngOnInit() {}

  async presentToast(msg: string, cor: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
      color: cor
    });

    await toast.present();
  }

  protected adicionarProduto() {
    if (this.forms.valid) {
      const produto: Produto = this.forms.getRawValue();
      this.produtoService.setProducts(produto).subscribe({
        next: () => {
          this.presentToast('Produto Adicionado com sucesso!', 'success');
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.presentToast('Erro ao Adicionar Produto!', 'danger');
        }
      });
    } else {
      this.presentToast('Erro no formulário: verifique os campos!', 'danger');
    }
  }
}
