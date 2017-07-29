import { NavController,Tabs } from 'ionic-angular';
import { Component,ViewChild } from '@angular/core';
import {Storage} from '@ionic/storage';
import {getPageFor} from "../../directives/helpers";


@Component({
    selector:  'tabs-page',
    templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild('myTabs') tabRef: Tabs;
    tab1Root: any= getPageFor("projectPage");
    tab2Root: any= getPageFor("personalPage");

    constructor(
      public navCtrl: NavController,
      public storage:Storage,
    ) { }

    public logOut(){
      this.storage.remove('workInfoModel');
      this.storage.remove('loginModel').then(res=>{
        this.navCtrl.setRoot(getPageFor('loginPage'));
      });
    }
}
