import { Injectable } from '@angular/core';
// import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage'

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthData {
  // userData: any;
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  constructor(
    public afAuth: AngularFireAuth, 
    // private platform: Platform, 
    private facebook: Facebook, 
    private googleplus: GooglePlus,
    public storage: Storage) {
  }

signInWithPopupFacebook(): Promise<any> {
  return this.afAuth.auth
    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res => console.log(res));
}

signInWithFacebook(): Promise<any> {
  
    return this.facebook.login(['email', 'public_profile']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      return firebase.auth().signInWithCredential(facebookCredential);
    })
}

signInWithGoogle(): Promise<any> {

    return this.googleplus.login({
      //'webClientId':'231..........-rj2va.........apps.googleusercontent.com',    ändern!
      'offline': true}).then(res =>{
      return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)) 
    })
  
}

 updateUserProfile(uid,displayName,email,photo,phone){
  firebase.database().ref('/userProfile').child(uid).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
   
      if (exists) {
        console.log('Der Nutzer ' + uid + ' existiert!');
        firebase.database().ref('userProfile/'+uid).update({ 
          name: displayName,
          email: email,
          photo: photo,
          phone: phone
        });
       
      } else {
        console.log('Der Nutzer ' + uid + ' existiert nicht!');
        firebase.database().ref('/userProfile').child(uid).set({  
          name: displayName,
          email: email,
          photo: photo,
          phone: phone
        });
 
      }
  });

 }

  loginUser(newEmail: string, newPassword: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.afAuth.auth.signInWithEmailAndPassword(newEmail,newPassword);
    });
  }

  resetPassword(email: string):Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  
  registerUser(name: string, email: string, password: string, phone: number): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
        firebase.database().ref('/userProfile').child(newUser.uid).set({
          email: email,
          name: name,
          phone: phone
        });
      });
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }

}

