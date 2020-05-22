import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import {AngularFirestore} from '@angular/fire/firestore';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private angFirestore: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
      }
    };

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  onLoginSuccessful() {
    // get current user
    const user = firebase.auth().currentUser;

    this.angFirestore.collection('users').doc(user.uid).set({
      uid: user.uid,
      fullName: user.displayName,
      email: user.email,
      photoUrl: '',
      registerDate: new Date(),
      memberGroup: '',
      role: '',
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,});
  }

}
