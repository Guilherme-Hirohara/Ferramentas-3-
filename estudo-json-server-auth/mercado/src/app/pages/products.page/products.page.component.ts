import { Component, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonInput, IonButtons, IonButton, IonBackButton, IonIcon, ToastController, IonListHeader } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { createOutline, checkmarkOutline, closeOutline } from 'ionicons/icons';
import { ProdutosService } from '../../service/produtos.service';
import { Produto } from '../../modelo/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products.page',
  templateUrl: './products.page.component.html',
  styleUrls: ['./products.page.component.scss'],
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
    ReactiveFormsModule
],
})
export class ProductsPageComponent implements OnInit {
  private productService = inject(ProdutosService);
  private activatedRoute = inject(ActivatedRoute);
  private formsModule = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private toastController = inject(ToastController);

  protected produto = signal<Produto | undefined>(undefined);
  protected id: number = -1;

  protected forms = this.formsModule.group({
    nome: ['', [Validators.required]],
    quantidade: [0, [Validators.required, Validators.min(0)]],
    valorUnitario: [0, [Validators.required, Validators.min(0)]]
  });

  constructor() {
    addIcons({ createOutline, checkmarkOutline, closeOutline });
    this.id = Number(this.activatedRoute.snapshot.params['id']);
  }

  ngOnInit() {
    this.getProduto();
  }

  private getProduto() {
    if (this.id > 0) {
      this.productService.getProductsId(this.id).subscribe({
        next: (p) => {
          this.produto.set(p);
          this.forms.patchValue({
            nome: p.nome,
            quantidade: p.quantidade,
            valorUnitario: p.valorUnitario
          });
        },
        error: (err) => {
          console.error('Erro ao buscar produto:', err);
        }
      });
    }
  }

  protected alterarProduto() {
    if (this.forms.valid) {
      const p: Produto = this.forms.getRawValue();

      this.productService.putProductsId(this.id, p).subscribe({
        next: async () => {
          const toast = await this.toastController.create({
            message: 'Produto alterado com sucesso!',
            duration: 1500,
            position: 'bottom',
            color: 'success'
          });
          await toast.present();
          this.router.navigate(['/admin']);
        },
        error: async (err) => {
          console.error('Erro ao alterar o produto:', err);
          const toast = await this.toastController.create({
            message: 'Erro ao alterar o produto!',
            duration: 1500,
            position: 'bottom',
            color: 'danger'
          });
          await toast.present();
        }
      });
    } else {
      console.error('Erro no formulário: campos inválidos');
    }
  }

  protected cancelar() {
    this.router.navigate(['/admin']);
  }
}
