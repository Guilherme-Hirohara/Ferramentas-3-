import { Component, inject } from '@angular/core';
import { AlertController, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonButton, IonRow, IonIcon } from '@ionic/angular/standalone';
import {addIcons} from 'ionicons'; 
import {handRightOutline} from 'ionicons/icons'
interface marcador{
  nos: number, 
  eles: number
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonButton, IonRow, IonIcon],
})
export class HomePage {
  
  //constructor
  constructor() {
    addIcons({handRightOutline}); 
  }

  //variaveis
  protected marcador: marcador = {
    nos: 0, 
    eles: 0
  }
  protected pontos: number = 1; 
  private alertController: AlertController = inject(AlertController); 






  protected pontuar(p: boolean){
    if(this.marcador.eles<12 && this.marcador.nos<12){
      if(p){
        this.marcador.nos+=this.pontos
        if(this.marcador.nos >= 12){
          this.exibirGanhador("Ganhador Nós!!"); 
          this.pontos = 1; 
          this.marcador = {
            nos: 0, 
            eles:0
          }
        }
      }else{
        this.marcador.eles+=this.pontos; 
        if(this.marcador.eles >= 12){
          this.exibirGanhador("Ganhador Eles!!")
          this.pontos = 1; 
          this.marcador = {
            nos: 0, 
            eles:0
          }
        }
      }
    }
  }

  protected tirarPontos(p: boolean){
    if(this.marcador.eles >0 || this.marcador.nos>0){
      if(p){
        this.marcador.nos--; 
      }
      else{
        this.marcador.eles--; 
      }
    }
  }

  async exibirGanhador(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'GANHADOR!!',
      message: mensagem,
      buttons: ['Fechar'],
    });

    await alert.present();
  }

  protected truco(){
    if(this.pontos == 1)
      this.pontos+=2; 
    if(this.pontos<12)
      this.pontos+=3;
  }
}
