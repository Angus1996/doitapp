/**
 * Created by CaiMinghui on 17/6/9.
 */
import {Injectable} from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import { ResponseStatus, ResponseModel, Param} from "../model/base/httpInterceptor";

@Injectable()
export class  InterceptorProvider {
  constructor(public http: Http) {

  }

  public get(url:string,params:Array<Param>){

    let _param:string = "?_r="+Math.random();

    for (let param of params){
      _param+="&"+param.key+"="+param.value;
    }

    url =url+_param;
    return new Promise<ResponseModel>(resolve => {
      let obj:ResponseModel = new ResponseModel();
      this.http.get(url).subscribe(res => {
        obj = res.json();});

      //   if (obj != null) {
      //     try {
      //       resolve( obj);
      //     }
      //     catch (e){
      //       obj.status = ResponseStatus.serverError.toString();
      //       obj.message = "本地数据解析错误";
      //       obj.arguments=null;
      //       resolve(obj);
      //     }
      //   }else{
      //     obj.status = ResponseStatus.serverError.toString();
      //     obj.message = "检查跨域访问问题";
      //     obj.arguments=null;
      //     resolve(obj);
      //   }
      // },reject=>{
      //   obj.status = ResponseStatus.netError.toString();
      //   obj.message = "网络错误";
      //   obj.arguments=null;
      //   resolve(obj);

      // });
    });
  }

  public post(url:string,params:Array<Param>){
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });

    let body:string = "_r="+Math.random();

    for (let param of params){
      body+="&"+param.key+"="+param.value;
    }

    return new Promise <ResponseModel>(resolve => {
      let obj:ResponseModel = new ResponseModel();
      this.http.post(url ,body, options).subscribe(res => {
        obj = res.json();
        if (obj != null) {
          try {
            resolve( obj);
          }
          catch (e){
            obj.status = ResponseStatus.serverError.toString();
            obj.message = "本地数据解析错误";
            obj.arguments=null;
            resolve(obj);
          }
        }else{
          obj.status = ResponseStatus.serverError.toString();
          obj.message = "检查跨域访问问题";
          obj.arguments=null;
          resolve(obj);
        }
      },reject=>{

        obj.status = ResponseStatus.netError.toString();
        obj.message = "网络错误";
        obj.arguments=null;
        resolve(obj);

      });
    });

  }

}