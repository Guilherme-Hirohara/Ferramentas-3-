import { Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonHeader, IonTitle, IonToolbar, IonButton, ToastController } from '@ionic/angular';
import { LoginService } from '../../service/login.service';
import { LoginResponse } from '../../interface/login-response';
import { Router } from '@angular/router';
import { Login } from '../../interface/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonButton, IonHeader, IonInput, IonTitle, IonToolbar, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  private router = inject(Router); 
  private loginService = inject(LoginService); 
  private formsModule = inject(NonNullableFormBuilder); 
  protected forms = this.formsModule.group({
    email: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required]]
  })
  private validar = () => {
    if(this.forms.valid){
      return false; 
    }
    return true; 
  }; 
  
  constructor(private toastController: ToastController) {}

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

  protected acessar(){
    if(this.forms.valid){
      const user: Login = this.forms.getRawValue(); 
      this.loginService.realizarLogin(user).subscribe({
        next: (loginResponse: LoginResponse) => {
          console.log(loginResponse.accessToken); 
          this.loginService.setToken(loginResponse.accessToken); 
          this.router.navigate(['/tasks'])
        },
        error: (error) => {
          console.log(error.message); 
           this.presentToast(error.message, "danger"); 
        }
      })
    }
    else{
      this.presentToast("Formulário inválido!!", "danger"); 
    }
  }

  protected botaoValidar(){
    console.log("Validando formulário botão"); 
    if(this.forms.invalid){
      return true; 
    }
    return false; 
  }

}
