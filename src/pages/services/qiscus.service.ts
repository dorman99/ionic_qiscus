import { HttpClient } from '@angular/common/http'
import {Injectable} from '@angular/core'
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { interval } from "rxjs/observable/interval";
import { map, tap, distinctUntilChanged, filter } from "rxjs/operators";

declare const QiscusSDK: any;

export interface Room {
	id: number;
	avatarURL: string;
	countNotif: number;
	name: string;
	options: any;
	type: string;
}

@Injectable()
export class QiscusService {
	http: Observable<any>
	sdkSecret: string
	constructor(public httpClient: HttpClient){
		this.sdkSecret = 'f3d87cde7a707cf85a918ff1a1f2afe5'
	}

	loginService(userData:any,viewCtrl:any){
		console.log('masuk service login',userData)
		let login = this.httpClient.post('http://qiscuscha-zo9gdtwkyfl.qiscus.com/api/v2.1/rest/login_or_register',{
			...userData
		},{
				headers: {
					"QISCUS_SDK_SECRET": this.sdkSecret,
    }
		})

		login.subscribe(resp=>{
			// console.log(resp.status)
			let obj: any = {
				...resp
			}
			if(obj.status == 200) {
				localStorage.setItem('token',JSON.stringify(obj.results))
				viewCtrl.dismiss()
			}
		})
	}

	create1on1Room(user_ids:string[],navCtrl){
		let create1on1 = this.httpClient.post('http://qiscuscha-zo9gdtwkyfl.qiscus.com/api/v2.1/rest/get_or_create_room_with_target',{
			user_ids: [...user_ids]
		},{
			headers: {
				"QISCUS_SDK_SECRET": this.sdkSecret
			}
		})
		create1on1.subscribe(resp => {
			let objres:any = {
				...resp
			}

			if(objres.status == 200) {
				navCtrl.pop()
			}
		})
	}

	createRoomService(roomData:any,navCtrl:any) {
		console.log('ini di service create room',roomData)
		let createRoom = this.httpClient.post('http://qiscuscha-zo9gdtwkyfl.qiscus.com/api/v2.1/rest/create_room',{
			...roomData
		},{
			headers: {
				"QISCUS_SDK_SECRET": this.sdkSecret,
			}
		})
		createRoom.subscribe(resp=>{
			let objres:any={
				...resp
			}
			if(objres.status == 200) {
				console.log('---', objres)
				navCtrl.pop()
			}
		})
	}

	get instance() {
		return QiscusSDK;
	}
	get isReady(): boolean {
		console.log('--->', this.instance.core.isInit, '---', this.instance.core.isLogin)
		return this.instance.core.isInit && this.instance.core.isLogin;
	}
	get currentRoom() {
		return this.instance.core.selected
	}
	get isReady$(): Observable<boolean> {
		console.log('ni jaln?')
		return interval(100).pipe(
			map(() => this.isReady),
			distinctUntilChanged(),
			filter(it => it === true)
		);
	}
	initialize() {
		console.log('ini init')
		this.instance.core.init({
			AppId: 'qiscuscha-zo9gdtwkyfl',
			mode: "wide",
			options: {}
		});
	}

	private mapRoomData(room: any): Room {
		return {
			id: room.id,
			name: room.name,
			avatarURL: room.avatar,
			countNotif: room.count_notif,
			options: room.options,
			type: room.room_type
		}
	}
	setUser(userId: string, secretKey: string, username?: string) {
		if (username == null) username = userId;
		console.log('ini set user ', userId)
		this.instance.core.setUser(userId, secretKey, username);
	}

	render() {
		this.instance.render();
	}

	getRoomList(): Observable<Room[]> {
		console.log('ini jalan ga?')
		return fromPromise<any>(this.instance.core.loadRoomList()).pipe(
			map(rooms =>
				rooms.map(room => ({
					id: room.id,
					name: room.name,
					avatarURL: room.avatar,
					countNotif: room.count_notif,
					options: room.options,
					type: room.room_type
				}))
			)
		);
	}

	openChatRoom(roomId: number): Observable<any> {
		return fromPromise(this.instance.core.getRoomById(roomId)).pipe(
		  tap(data => console.log("data", data))
		);
	  }

	  get currentRoom$(): Observable<Room> {
		return interval(100).pipe(
		  map(() => this.currentRoom),
		  filter(it => it != null),
		  distinctUntilChanged(),
		  map(room => this.mapRoomData(room))
		)
	  }
}