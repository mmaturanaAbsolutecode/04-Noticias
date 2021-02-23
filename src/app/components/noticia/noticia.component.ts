import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { ActionSheetController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';



@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;


  constructor(private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocal: DataLocalService) { }

  ngOnInit() { }

  abrirNoticia() {

    const browser = this.iab.create(this.noticia.url, '_system');

  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if (this.enFavoritos) {

      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        handler: () => {
          console.log('Favorito Borrado');
          this.dataLocal.borrarNoticia(this.noticia);
        }

      }

    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        handler: () => {
          console.log('Favorito clicked');
          this.dataLocal.guardarNoticia(this.noticia);
        }

      }


    }


    const actionSheet = await this.actionSheetCtrl.create({

      cssClass: 'my-custom-class',
      buttons: [

        {
          text: 'Compartir',
          icon: 'share',
          handler: () => {
            console.log('Compartir clicked');
            this.socialSharing.share(
              this.noticia.title,
              this.noticia.source.name,
              '',
              this.noticia.url

            )
          }
        },
        guardarBorrarBtn,
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }
}


