import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { QiscusService } from '../pages/services/qiscus.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private qiscusChatService:QiscusService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad app');
    if(localStorage.getItem('token')) {
      console.log('token ada')
    } else {
      console.log('token tidak ada`')
    }
  }

  ngOnInit() {
    console.log('ini jalan ke ?');
    // let user: {user_id:'',password:''};
    let userData: any = JSON.parse(localStorage.getItem('token'))
    if(userData == undefined) {
      userData = {
        user: {
          user_id: '',
        }
      }
    }
    // console.log(userData,'ini awal');
    (<any>window).$comp = this;
    this.qiscusChatService.initialize();
    this.qiscusChatService.setUser(userData.user.user_id,userData.user.user_id); //user_id sama password
  }
}
