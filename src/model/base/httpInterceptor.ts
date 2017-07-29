/**
 * Created by CaiMinghui on 2017/7/17.
 */
export class ResponseModel {
  status:string;
  message:string;
  arguments:any;
}


export enum ResponseStatus {
  success=200,
  Unauthorized=401,
  Forbidden=403,
  NotFound=404,
  netError=199,
  authorizeError=999,
  serverError=1000,
  dataError=1999,
}

export class Param {
  key:string;
  value:string|number|Date;
}
