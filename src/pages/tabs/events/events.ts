import { Component } from '@angular/core';
import { IonicPage, NavController , NavParams, ModalController, LoadingController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  events: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController ,public modalCtrl: ModalController, public afDB: AngularFireDatabase) 
  { 
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    this.events = <FirebaseListObservable<any[]>> afDB.list('/events').map((events) => {
        return events.map((timeline) => {
            timeline.data = afDB.list('/events/'+events.$key+'/data')  
            loadingPopup.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
            return events            
        })        
    });
    setTimeout(() => {
      loadingPopup.dismiss();
    }, 10000)
  }

}
