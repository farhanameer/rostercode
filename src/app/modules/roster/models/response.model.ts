export class ResponseModel<T>{
    status:string;
    statusCode:Number;
    message:string;
    payload?:Array<T> | any;
    error?:string;

}