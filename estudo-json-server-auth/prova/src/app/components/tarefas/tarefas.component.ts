import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IonHeader,
  IonTitle,
  IonButton,
  IonToolbar,
  IonIcon,
  IonList,
  IonContent,
  IonLabel,
  IonItem,
  AlertController,
  ToastController,
  ViewWillEnter,
  IonSelectOption,
  IonSelect,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logOutOutline, reorderThreeOutline, trash } from 'ionicons/icons';
import { Tarefa } from '../../interface/tarefa';
import { LoginService } from '../../service/login.service';
import { Payload } from '../../interface/payload';
import { Router, RouterLink } from '@angular/router';
import { TarefaService } from '../../service/tarefa.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss'],
  imports: [
    IonItem,
    IonLabel,
    IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonList,
    IonContent,
    IonSelectOption,
    IonSelect,
    RouterLink,
  ],
})
export class TarefasComponent implements OnInit, ViewWillEnter {
  protected tarefas = signal<Tarefa[]>([]);
  private loginService = inject(LoginService);
  private tarefaService = inject(TarefaService);
  private router = inject(Router);
  protected payload: Payload | null = null;
  protected botoes = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Cancelado');
      },
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {
        console.log('Confirmar');
      },
    },
  ];
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
  ) {
    addIcons({ reorderThreeOutline, logOutOutline, trash });
    this.getUser();
    this.getTarefa();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getTarefa();
    this.getUser();
  }

  protected getUser() {
    this.payload = this.loginService.getPayLoad();
  }

  protected logout() {
    this.loginService.deleteToken();
    this.payload = null;
    this.router.navigate(['/']);
  }

  protected getTarefa() {
    this.tarefaService.getTarefas().subscribe({
      next: (t) => {
        console.log(t);
        console.log('Tarefas acessadas');
        this.tarefas.set(t);
      },
      error: () => {
        console.error('Erro ao buscar tarefas');
      },
    });
  }

  protected deletarTarefa(id: number | undefined) {
    console.log('funcao deletar');
  }

  async presentAlert(id: number | undefined) {
    const alert = await this.alertController.create({
      header: 'Deletar tarefa',
      message: 'Deseja realamente deletar esta tarefa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.tarefaService.deleteTarefa(id).subscribe({
              next: () => {
                this.presentToast('Sucesso ao deletar a tarefa!!', 'success');
                this.getTarefa();
              },
              error: () => {
                this.presentToast('Erro ao tentar deletar!!', 'danger');
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(msg: string, cor: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
      color: cor,
    });

    await toast.present();
  }

  handleChange(event: CustomEvent) {
    console.log('ionChange fired with value: ' + event.detail.value);
    if(event.detail.value == 'Todas'){
      console.log("Todas tarefas!!"); 
      this.getTarefa(); 
    }
    else{
      this.tarefaService.getTarefas().subscribe({
        next: (t) => {
          this.tarefas.set(t.filter((tarefa) => {
            if(tarefa.priority == event.detail.value)
              return true; 
            return false; 
          }))
        }
      })
      console.log("Sem ser todas"); 
    }
  }
}
