import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonButtons, IonMenuButton, IonButton, IonIcon, IonTabs, IonTabBar, IonTabButton, IonLabel, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import  { personCircleOutline, bagOutline, lockClosedOutline, restaurantOutline} from 'ionicons/icons'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonButtons, IonMenuButton, IonButton, IonIcon, RouterLink, IonTabs, IonTabBar, IonTabButton, IonLabel],
})
export class HomePage {
  constructor(private toastController: ToastController) {
    addIcons({personCircleOutline, bagOutline, lockClosedOutline, restaurantOutline}); 
  }

  public async presentToast(msg: string, cor: string) {
    const toast = await this.toastController.create({
      message: msg,  
      duration: 1500,
      position: 'bottom',
      color: cor
    });

    await toast.present();
  }
}
