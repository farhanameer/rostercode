import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "limitRecords",
})
export class LimitRecordsPipe implements PipeTransform {
  transform(array: any[], lowerLimit,  upperLimit): Array<any> {
    console.log(array);
    if(array)
      return array.slice(lowerLimit, upperLimit)
    return null;
  }
}
