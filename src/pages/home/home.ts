import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { QiscusService } from '../services/qiscus.service';
import { flatMap } from "rxjs/operators";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rooms:any[]
  constructor(public navCtrl: NavController,private qiscusChatService: QiscusService) {

  }

  gotToCreateRoomChat() {
    this.navCtrl.push(ContactPage)
  }

  ngOnInit() {
    // this.qiscusChatService.isReady$
    //   .pipe(flatMap(() => this.qiscusChatService.getRoomList()))
    //   .subscribe(rooms => (this.rooms = rooms));
  }
}
