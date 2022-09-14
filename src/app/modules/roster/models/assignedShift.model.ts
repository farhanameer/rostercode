export class AssignedShiftModel{
    assigned_shifts: Array<AssignedModel> = [];
}

export class AssignedModel{
    shift_id:Number;
    name:string;
    time_in:Date;
    time_out:Date;
}