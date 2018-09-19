import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { Evgy } from './app.component';

// Ionic-Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

// Providers
import { AuthData } from '../providers/auth-data';
import { RadioPlayer } from '../providers/radio-service';
import { RssProvider } from '../providers/rss/rss';

// Google Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Firebase - Config
export const config = { 
  apiKey: "AIzaSyArjsOLbSuaf5uVqUdnhZaR3w66ytFhX3U",
  authDomain: "evgy-51113.firebaseapp.com",
  databaseURL: "https://evgy-51113.firebaseio.com",
  projectId: "evgy-51113",
  storageBucket: "evgy-51113.appspot.com",
  messagingSenderId: "549777359608"
};
  
@NgModule({
  declarations: [
    Evgy
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(Evgy),
    IonicStorageModule.forRoot(),
  
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Evgy
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    Facebook,
    RadioPlayer,
    Facebook,
    GooglePlus,
    RssProvider,
    InAppBrowser
  ]
})
export class AppModule {}
