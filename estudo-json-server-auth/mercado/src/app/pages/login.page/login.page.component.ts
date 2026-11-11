import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonInput,
  IonButton,
  IonInputPasswordToggle,
  IonIcon,
  ToastController
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { UserService } from '../../service/user.service';
import { LoginResponse } from '../../modelo/loginResponse';

@Component({
  selector: 'app-login.page',
  templateUrl: './login.page.component.html',
  styleUrls: ['./login.page.component.scss'],
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonInput,
    IonButton,
    IonInputPasswordToggle,
    IonIcon,
    ReactiveFormsModule,
    RouterLink
  ],
})
export class LoginPageComponent implements OnInit {
  private router = inject(Router);
  private formBuilder = inject(NonNullableFormBuilder);
  private userService = inject(UserService);

  protected form = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(5), Validators.required]]
  });

  constructor(private toastController: ToastController) {
    addIcons({ personCircleOutline });
  }

  ngOnInit() {}

  realizarLogin() {
    if (!this.form.invalid) {
      const user = {
        email: this.form.value.email,
        password: this.form.value.password
      };
      this.userService.loginUser(user).subscribe({
        next: (loginResponse) => {
          this.userService.setToken(loginResponse.accessToken);
          this.userService.setUser(loginResponse.user);
          this.presentToast('Login realizado com sucesso', 'success');
          this.router.navigate(['/home']);
        },
        error: () => {
          this.presentToast('Usuário ou senha inválidos!', 'danger');
        }
      });
    } else {
      this.presentToast('Preencha os campos corretamente!', 'danger');
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

  protected navegar() {
    this.router.navigate(['/register']);
  }
}
