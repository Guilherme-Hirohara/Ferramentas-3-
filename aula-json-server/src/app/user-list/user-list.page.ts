import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { take } from 'rxjs';
import { UsersService } from '../api/users.service';
import { User } from '../interfaces/user.interface';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,  IonLabel]
})
export class UserListPage implements OnInit {

  private userService = inject(UsersService); 
  protected users: User[] = [];  
   
  constructor() { 
    addIcons({ trash });
    this.getUsers(); 
  }

  ngOnInit() {
    
  }

  private getUsers(){
    //Síncrona
    console.log('1'); 

    //Assíncrona -> quer dizer que não aguarda uma instrução terminar e já passa pro próximo 
    this.userService.getAll().pipe(take(1)).subscribe({
      //Sucesso 
      next: (user: User[]) => {
        this.users = user;   
      },
      //Erro 
      error: (e) => {
        console.error(e); 
      }
    });

    console.log('3'); 
  }

  protected deletarPeloId(id: number){
    this.userService.delete(id).subscribe({
      next: () => {
        console.log("Deletou"); 
      },
      error: () => {
        console.error("Erro")
      }
    }); 

    this.getUsers(); 
  }

}
