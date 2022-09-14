export class  ShiftRosterViewModel{
    date:Date;
    total_employees:Number;
    shift: Array<ShiftModel> = [];
}

export class ShiftModel {
    id:Number;
    name:string;
    color:string;
    shift_employees:Number;
    employees:Array<EmpolyeeModel>=[];

}

export class EmpolyeeModel{
    emp_id:Number;
    emp_name:string;
    attendanceStatus:string;
    shift_id:Number;
    shift_name:string;
    color:string;
    
}