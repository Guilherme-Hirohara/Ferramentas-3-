import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonContent, IonGrid, IonCol, IonRow, IonIcon } from '@ionic/angular';
import { AdminService } from '../../service/admin.service';
import { User } from '../../interface/user';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { LoginService } from '../../service/login.service';
import { Payload } from '../../interface/payload';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  imports: [IonIcon, IonRow, IonCol, IonGrid, IonHeader, IonToolbar, IonTitle, IonButton, RouterLink, IonContent],
})
export class ListUserComponent implements OnInit {
  private loginService = inject(LoginService); 
  private adminService = inject(AdminService); 
  private route = inject(Router); 
  protected users = signal<User[]>([]); 
  protected payload: Payload | null = null; 
  constructor() {
    addIcons({logOutOutline}); 
    this.getUser(); 
    this.getPayload(); 
  }

  ngOnInit() {}

  private getUser(){
    this.adminService.getUsers().subscribe({
      next: (u) => {
        console.log(u); 
        this.users.set(u); 
      },
      error: () => {
        console.error("Erro ao buscar usuário"); 
      }
    })
  }

  protected logout(){
    this.loginService.deleteToken();
    this.route.navigate(['/']); 
  }

  private getPayload(){
    this.payload = this.loginService.getPayLoad(); 
  }
}
