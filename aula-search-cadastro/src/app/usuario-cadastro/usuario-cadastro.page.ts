import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonRouterLink } from '@ionic/angular';
import { IonList } from "@ionic/angular";
import { IonItem } from "@ionic/angular";
import { UsersService } from '../api/users.service';
import { User } from '../interfaces/user.interface';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.page.html',
  styleUrls: ['./usuario-cadastro.page.scss'],
  standalone: true,
  imports: [IonInput, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, ReactiveFormsModule, RouterLink]
})
export class UsuarioCadastroPage implements OnInit {

  protected userService = inject(UsersService); 
  protected route = inject(Router); 
  //NonNullableFormBuilder 
  //FormBuilder 
  //UntypedFormBuilder
  private formBuilder = inject(NonNullableFormBuilder);
  protected form = this.formBuilder.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]], 
    last_name: ['', [Validators.required, Validators.minLength(3)]], 
    email: ['', [Validators.required, Validators.email]],  //Pode deixar vazio os atributos que não serão usados no form para n dar conflito ao cadastrar
    id: [0],
    avatar: []
  }); 

  constructor() { }

  ngOnInit() {
  }

  protected realizarCadastro(){
      console.log(this.form.valid); 
      if(this.form.valid){
        const usuario: User = this.form.getRawValue(); 
        console.log(this.form.value); 

        this.userService.cadastrar(usuario).subscribe({
          next: () => {
            console.log("Cadastrado com sucesso!!"); 
            this.form.reset(); 
            this.route.navigate(['/user-list']); 
          },
          error: () => {
            console.log("Não cadastrado"); 
          }
        }); 

      } else{
        console.log('Formulário Inválido!!!'); 
      }
  }
}
