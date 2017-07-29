import { ToastController } from 'ionic-angular';
import { TaskDetailsPage2 } from './../taskdetails2/taskdetails2';
import { AddTaskPage } from './../addtask/addtask';
import { ProjectUserPage } from './../projectuser/projectuser';
import { ProjectDetailsPage } from './../projectdetails/projectdetails';
import { TaskDetailsPage } from './../taskdetails/taskdetails';
import { LoginModel } from './../../model/login';
import { Storage } from '@ionic/storage';
import { Param } from './../../model/base/httpInterceptor';
import { CommonInfoUtils } from './../../commonUtils/commonInfoUtils';
import { WorkInfoModel, TodoTask } from './../../model/workInfo';
import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { InterceptorProvider } from "../../commonUtils/interceptorProvider";

@Component({
  templateUrl: 'task.html',
})

export class TaskPage {
    projectitem;
  constructor(params: NavParams,
              public toastCtrl: ToastController,
              public commonInfoUtils: CommonInfoUtils,
              public navCtr:NavController,
              public interceptorProvider: InterceptorProvider,
              public storage:Storage) {
    this.projectitem = params.data.item;
  }

items = [];
tasks = new Array<TodoTask>();
myDate = new Date();
id:string;
signCode:string;
btn1color:any;
btn2color:any;
btn3color:any;
BadgeColor:any;
task = new TodoTask();
loginModel = new LoginModel();
workInfoModel = new WorkInfoModel();
month:number=this.myDate.getMonth()+1;
today:string=(this.month<10)?this.myDate.getFullYear()+"-"+"0"+this.month+"-"+this.myDate.getDate()+" "+"00:00:00":
                              this.myDate.getFullYear()+"-"+this.month+"-"+this.myDate.getDate()+" "+"00:00:00";
tommorowdate = this.myDate.getDate()+1;
tommorow:string=(this.month<10)?this.myDate.getFullYear()+"-"+"0"+this.month+"-"+this.tommorowdate+" "+"00:00:00":
                        this.myDate.getFullYear()+"-"+this.month+"-"+this.tommorowdate+" "+"00:00:00";

  ngOnInit(){
    this.todayTask();
  }

  getTodoTask(){
     return new Promise <void>(resolve => {
        let url = this.commonInfoUtils.getTodoTasks;
        this.storage.get('loginModel').then(loginModel=>{
          this.loginModel = JSON.parse(loginModel);
          this.signCode=this.loginModel.user.signCode;
          this.id=this.loginModel.user.userId;   
          let params = Array<Param>();
          params.push({key:"signCode",value:this.signCode});
          params.push({key:"projectId",value:this.projectitem.id});
          params.push({key:"employeeId",value:this.id});
          console.log("数组：");console.log(params);
          this.interceptorProvider.post(url,params).then(res=>{
            console.log("调用getTodoTasks API的响应体：");console.log(res);
            this.items = res.arguments.todoTasks.reverse();
            resolve();
            console.log("获取任务列表成功！")
          });
        });
     });
  }

  update(item){
      item.taskStatus="finish";
      let that =this;
      let url = this.commonInfoUtils.modifyTask;
      let params = Array<Param>();
      this.storage.get('loginModel').then(loginModel=>{
          this.loginModel = JSON.parse(loginModel);
          this.signCode = this.loginModel.user.signCode;        
          params.push({key:"signCode",value:this.signCode});  
          params.push({key:"finish",value:"true"});
          params.push({key:"urgency",value:"false"});
          params.push({key:"taskId",value:item.id})      
          console.log("modifyTask API的提交参数：");console.log(params);
          this.interceptorProvider.post(url,params).then(res=>{
              console.log("修改任务的响应体：");console.log(res);
                  if(item.startDate==that.today){
                    console.log("kaishi:");console.log(item.startDate)
                    that.todayTask();
                  }
                  if(item.startDate==that.tommorow){
                    that.tommorowTask();
                  }
                  let weekdate = new Array<number>();
                  let week = new Array<string>();
                  let month = this.myDate.getMonth()+1;
                  let num = 6-this.myDate.getDay();
                  for(var j=0;j<7;j++){week[j]=" ";}
                  for(var i=0;i<num;i++){
                    weekdate[i]=this.myDate.getDate()+i+2;
                    if( (month<10) && (weekdate[i]<10) ){
                      week[i]=this.myDate.getFullYear()+"-"+"0"+month+"-"+"0"+weekdate[i]+" "+"00:00:00";
                      if(item.startDate==week[i]){that.thisweekTask();}
                    }
                    if( (month<10) && (weekdate[i]>10) ){
                      week[i]=this.myDate.getFullYear()+"-"+"0"+month+"-"+weekdate[i]+" "+"00:00:00";
                      if(item.startDate==week[i]){that.thisweekTask();}
                    } 
                    if( (month>10) && (weekdate[i]<10) ){
                      week[i]=this.myDate.getFullYear()+"-"+month+"-"+"0"+weekdate[i]+" "+"00:00:00";
                      if(item.startDate==week[i]){that.thisweekTask();}
                    } 
                    if( (month>10) && (weekdate[i]>10) ){
                      week[i]=this.myDate.getFullYear()+"-"+month+"-"+weekdate[i]+" "+"00:00:00";
                      if(item.startDate==week[i]){that.thisweekTask();}
                    } 
                  }
          });       
      });
  }

  getFinish(taskStatus){
      return taskStatus=="finish"?"完成" :"待办";
  }
  getBadgeColor(item){
    if(item.startDate===this.today){
        return item.taskStatus=="finish"?"light":"primary";
    }
    if(item.startDate<this.today){
      return item.taskStatus=="finish"?"light":"danger";
    }
  }

  openTaskDetailsPage(item){
    if(item.taskStatus!="finish"){
      this.navCtr.push(TaskDetailsPage,{item:item});
    }else{
      this.navCtr.push(TaskDetailsPage2,{item:item});
    }
  }

  openProjectDetailsPage(projectid){
     this.navCtr.push(ProjectDetailsPage,{projectid:this.projectitem.id});
  }

  openProjectUserPage(projectid){
    this.navCtr.push(ProjectUserPage,{projectid:this.projectitem.id});
  }

  openAddTodoTaskMorePage(projectid){
    this.navCtr.push(AddTaskPage,{projectid:this.projectitem.id});  
  }
  
  
  addTodoTask(){
    if(this.commonInfoUtils.isNull(this.task.name)){
      let toast = this.toastCtrl.create({
            message: '请输入任务名！',
            duration: 3000,
            position: 'bottom'
          });
      toast.present(toast);
    }else{
    let url = this.commonInfoUtils.addTodoTask;
    let params= new Array<Param>();
    params.push({key:"signCode",value:this.signCode});
    params.push({key:"projectId",value:this.projectitem.id});
    params.push({key:"dutyEmployeeId",value:this.id});
    params.push({key:"title",value:this.task.name});
    console.log(this.task.name);
    this.task.name="";
    console.log("快速添加任务的任务名：");console.log(this.task.name);    
    this.interceptorProvider.post(url,params).then(res=>{
      console.log("快速添加任务的响应体：");console.log(res);
      this.todayTask();
      // this.getTodoTask().then(()=>{this.gettodayTask();});
      let toast = this.toastCtrl.create({
            message: '快速添加成功！',
            duration: 2000,
            position: 'bottom'
          });
      toast.present(toast);
    });
    }
      // console.log("快速添加成功!!!")
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
      this.todayTask();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  todayTask(){
    let that = this;
    this.btn1color="light";
    this.btn2color="primary";
    this.btn3color="primary";
    this.getTodoTask().then(()=>{
      console.log("今日日期：");console.log(this.today);
      this.tasks = this.items.filter(function(item){return (item.startDate===that.today) ||( (item.startDate<that.today)&&(item.taskStatus!="finish"))});
      console.log("今日任务：");console.log(this.tasks);
    })
  }

  tommorowTask(){
    this.btn1color="primary";
    this.btn2color="light";
    this.btn3color="primary";
    let that = this;
    this.getTodoTask().then(()=>{
      console.log("明天日期：");console.log(this.tommorow);    
      this.tasks = this.items.filter(function(item){return item.startDate===that.tommorow});
    })
  }

  thisweekTask(){
    this.btn1color="primary";
    this.btn2color="primary";
    this.btn3color="light";
    this.getTodoTask().then(()=>{
      let weekdate = new Array<number>();
      let week = new Array<string>();
      let month = this.myDate.getMonth()+1;
      let num = 6-this.myDate.getDay();
      for(var j=0;j<7;j++){week[j]=" ";}
      for(var i=0;i<num;i++){
        weekdate[i]=this.myDate.getDate()+i+2;
        if( (month<10) && (weekdate[i]<10) ){
          week[i]=this.myDate.getFullYear()+"-"+"0"+month+"-"+"0"+weekdate[i]+" "+"00:00:00";}
        if( (month<10) && (weekdate[i]>10) ){
          week[i]=this.myDate.getFullYear()+"-"+"0"+month+"-"+weekdate[i]+" "+"00:00:00";}
        if( (month>10) && (weekdate[i]<10) ){
          week[i]=this.myDate.getFullYear()+"-"+month+"-"+"0"+weekdate[i]+" "+"00:00:00";} 
        if( (month>10) && (weekdate[i]>10) ){
          week[i]=this.myDate.getFullYear()+"-"+month+"-"+weekdate[i]+" "+"00:00:00";} 
      }
      console.log("本周剩余日期（除去今天和明天）：");console.log(week);
      this.tasks = this.items.filter(function(item){return (item.startDate===week[0]) ||
        (item.startDate===week[1]) || (item.startDate===week[2]) ||(item.startDate===week[3]) ||
        (item.startDate===week[4]) ||(item.startDate===week[5]) ||(item.startDate===week[6])})
    });
  }

}