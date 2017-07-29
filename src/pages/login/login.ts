import { WorkInfoModel } from './../../model/workInfo';
import { md5 } from '../../commonUtils/md5';
import { CommonInfoUtils } from '../../commonUtils/commonInfoUtils';
import { Param, ResponseStatus,ResponseModel } from '../../model/base/httpInterceptor';
import { User,LoginModel } from '../../model/login';
import { Storage } from '@ionic/storage';
import { NavController,LoadingController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { InterceptorProvider } from "../../commonUtils/interceptorProvider";
import { getPageFor } from '../../directives/helpers';
import * as moment from "moment";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
    constructor(public navCtrl: NavController,
                 public loadingCtrl: LoadingController,
                 public toastCtrl: ToastController,
                 public storage: Storage,
                 public commonInfoUtils: CommonInfoUtils,
                //  public projectpage:ProjectPage,
                 public interceptorProvider: InterceptorProvider
                ) { };

user = new User();  //存储登录人的信息
loading: any; //loading控制，登录成功后loading将消失
loginModel:LoginModel;  //登录模型
workInfoModel:WorkInfoModel;
 
    ngOnInit(){
      this.autoLogin();
    }

    login() {
        if ( !this.commonInfoUtils.isNull(this.user.userName)) {
            if (!this.commonInfoUtils.isNull(this.user.password)) {
                this.loading = this.loadingCtrl.create({
                    content: "登陆中...",
                    duration: 8000,
                    dismissOnPageChange: true
                });
                this.loading.present().then(res=>{
                  this.loginUser();
                });
            } else {
                let toast = this.toastCtrl.create({
                    message: '请输入密码！',
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present(toast);
            }
        } else {
            let toast = this.toastCtrl.create({
                message: '请输入用户名！',
                duration: 2000,
                position: 'bottom'
            });
            toast.present(toast);
        }
    }

    loginUser() {
        let url = this.commonInfoUtils.login;
        let params = Array<Param>();
        params.push({key:"userName",value:this.user.userName});
        params.push({key:"password",value:md5(this.user.password)});
        console.log("登录账户：");console.log(this.user.userName);
        console.log("登录密码：");console.log(this.user.password);      
        this.interceptorProvider.post(url,params).then(res=>{
            console.log("登录请求API响应体");console.log(res);
            this.loading.dismiss().then(r=>{
            this.checkResponseStatus(res);
            if(parseInt(res.status) == ResponseStatus.success){
                this.loginModel = new LoginModel();
                this.loginModel.user = res.arguments;
                this.loginModel.user.password = md5(this.user.password);
                this.storage.set('loginModel', JSON.stringify(this.loginModel)).then(r=>{
                this.navCtrl.setRoot(getPageFor("tabsPage"));
                });
                let toast = this.toastCtrl.create({
                    message: '登陆成功！',
                    duration: 3000,
                    position: 'bottom'
                });
                toast.present(toast);
            }else{ }
            });
        });
    }


    public checkResponseStatus(res:ResponseModel){
      if(parseInt(res.status) == ResponseStatus.authorizeError){
        let toast = this.toastCtrl.create({
          message: '授权失败',
          duration: 2000,
          position: 'bottom'
        });
        toast.present(toast);
      }else if(parseInt(res.status) == ResponseStatus.netError){
        let toast = this.toastCtrl.create({
          message: '啊哦，网络出现问题，请稍后再试。',
          duration: 2000,
          position: 'bottom'
        });
        toast.present(toast);
      }else if(parseInt(res.status) != ResponseStatus.success){
        let toast = this.toastCtrl.create({
          message: res.message,
          duration: 2000,
          position: 'bottom'
        });
        toast.present(toast);
      }
    }


  autoLogin(){
    this.storage.ready().then(()=>{
      this.storage.get("loginModel").then(res=>{
        if(res!=null){
          let loginModel = JSON.parse(res);
          let expireDate = moment(loginModel.user.expire);
          if(expireDate.isAfter(moment())){
            this.navCtrl.setRoot(getPageFor("tabsPage"));
          }else{
            let toast = this.toastCtrl.create({
              message: '太长时间没登录，系统不认识你啦。',
              duration: 2000,
              position: 'bottom'
            });
            toast.present(toast);
          }
        }
      });
    });
  }

}