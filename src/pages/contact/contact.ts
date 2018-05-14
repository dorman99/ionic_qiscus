import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QiscusService } from '../services/qiscus.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  user_id: string
  room_name: string
  roomData: roomData
  constructor(public navCtrl: NavController, private qiscusService: QiscusService) {
  }

  createNewRoom() {
    let arrayUsers = []
    arrayUsers.push(this.user_id)

    let dataCreator = JSON.parse(localStorage.getItem('token'))
    this.roomData={
      participants: arrayUsers,
      room_name: this.room_name,
      creator: dataCreator.user.user_id
    }
    // console.log(this.roomData,'---',dataCreator)
    this.qiscusService.createRoomService(this.roomData,this.navCtrl)
  }
}

interface roomData{
  participants: any,
  room_name: string,
  creator: string
  
}
