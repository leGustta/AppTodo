import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tarefas: any[] = [];

  constructor(private alertCrtl: AlertController,private toastCtrl: ToastController,private actionSheetCtrl: ActionSheetController) {
    let tarefaSalva = localStorage.getItem('tarefaUsuario');

    if (tarefaSalva !=null) {
      this.tarefas = JSON.parse(tarefaSalva);
    }
  }
  

  async showAdd() {
    const alert = await this. alertCrtl.create({
      cssClass: 'my-custom-class',
      header: 'o que você deseja fazer?',
      inputs: [
        {
          name: 'tarefa1',
          type: 'text',
          placeholder: 'Digite o que deseja fazer.',
        },
      ],
      buttons: [
        {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Cancelado com sucesso!');
        },
      },
      {
        text: 'Adicionar',
        handler: (form) => {
          this.adicionandoTarefa(form.tarefa1);
        },
      },

      ],
    });
  await alert.present();
}
async  adicionandoTarefa(novatarefa: string) {
  if (novatarefa.trim().length < 1) {
    const toast = await this.toastCtrl.create({
      message: 'Por favor, digite a tarefa 1',
      duration:2000,
      position: 'top',
    });
    toast.present();
    return;

  }
  const tarefa = { nome:novatarefa, realizada: 0 };
  this.tarefas.push(tarefa);
 
  this.todoService.adicionandoTarefa(tarefa.nome, tarefa.realizada )
  .then(async(resposta)=>{
    const toast = await this.toastCtrl.create({
      message: 'Operação Realizada com Sucesso!',
      duration: 2000,
      position: 'top'
    })
    toast.present();
  })
  .catch(async(erro)=>{
  const toast = await this.toastCtrl.create({
    message: 'Erro ao realizar operação!',
    duration: 2000,
    position: 'top'
  });
  toast.present()  })

}

  salvaLocalStorage(){
    localStorage.setItem('tarefaUsuario', JSON.stringify(this.tarefas));
  }

  async realizaAcoes(tarefa: any) {
    const actionSheet= await this.actionSheetCtrl.create({
      header: 'Qual ação realizar?',
      buttons: [{
        text: tarefa.realizada ? 'Desmacar' : 'Marcar',
        icon: tarefa.realizada ? 'checkmark-circle' : 'radio-button-off-outline',
        handler: () => {
          tarefa.realizada = !tarefa.realizada;
          this.salvaLocalStorage();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
    const {role, data } = await actionSheet.onDidDismiss();
  
  }
  excluirTarefa(tarefa: any){
    this.tarefas = this.tarefas.filter(arrayTarefa => tarefa != arrayTarefa);

    this.salvaLocalStorage();
 }
}
