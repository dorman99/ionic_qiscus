import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { QiscusService } from '../services/qiscus.service';
import { flatMap } from "rxjs/operators";
import { ChatRoomPage } from '../chat-room/chat-room';
import { Room1v1Page } from '../room1v1/room1v1';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rooms:any[]
  constructor(public modalCtrl: ModalController, public navCtrl: NavController,private qiscusChatService: QiscusService) {

  }

  gotToCreateRoomChat() {
    this.navCtrl.push(ContactPage)
  }
  gotTochat1v1RoomCreat() {
    this.navCtrl.push(Room1v1Page)
  }

  onRoomClicked(roomId: number, name?: string) {
    console.log("room.clicked", roomId);
    this.navCtrl.push(ChatRoomPage, {
      roomId: roomId,
      name: 'Name'
    })
  }

  logoutButton() {
    localStorage.clear()
    let loginModal = this.modalCtrl.create(LoginPage)
    loginModal.present()
    loginModal.onDidDismiss(data=>{
      console.log('ini login modal')
      let userData: any = JSON.parse(localStorage.getItem('token'))
    if(userData == undefined) {
      userData = {
        user: {
          user_id: '',
        }
      }
    }
    console.log(userData,'ini data di logout on did dismis');
    (<any>window).$comp = this;
    this.qiscusChatService.initialize();
    this.qiscusChatService.setUser(userData.user.user_id,userData.user.user_id);
    this.qiscusChatService.isReady$
      .pipe(flatMap(() => this.qiscusChatService.getRoomList()))
      .subscribe(rooms => (
        this.rooms = rooms
      )); 
    })
  }

  ionViewWillLeave(){}
  ionViewWillEnter(){
    console.log('ini will enter rooms')
    this.qiscusChatService.isReady$
      .pipe(flatMap(() => this.qiscusChatService.getRoomList()))
      .subscribe(rooms => (
        this.rooms = rooms
      ));
  }

  ngOnInit() {
    this.qiscusChatService.isReady$
      .pipe(flatMap(() => this.qiscusChatService.getRoomList()))
      .subscribe(rooms => (
        this.rooms = rooms
      ));
  }
}
