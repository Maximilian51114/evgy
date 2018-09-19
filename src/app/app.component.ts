import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { AuthData } from '../providers/auth-data';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class Evgy {
  @ViewChild(Nav) nav: Nav;
  rootPage: string = 'TabsPage';
  menu: Array<any> = [];
  pages: Array<any>;

  constructor(public platform: Platform, public authData: AuthData, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // this.menu = [ 
    //   {
    //       title: 'Pläne',
    //       myicon:'',
    //       iconLeft: 'ios-copy',
    //       icon: 'ios-copy-outline',
    //       showDetails: true,
    //       items:  [
    //         {name:'Vertretungsplan',component: 'TabsPage'},
    //         {name:'Klausurplan',component: 'EventsPage'},
    //         {name:'Veranstaltungen',component: 'EventsPage'}
    //       ]
    //     },{
    //       title: 'Neuigkeiten',
    //       myicon:'',
    //       iconLeft: 'ios-megaphone',
    //       icon: 'ios-megaphone-outline',
    //       showDetails: true,
    //       items:  [
    //         {name:'Top',icon:'flame',component: 'NewsPage'},
    //         {name:'Neu',icon:'paper-plane',component: 'NewsPage'},
    //         {name:'Angepinnt',icon:'flag',component: 'NewsPage'}
    //     ]
    //     },{
    //       title: 'Community',
    //       myicon:'',
    //       iconLeft: 'ios-globe',
    //       icon: 'ios-globe-outline',
    //       showDetails: true,
    //       items:  [
    //         {name:'Nachrichten',icon:'mail',component: 'MessagesPage'},
    //         // {name:'Kummerkasten',icon:'stats',component: 'NewsPage'},
    //         {name:'Umfragen',icon:'stats',component: 'SurveysPage'},
    //         {name:'Einreichen',icon:'cloud-upload',component: 'UploadPage'}
    //     ]
    //   }
    // ]

    this.pages = [
      { icon:'copy', title:'Pläne', component: 'TabsPage'},
      { icon:'', title:'Vertretungsplan', component: 'TabsPage'},
      { icon:'list', title:'Klausurplan', component: 'EventsPage'}, //filter -> Klausuren
      { icon:'calendar', title:'Veranstaltungen', component: 'EventsPage'},
      //       { icon:'list', title: 'Listen', component: ''}, -> Liste zum eintragen? /Kategorie noch unschlüssig
      // --- Neuigkeiten --- (sollen mit Filtern angesteuert werden)
      { icon:'megaphone', title: 'Neuigkeiten', component: 'NewsPage'}, // Kategorie
      { icon:'flame', title:'Top', component: 'NewsPage'}, // Filter -> top
      { icon:'paper-plane', title:'Neu', component: 'NewsPage'}, // Filter -> new
      { icon:'flag', title:'Angepinnt', component: 'NewsPage'}, // Filter -> flag
      // // --- "Community" ---
      // { icon:'globe', title: 'Community', component: 'TabsPage'}, // Kategorie
      // { icon:'mail', title:'Nachrichten', component: 'MessagesPage'},
      // //       { icon:'', title: 'Kummerkasten, component: ''},
      // { icon:'stats', title:'Umfragen', component: 'SurveysPage'},
      // { icon:'cloud-upload', title:'Einreichen', component: 'UploadPage'},
      // // --- Sonstiges ---
      // { icon:'', title:'Profil', component: "ProfilePage" }, 
      { icon:'settings', title:'Einstellungen', component: 'SettingsPage'}, 
      { icon:'', title:'FAQ', component: 'FAQPage'}, 
      { icon:'', title:'Kontakt & Feedback', component: 'ContactPage'} 
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  toggleDetails(menu) {
    if (menu.showDetails) {
        menu.showDetails = false;
    } else {
        menu.showDetails = true;
    }
  }

  openPage(page) {
    // page.component = item array.component --> 
    this.nav.setRoot(page.component);
  }

}
