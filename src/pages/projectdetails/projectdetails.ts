import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { WorkInfoModel, Project } from './../../model/workInfo';
@Component({
    templateUrl: 'projectdetails.html',
})

export class ProjectDetailsPage{
    projectid;

    constructor(public nav:NavController,
                public storage:Storage,
                public params:NavParams){ 
        this.projectid = params.get('projectid');
        console.log("项目id");console.log(this.projectid);
    }

project:Array<Project>;
workInfoModel = new WorkInfoModel();

    ngOnInit(){
        this.getProjectDetails();
    }

    getProjectDetails(){
        let projectid = this.projectid;
        this.storage.get('workInfoModel').then(workInfoModel=>{
            this.workInfoModel = JSON.parse(workInfoModel);
            let items = this.workInfoModel.projects.filter(function(item){return item.id===projectid});
            this.project=items;
            console.log("项目详情：");console.log(this.project);
        });
    }
    getitemStatus(item){
        if(item.status=="intention"){return "合作意向";}
        if(item.status=="approval"){return "项目立项";}
        if(item.status=="demand"){return "需求阶段";}
        if(item.status=="dev"){return "开发阶段";}
        if(item.status=="testRun"){return "试运行";}
        if(item.status=="run"){return "平稳运行";}
        if(item.status=="finish"){return "项目完结";}
    }
}