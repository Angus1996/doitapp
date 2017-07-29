import { LoginModel } from './../../model/login';
import { Param } from './../../model/base/httpInterceptor';
import { TodoTask, WorkInfoModel } from './../../model/workInfo';
import { CommonInfoUtils } from './../../commonUtils/commonInfoUtils';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { InterceptorProvider } from "../../commonUtils/interceptorProvider";

@Component({
    templateUrl:'taskdetails.html',
})

export class TaskDetailsPage{
    taskid;
    projectid;
    constructor(params:NavParams,
                public toastCtr:ToastController,
                public nav: NavController,
                public interceptorProvider: InterceptorProvider,
                public commonInfoUtils: CommonInfoUtils,
                public storage:Storage){
        this.taskid = params.data.item.id; 
        this.projectid = params.data.item.projectId
                }

task=new TodoTask();
employees = [];
projects = [];
signCode:string;
workInfoModel = new WorkInfoModel();
loginModel = new LoginModel();

    ngOnInit(){
        this.getTaskInfo();
        let url = this.commonInfoUtils.getProjectUsers;
        let params = Array<Param>();
        this.storage.get('loginModel').then(loginModel=>{
            this.loginModel = JSON.parse(loginModel);
            let signCode = this.loginModel.user.signCode;
            params.push({key:"signCode",value:signCode});
            params.push({key:"projectId",value:this.projectid});
            this.interceptorProvider.post(url,params).then(res=>{
                this.employees = res.arguments.employees;
                console.log("项目责任人：");console.log(this.employees);

            });
        });

        this.storage.get('workInfoModel').then(workInfoModel=>{
            this.workInfoModel = JSON.parse(workInfoModel);
            this.projects = this.workInfoModel.projects;
        });
    }

    getprojectName(){
        for(let project in this.projects){
            if(this.projects[project].id===this.task.projectId){
                return this.projects[project].name;
            }
        }
    }

    getTaskInfo(){
        let url = this.commonInfoUtils.getTaskInfo;
        let params = Array<Param>();
        this.storage.get('loginModel').then(loginModel=>{
            this.loginModel = JSON.parse(loginModel);
            let signCode = this.loginModel.user.signCode;
            params.push({key:"signCode",value:signCode});
            params.push({key:"taskId",value:this.taskid});
            this.interceptorProvider.post(url,params).then(res=>{
                console.log("任务详情：");console.log(res);
                this.task=res.arguments.task;
            });
        });
        console.log("成功获取任务详情!!!");
    }

    modifyTodoTask(){
        let url = this.commonInfoUtils.saveTaskInfo;
        let params = Array<Param>();
        this.storage.get('loginModel').then(loginModel=>{
            this.loginModel = JSON.parse(loginModel);
            this.signCode = this.loginModel.user.signCode;      
            params.push({key:"signCode",value:this.signCode});        
            for(var property in this.task){
                params.push({key:property,value:this.task[property]});
            }
            console.log("修改任务的提交参数：");console.log(params);
            this.interceptorProvider.post(url,params).then(res=>{
                console.log("修改任务的响应体：");console.log(res);
                let toast = this.toastCtr.create({
                message: '修改成功!',
                duration: 3000,
                position: 'bottom'
              });
              toast.present(toast);  
              this.nav.pop(); 
                let url2 = this.commonInfoUtils.getWorkInfo;
                let params2 = Array<Param>();
                params2.push({key:"signCode",value:this.signCode});
                    this.interceptorProvider.post(url2,params2).then(res=>{
                    this.workInfoModel = new WorkInfoModel();
                    this.workInfoModel.projects=res.arguments.projects;
                    this.workInfoModel.todoTasks=res.arguments.todoTasks.reverse();
                    this.workInfoModel.employees=res.arguments.employees;
                    this.storage.set('workInfoModel', JSON.stringify(this.workInfoModel));
                });
            });        
        });
        console.log("修改任务成功!!!");
    }

    getfinishEmployeeName(){
        for(let employee in this.employees){
            if(this.employees[employee].employeeId===this.task.finishEmployeeId){
                return this.employees[employee].employeeName;
            }
        }
    }

    getCurrentDate(){
        let myDate = new Date();
        let month = myDate.getMonth()+1;
        let day = myDate.getDate();
        let currentDate
        if((month>10)&&(day>10)){currentDate = myDate.getFullYear()+"-"+month+"-"+myDate.getDate();}
        if((month<10)&&(day>10)){currentDate = myDate.getFullYear()+"-"+"0"+month+"-"+myDate.getDate();} 
        if((month>10)&&(day<10)){currentDate = myDate.getFullYear()+"-"+month+"-"+"0"+myDate.getDate();} 
        if((month<10)&&(day<10)){currentDate = myDate.getFullYear()+"-"+"0"+month+"-"+"0"+myDate.getDate();}
        return currentDate;
    }
}