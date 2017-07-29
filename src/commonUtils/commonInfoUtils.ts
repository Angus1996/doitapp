import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Config} from "ionic-angular";

@Injectable()
export class CommonInfoUtils {


    constructor(public storage: Storage, public config: Config,) {
    }

    isNull(p:any):boolean{
      return (p == "" || p==" " || p==null || typeof (p) == 'undefined' )
    }

    ip:IP = new IP();

    public login:string = this.ip.getIpString()+'/home/login';
    public addTodoTask:string = this.ip.getIpString()+'/todoTask/addTodoTask';
    public addTodoTaskMore:string = this.ip.getIpString()+'/todoTask/addTodoTaskMore';
    public getProjectUsers:string = this.ip.getIpString()+'/todoTask/getProjectUsers';
    public getTaskInfo:string = this.ip.getIpString()+'/todoTask/getTaskInfo';
    public getTodoTasks:string = this.ip.getIpString()+'/todoTask/getTodoTasks';
    public getWorkInfo:string = this.ip.getIpString()+'/todoTask/getWorkInfo';
    public saveTaskInfo:string = this.ip.getIpString()+'/todoTask/saveTaskInfo';
    public modifyTask: string = this.ip.getIpString()+'/todoTask/modifyTask';
    // public updatePwd:string = "http://127.0.0.1:9999/tennetcn/api/v1/employee/updatePwd";
    public updatePwd:string = "https://www.hdoit.com/tennetcn/api/v1/employee/updatePwd";
}

export class IP {
    private ip: string='www.hdoit.com';
    // private port: string='9999';
    private projectName = 'tennetcn';
    private apiVersion = '/app/v1';

    private localIp: string='127.0.0.1';
    private localPort: string='9999';


    // public getIpString():string{
    //   return "http://"+this.localIp+":"+this.localPort+"/"+this.projectName+this.apiVersion;
    // }

    public getIpString():string{
      return "https://"+this.ip+":"+"/"+this.projectName+this.apiVersion;
    }
}


