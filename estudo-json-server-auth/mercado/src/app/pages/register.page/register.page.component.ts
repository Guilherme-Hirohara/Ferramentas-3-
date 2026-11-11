import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  IonList,
  IonButton,
  IonIcon,
  ToastController,
  IonInputPasswordToggle
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personAddOutline } from 'ionicons/icons';
import { UserService } from '../../service/user.service';
import { User } from '../../modelo/user';

@Component({
  selector: 'app-register.page',
  templateUrl: './register.page.component.html',
  styleUrls: ['./register.page.component.scss'],
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    ReactiveFormsModule,
    IonInput,
    IonList,
    IonButton,
    IonIcon,
    RouterLink,
    FormsModule,
    IonInputPasswordToggle
  ],
})
export class RegisterPageComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private formsModule = inject(NonNullableFormBuilder);

  protected forms = this.formsModule.group({
    firstName: ['', [Validators.required]],
    lastName: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(18)]],
    email: ['', [Validators.required, Validators.email]],
    cargo: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  protected confirmPassword: string = '';

  constructor(private toastController: ToastController) {
    addIcons({ personAddOutline });
  }

  ngOnInit() {}

  protected registerUser() {
    const formsValues = this.forms.getRawValue();
    let user: User;
    if (this.forms.valid) {
      if (formsValues.password === this.confirmPassword) {
        if (this.getCargo() !== 'Admin') {
          user = {
            firstName: formsValues.firstName,
            lastName: formsValues.lastName,
            age: formsValues.age,
            cargo: 'Client',
            email: formsValues.email,
            password: formsValues.password
          };
        } else {
          user = {
            firstName: formsValues.firstName,
            lastName: formsValues.lastName,
            age: formsValues.age,
            cargo: formsValues.cargo,
            email: formsValues.email,
            password: formsValues.password
          };
        }
        this.userService.registerUser(user).subscribe({
          next: () => {
            this.presentToast('Cadastro realizado com sucesso!', 'success');
            this.forms.reset();
            this.router.navigate(['/login']);
          },
          error: () => {
            this.presentToast('Erro ao realizar o cadastro!', 'danger');
          }
        });
      } else {
        this.presentToast('As senhas não coincidem!', 'danger');
      }
    } else {
      this.presentToast('Preencha todos os campos corretamente!', 'danger');
    }
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

  protected getCargo() {
    return this.userService.getUser()?.cargo;
  }
}
