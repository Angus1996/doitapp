import { LoginModel,User } from './../../model/login';
import { WorkInfoModel, Project } from './../../model/workInfo';
import { Storage } from '@ionic/storage';
import { TaskPage } from './../task/task';
import { Component } from '@angular/core';
import { Param,ResponseStatus } from '../../model/base/httpInterceptor';
import { CommonInfoUtils } from '../../commonUtils/commonInfoUtils';
import { InterceptorProvider } from "../../commonUtils/interceptorProvider";
import { NavController,ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'project.html',
})
export class ProjectPage {
  constructor(public nav: NavController,
              public toastCtrl: ToastController,
              public commonInfoUtils: CommonInfoUtils,
              public interceptorProvider: InterceptorProvider,
              public storage: Storage) {}

workInfoModel:WorkInfoModel;
loginModel:LoginModel;
items = new Array<Project>();
signCode:string;
user = new User();

  ngOnInit(){
    this.getProject();
  }

  getProject(){
    this.storage.get('loginModel').then(loginModel=>{
      this.loginModel = JSON.parse(loginModel);
      let url = this.commonInfoUtils.login;
      let params = Array<Param>();
      params.push({key:"userName",value:this.loginModel.user.userName});
      params.push({key:"password",value:this.loginModel.user.password});
      this.interceptorProvider.post(url,params).then(res=>{
        console.log("登陆成功！");console.log(res);
        this.loginModel.user.signCode=res.arguments.signCode;
        this.storage.set('loginModel', JSON.stringify(this.loginModel))  
        let url = this.commonInfoUtils.getWorkInfo;
        let params = Array<Param>();
        params.push({key:"signCode",value:res.arguments.signCode});
        console.log("调用getWorkInfo API所提交的参数数组:");console.log(params);
        this.interceptorProvider.post(url,params).then(res=>{
          if(parseInt(res.status) == ResponseStatus.netError){
            let toast = this.toastCtrl.create({
              message: '啊哦，网络出现问题，请稍后再试。',
              duration: 2000,
              position: 'bottom'
            });
            toast.present(toast);}else{
            console.log("调用getWorkInfo API的响应体：");console.log(res);
            this.workInfoModel = new WorkInfoModel();
            this.items = res.arguments.projects;
            this.workInfoModel.projects=res.arguments.projects;
            this.workInfoModel.todoTasks=res.arguments.todoTasks;
            this.workInfoModel.employees=res.arguments.employees;
            this.storage.set('workInfoModel', JSON.stringify(this.workInfoModel));
            }
        });
      });
    });
  }

  openNavDetailsPage(item) {
    this.nav.push(TaskPage, { item: item });
  }

  doRefresh(refresher) {
    this.getProject();
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}