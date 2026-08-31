import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar, IonButton, IonIcon, IonRouterLink, IonSearchbar } from '@ionic/angular';
import { take } from 'rxjs';
import { UsersService } from '../api/users.service';
import { User } from '../interfaces/user.interface';
import { addIcons } from 'ionicons';
import { addCircleOutline, search, trash } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, AsyncPipe, RouterLink, IonSearchbar]
})
export class UserListPage implements OnInit {

  protected router = inject(Router); 
  private userService = inject(UsersService); 
  //protected user$: this.getAll(); 
  protected users = signal<User[]>([]); //Coloca '$' na variavel para demonstrar que é um observable
  protected results: User[] = []; 
  //Observable --> dados vindo da API
  // protected user$ = this.userService.getAll();
  //Anotações -> não precima mais do vetor de usuarios.
                //Desta forma é feito a partir do observable. Nesta forma é necessário colocar o pipe async no html 
                //Como mostrado na página
  
  
  //protected users: User[] = [];  
  
  
  
  
  //Signal 
  //protected user = signal<User[]>([]); 
  //protected user: WritableSignal<User[]> = signal([]); WritableSignal -> um Signal que pode ser escrito 
  //Assim deve-se realizar o 
  // subscribe -> ...(função).subcribe({
  //   next: (resposta: User[]) => {
  //     this.user.set(resposta); 
  //   }
  // })
  //Dentro do html é necessário chamar ele como função. @for(item of user(); track $index) --> desse jeito.
  //Dentro do deletar pode chamar a função this.UserServive.getAll()




  constructor() { 

    addIcons({ trash, addCircleOutline, search});
    this.getUsers(); 
  }

  ngOnInit() {
    
  }

  private getUsers(){
    //Síncrona
    // console.log('1'); 

    // //Assíncrona -> quer dizer que não aguarda uma instrução terminar e já passa pro próximo 
    // this.userService.getAll().pipe(take(1)).subscribe({
    //   //Sucesso 
    //   next: (user: User[]) => {
    //     this.users = user;   
    //   },
    //   //Erro 
    //   error: (e) => {
    //     console.error(e); 
    //   }
    // });

    // console.log('3'); 
    this.userService.getAll().pipe(take(1)).subscribe({
      next: (resposta: User[]) => {
        this.users.set(resposta); 
      }
    })
    console.log("Teste"); 
  }

  protected deletarPeloId(id: number){
    this.userService.delete(id).subscribe({
      next: () => {
        this.getUsers(); 
        console.log("Deletou"); 
      },
      error: () => {
        console.error("Erro")
      }
    }); 

  }

  protected handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.userService.getUserFirstName(query).subscribe({
      next: (resposta: User[]) => {
          this.users.set(resposta); 
      }, 
      error: () => {
        console.error("Erro ao procurar"); 
      }
    })
   }

}
