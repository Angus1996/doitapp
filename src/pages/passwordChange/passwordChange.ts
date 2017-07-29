import {NavController, ToastController} from "ionic-angular";
import {Component} from "@angular/core";
import {Storage} from '@ionic/storage';
import {CommonInfoUtils} from "../../commonUtils/commonInfoUtils";
import {LoginModel,Password} from "../../model/login";
import {ResponseModel, ResponseStatus, Param} from "../../model/base/httpInterceptor";
import {InterceptorProvider} from "../../commonUtils/interceptorProvider";
import {TabsPage} from "../tabs/tabs";
import {md5} from "../../commonUtils/md5";

@Component({
    selector: 'page-passwordChange',
    templateUrl: 'passwordChange.html'
})
export class PasswordChangePage {

    constructor(public navCtrl: NavController,
                public storage: Storage,
                public toastCtrl: ToastController,
                public commonInfoUtils: CommonInfoUtils,
                public interceptorProvider:InterceptorProvider,
                public tabsPage:TabsPage) {};

    password = new Password();
    loginModel:LoginModel;

    ngOnInit() {
        //storage里面调出登录成功后存储的用户
        this.storage.get("loginModel").then(loginModel => {
            if (loginModel != null) {
                this.loginModel = JSON.parse(loginModel);
            }
        });
    }

    savePassword() {
        if (this.commonInfoUtils.isNull(this.password.oldPassword)) {
            let toast = this.toastCtrl.create({
                message: '请输入原密码！',
                duration: 2000,
                position: 'bottom'
            });
            toast.present(toast);
        } else if (this.commonInfoUtils.isNull(this.password.newPassword) ) {
            let toast = this.toastCtrl.create({
                message: '请输入新密码！',
                duration: 2000,
                position: 'bottom'
            });
            toast.present(toast);
        } else if (this.commonInfoUtils.isNull(this.password.confirmPassword)) {
            let toast = this.toastCtrl.create({
                message: '请输入确认密码！',
                duration: 2000,
                position: 'bottom'
            });
            toast.present(toast);
        } else if (this.password.newPassword != this.password.confirmPassword) {
            let toast = this.toastCtrl.create({
                message: '两次输入密码不一致！',
                duration: 2000,
                position: 'bottom'
            });
            toast.present(toast);
        }else if (md5(this.password.oldPassword) != this.loginModel.user.password) {
          let toast = this.toastCtrl.create({
            message: '原密码错误！',
            duration: 2000,
            position: 'bottom'
          });
          toast.present(toast);
        } else {
          let url = this.commonInfoUtils.updatePwd;
          let params = Array<Param>();
          params.push({key:"oldPassword",value:this.loginModel.user.password});
          params.push({key:"newPassword",value:this.password.newPassword});
          params.push({key:"confirmPassword",value:this.password.confirmPassword});
          params.push({key:"signCode",value:this.loginModel.user.signCode});
          console.log("修改密码提交参数：");console.log(params);
          this.interceptorProvider.post(url,params).then(res=>{
              console.log("修改密码响应体：");console.log(res);
            this.checkResponseStatus(res);
            if(parseInt(res.status) == ResponseStatus.success){
              let toast = this.toastCtrl.create({
                message: '修改成功，请重新登陆..',
                duration: 4000,
                position: 'bottom'
              });
              toast.present(toast);
              this.tabsPage.logOut();
            }else{}
          });
        }
    }

    back() {
        this.navCtrl.pop();
    }

  public checkResponseStatus(res:ResponseModel){
    if(parseInt(res.status) == ResponseStatus.authorizeError){
      let toast = this.toastCtrl.create({
        message: '授权失败',
        duration: 2000,
        position: 'bottom'
      });
      toast.present(toast);
      this.tabsPage.logOut();
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
}