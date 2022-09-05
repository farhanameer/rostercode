import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";
import { dateFormat } from "./date-format.enum";

@Pipe({
  name: "formatDate",
})
export class FormatDatePipe implements PipeTransform {
  transform(date: string): String {
    return moment(date).format(dateFormat);
  }
}
