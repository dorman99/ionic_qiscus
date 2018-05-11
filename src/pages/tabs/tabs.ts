import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,) {

  }

  ionViewDidLoad() {
    console.log('ionviewdidload tabs')
    if(!localStorage.getItem('token')) {
      this.modalCtrl.create(LoginPage).present()
    }
  }
}
