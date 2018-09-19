import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController , LoadingController} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

import 'rxjs/add/operator/map';
declare var RSSParser;

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  targetUrl : string ;
  entries : Array<any> = [];
  news: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public afDB: AngularFireDatabase, private iab: InAppBrowser) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    this.news = <FirebaseListObservable<any[]>> afDB.list('/news').map((news) => {
      return news.map((news) => {
        news.images = afDB.list('/news/'+news.$key+'/images')
        loadingPopup.dismiss().catch(() => console.log('ERROR CATCH: LoadingController dismiss'));
        return news
      })
    })
    setTimeout(() => {
      loadingPopup.dismiss();
    }, 5000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RSSPage');
  }
  parseUrlWrapper(){
    return new Promise((resolve,reject) => {
      RSSParser.parseURL(this.targetUrl, function(err, parsed) {
        console.log(parsed.feed.title);
        console.log(parsed.feed.entries);
        if(err){
        reject(err);
        }
        resolve(parsed.feed.entries);
      })
    });
  }
  parseUrl(){ 
    this.parseUrlWrapper().then((entries : Array<any>)=>{ 
      this.entries = entries; 
    })
  }

  openUrl(){
    this.iab.create("https://www.ev-gym-klm.de/index.php?option=com_content&view=category&id=14&Itemid=473&format=feed&type=rss",'_system');

  }
}
