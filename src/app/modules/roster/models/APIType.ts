export class APIType<T>{
    status: Boolean;
    statusCode : Number;
    message : String;
    payload? : T[] | String;
    error? : String;
}
