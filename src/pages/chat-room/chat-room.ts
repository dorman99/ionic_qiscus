import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QiscusService } from '../services/qiscus.service';



@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

  private roomId: number;
  private name?: string;
  private avatar: string;

  constructor(
    private navParams: NavParams,
    private QiscusService: QiscusService
  ) {
    this.roomId = this.navParams.get("roomId");
    this.name = this.navParams.get("name");
  }

  ionViewDidLoad() {
    console.log('ini jalan ga? chat room ini')
    this.QiscusService.render();
    this.QiscusService.openChatRoom(this.roomId);
    (<any>window).$$comp = this
  }

  ionViewWillEnter() {
    this.QiscusService.currentRoom$.subscribe(room => {
      this.name = room.name;
      this.avatar = room.avatarURL;
    });
  }

}
