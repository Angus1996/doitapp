import { HisTaskPage } from './../histask/histask';
import { Param } from './../../model/base/httpInterceptor';
import { CommonInfoUtils } from './../../commonUtils/commonInfoUtils';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { LoginModel } from './../../model/login';
import { InterceptorProvider } from "../../commonUtils/interceptorProvider";

@Component({
    templateUrl:'projectuser.html',
})

export class ProjectUserPage{
    projectid;

    constructor(public nav: NavController,
                public interceptorProvider: InterceptorProvider,
                public commonInfoUtils: CommonInfoUtils,
                public storage:Storage,
                public params:NavParams){   
        this.projectid = params.get('projectid');

                }
items = [];
loginModel = new LoginModel();

    ngOnInit(){
        this.getProjectUser();
    }

    getProjectUser(){
        let projectid = this.projectid;
        let url = this.commonInfoUtils.getProjectUsers;
        let params = Array<Param>();
        this.storage.get('loginModel').then(loginModel=>{
            this.loginModel = JSON.parse(loginModel);
            let signCode = this.loginModel.user.signCode;
            params.push({key:"signCode",value:signCode});
            params.push({key:"projectId",value:projectid});
            this.interceptorProvider.post(url,params).then(res=>{
                console.log("调用getProjectUsers API的响应体：");console.log(res);
                this.items = res.arguments.employees;
                console.log("得到的项目参与人员：");console.log(this.items);
            });
        });
    }

    openHisTask(item,projectid){
        this.nav.push(HisTaskPage,{item:item,projectid:this.projectid});
    }
}