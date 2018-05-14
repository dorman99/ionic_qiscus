import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { QiscusService } from '../services/qiscus.service';
import { flatMap } from "rxjs/operators";
import { ChatRoomPage } from '../chat-room/chat-room';

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

  onRoomClicked(roomId: number, name?: string) {
    console.log("room.clicked", roomId);
    this.navCtrl.push(ChatRoomPage, {
      roomId: roomId,
      name: 'Name'
    })
  }

  ngOnInit() {
    this.qiscusChatService.isReady$
      .pipe(flatMap(() => this.qiscusChatService.getRoomList()))
      .subscribe(rooms => (
        this.rooms = rooms
      ));
  }
}
