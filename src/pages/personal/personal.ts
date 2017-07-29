import { PasswordChangePage } from './../passwordChange/passwordChange';
import { LoginModel, User } from '../../model/login';
import { CommonInfoUtils } from '../../commonUtils/commonInfoUtils';
import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
// import { Platform, ActionSheetController } from 'ionic-angular';
import { InterceptorProvider } from "../../commonUtils/interceptorProvider";
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html'
})
export class PersonalPage {
  constructor(public navCtrl: NavController,
              public storage: Storage,
              public toastCtrl: ToastController,
              public commonInfoUtils: CommonInfoUtils,
              public tabsPage:TabsPage,
              public interceptorProvider: InterceptorProvider){
  }

user = new User();  //存储登录人的信息
loginModel:LoginModel;  //登录模型
userName: string;

  ngOnInit(){
    this.user = new User();
    this.storage.get('loginModel').then(loginModel=>{
      this.loginModel = JSON.parse(loginModel);
      if(this.loginModel!=null){
      this.userName= this.loginModel.user.userName;
      console.log("登录人姓名：");console.log(this.userName);
      }else{
          let toast = this.toastCtrl.create({
            message: "人员角色信息获取失败，请联系管理员",
            duration: 2000,
            position: 'bottom'
          });
          toast.present(toast);
      };
    });
  }

  logout(){
    this.tabsPage.logOut();
    let toast = this.toastCtrl.create({
      message: '退出成功!',
      duration: 4000,
      position: 'bottom'
      });
    toast.present(toast);
  }

  modifyPwd(){
    this.navCtrl.push(PasswordChangePage);
  }
}