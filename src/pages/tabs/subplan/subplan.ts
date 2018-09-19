import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController , LoadingController } from 'ionic-angular';

// import { File } from '@ionic-native/file'
// import { DocumentViewer } from '@ionic-native/document-viewer'
// import { FileTransfer } from '@ionic-native/file-transfer'

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

// import { TableToJson } from 'tabletojson'; TODO: implementieren des Modules oder des HTML-Parsers (../assets/js/tabletojson.min.js | test.html)
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-subplan',
  templateUrl: 'subplan.html'
})
export class SubplanPage {
  // tabletojson: TableToJson;
  // url: 'https://www.ev-gym-klm.de/images/stories/vplaene/subst_001.html';
  items: FirebaseListObservable<any[]>;
  status: boolean;
  shownFeeds: any = [];
  groups: any = [];
  feedView: string = "activity";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public afDB: AngularFireDatabase) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: '' 
    });
    loadingPopup.present();
    this.items = <FirebaseListObservable<any[]>> afDB.list('/subplan').map((items) => {
      return items.map((items) => {
        loadingPopup.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
        return items
      })
    });
    setTimeout(() => {
      loadingPopup.dismiss();
    }, 10000);
    this.status = false
  }

  // tabletojason.convertUrl(this.url).then(function(tablesAsJson) {
  //   var notes = tablesAsJson[1];
  //   var subplanData = tablesAsJson[2];
  // });
}


  
  //PDF als Alternative
  // downloadAndOpenPdf() {
  //   let path = null;

  //   if (this.platform.is('ios')) {
  //     path = this.file.documentsDirectory;
  //   } else if (this.platform.is('android')) {
  //     path = this.file.dataDirectory;
  //   }

  //   const transfer = this.transfer.create();
  //   transfer.download('https://www.ev-gym-klm.de/images/stories/vplaene/vertretungen_morgen.pdf', path + 'myfile.pdf').then(entry => {
  //     let url = entry.toURL();
  //     this.document.viewDocument(url, 'application/pdf', {});
  //   });
  // }