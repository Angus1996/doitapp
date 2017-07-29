import { LoginModel } from './../../model/login';
import { Param } from './../../model/base/httpInterceptor';
import { TodoTask, WorkInfoModel, Employee } from './../../model/workInfo';
import { CommonInfoUtils } from './../../commonUtils/commonInfoUtils';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { InterceptorProvider } from "../../commonUtils/interceptorProvider";

@Component({
    templateUrl:'histaskdetails2.html',
})

export class HisTaskDetailsPage2{
    taskid;
    projectid;
    constructor(params:NavParams,
                public nav: NavController,
                public interceptorProvider: InterceptorProvider,
                public commonInfoUtils: CommonInfoUtils,
                public storage:Storage){
        this.taskid = params.data.item.id; 
        this.projectid = params.data.item.projectId
        }

task = new TodoTask();
employees = new Array<Employee>();
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

    getdutyEmployeeName(){
        for(let employee in this.employees){
            if(this.employees[employee].employeeId===this.task.dutyEmployeeId){
                return this.employees[employee].employeeName;
            }
        }
    }
    getfinishEmployeeName(){
        for(let employee in this.employees){
            if(this.employees[employee].employeeId===this.task.finishEmployeeId){
                return this.employees[employee].employeeName;
            }
        }
    }
    getTaskLevel(){
        if(this.task.level=="important"){return "重要";}
        if(this.task.level=="urgency"){return "紧急";}
    }
    getTaskStatus(){
        if(this.task.taskStatus=="finish"){return "已完成";}
        if(this.task.taskStatus=="plan"){return "计划中"};
    }
    getTaskType(){
        if(this.task.taskType=="demand"){return "需求";}
        if(this.task.taskType=="demandBug"){return "需求返工";}
        if(this.task.taskType=="bug"){return "bug";}
        if(this.task.taskType=="bug1"){return "返工bug";}
        if(this.task.taskType=="meeting"){return "会议";}
        if(this.task.taskType=="demandCom"){return "需求沟通";}      
    }
    getprojectName(){
        for(let project in this.projects){
            if(this.projects[project].id===this.task.projectId){
                return this.projects[project].name;
            }
        }
    }
}