import { Component } from '@angular/core';
import { AlertController } from 'AppTodo/node_modules/@ionic/angular/ionic-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertCrtl: AlertController) {}
  async shawAdd() {
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
        handler: () => {
          console.log('Adicionado com sucesso!');
        },
      },
      ],
    });
    await alert.present();
}

}
