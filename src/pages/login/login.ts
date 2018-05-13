import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { QiscusService } from '../services/qiscus.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  url: string
  sdkSecret: string
  user_id: string
  password: string
  username: string
  userData: userData
  constructor(public QiscusServices: QiscusService,private http: HTTP,public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.url = 'qiscuscha-zo9gdtwkyfl'
    this.sdkSecret = 'f3d87cde7a707cf85a918ff1a1f2afe5'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage',);
  }

  login() {
    this.userData={
      user_id: this.user_id,
      password: this.password,
      username: this.username
    }
    this.QiscusServices.loginService(this.userData, this.viewCtrl)
    // console.log('login',this.url,'xxx',this.sdkSecret)
    // this.http.post('qiscuscha-zo9gdtwkyfl.qiscus.com/api/v2.1/rest/login_or_register',{
    //   user_id: this.user_id,
    //   password: this.password,
    //   username: this.username
    // },{
    //     "QISCUS_SDK_SECRET": this.sdkSecret,
    //     "Content-Type": "application/x-www-form-urlencoded"
    // }).then(resp => {
    //   console.log(resp,'ini resp')
    // }).catch(err => {
    //   console.error(err)
    // })
  }
}

interface userData {
  user_id: string,
  username: string,
  password: string
}
