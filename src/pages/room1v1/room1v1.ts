import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QiscusService } from '../services/qiscus.service';

/**
 * Generated class for the Room1v1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room1v1',
  templateUrl: 'room1v1.html',
})
export class Room1v1Page {
  user_id: string
  users: any[]
  constructor(public navCtrl: NavController, public navParams: NavParams, private QiscusService: QiscusService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Room1v1Page');
  }

  create1v1Room() {
    let user_ids = []
    let creator:any = localStorage.getItem('token')
    creator = JSON.parse(creator)
    console.log(creator,'00000')
    user_ids.push(creator.user.user_id)
    user_ids.push(this.user_id)
    console.log('--->', user_ids)

    this.QiscusService.create1on1Room(user_ids,this.navCtrl)
  }
}
