import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Param } from './../../model/base/httpInterceptor';
import { LoginModel } from './../../model/login';
import { CommonInfoUtils } from './../../commonUtils/commonInfoUtils';
import { Storage } from '@ionic/storage';
import { WorkInfoModel } from './../../model/workInfo';
import { Component } from '@angular/core';
import { InterceptorProvider } from "../../commonUtils/interceptorProvider";

@Component({
    templateUrl:'addtask.html'
})

export class AddTaskPage{
    projectid;
    constructor(public commonInfoUtils: CommonInfoUtils,
                public interceptorProvider:InterceptorProvider,
                public storage:Storage,
                public toastCtr:ToastController,
                public navCtr:NavController,
                public params:NavParams){
        this.projectid = params.get('projectid');
    }

signCode:string;
title:string;
employees = [];
dutyEmployeeId:string;
date:string;
type:string;
timeTake:string;
items = [];
loginModel:LoginModel;
workInfoModel:WorkInfoModel;

    ngOnInit(){
        let projectid = this.projectid;
        let url = this.commonInfoUtils.getProjectUsers;
        let params = Array<Param>();
        this.storage.get('loginModel').then(loginModel=>{
            this.loginModel = JSON.parse(loginModel);
            let signCode = this.loginModel.user.signCode;
            params.push({key:"signCode",value:signCode});
            params.push({key:"projectId",value:projectid});
            this.interceptorProvider.post(url,params).then(res=>{
                console.log(res);
                this.employees = res.arguments.employees;
                console.log("项目可选责任人：");console.log(this.employees);

            })
        })
    }

    addTodoTaskMore(){
        if( (this.commonInfoUtils.isNull(this.title)) || (this.commonInfoUtils.isNull(this.dutyEmployeeId))
        || (this.commonInfoUtils.isNull(this.date)) || (this.commonInfoUtils.isNull(this.timeTake)) || (this.commonInfoUtils.isNull(this.type)) ){
            let toast = this.toastCtr.create({
                message: '请填写完整!',
                duration: 3000,
                position: 'bottom'
            });
            toast.present(toast);
        }else{
            let url = this.commonInfoUtils.addTodoTaskMore;
            this.storage.get('loginModel').then(loginModel=>{
                this.loginModel = JSON.parse(loginModel);
                this. signCode = this.loginModel.user.signCode;
                let params = new Array<Param>();
                params.push({key:"signCode",value:this.signCode});
                params.push({key:"title",value:this.title});
                params.push({key:"projectId",value:this.projectid});
                params.push({key:"dutyEmployeeId",value:this.dutyEmployeeId});
                params.push({key:"date",value:this.date});
                params.push({key:"type",value:this.type});
                params.push({key:"timeTake",value:this.timeTake});
                this.interceptorProvider.post(url,params).then(res=>{
                    console.log("完整添加任务提交参数数组：");console.log(params);
                    console.log("完整添加任务API响应体：");console.log(res);
                    let toast = this.toastCtr.create({
                        message: '完整添加成功!',
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present(toast);  
                    this.navCtr.pop(); 
                });

                let url2 = this.commonInfoUtils.getWorkInfo;
                let params2 = Array<Param>();
                params2.push({key:"signCode",value:this.signCode});
                this.interceptorProvider.post(url2,params2).then(res=>{
                console.log(res);
                this.workInfoModel = new WorkInfoModel();
                this.workInfoModel.projects=res.arguments.projects;
                this.workInfoModel.todoTasks=res.arguments.todoTasks;
                this.workInfoModel.employees=res.arguments.employees;
                this.storage.set('workInfoModel', JSON.stringify(this.workInfoModel));
                });    
            });
        console.log("完成添加成功!!!");
            }    
    }

    getCurrentDate(){
        let myDate = new Date();
        let month = myDate.getMonth()+1;
        let day = myDate.getDate();
        let currentDate;
        if((month>10)&&(day>10)){currentDate = myDate.getFullYear()+"-"+month+"-"+myDate.getDate();}
        if((month<10)&&(day>10)){currentDate = myDate.getFullYear()+"-"+"0"+month+"-"+myDate.getDate();} 
        if((month>10)&&(day<10)){currentDate = myDate.getFullYear()+"-"+month+"-"+"0"+myDate.getDate();} 
        if((month<10)&&(day<10)){currentDate = myDate.getFullYear()+"-"+"0"+month+"-"+"0"+myDate.getDate();}
        return currentDate;
    }

}