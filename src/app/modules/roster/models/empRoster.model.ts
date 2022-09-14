export class EmpRosterModel{
    cplCount:Number;
    data: Array<DataModel> = [];
}

export class DataModel{
    attendanceStatus:string;
    id:Number;
    name:string;
    shift_color:string;
    start:Date;
    department:string;
    department_id:Number;
    shift_name:string;
    actual_shift_time_in:Date;
    actual_shift_time_out:Date;
    color:string;
    hdesc:string;
}