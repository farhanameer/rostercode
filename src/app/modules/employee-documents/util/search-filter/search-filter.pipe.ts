import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchFilter",
})
export class SearchFilterPipe implements PipeTransform {
  transform(array: any[], searchWord: any, field: string): Array<any> {
    if (array.length == 0) return null;
    if (!searchWord) return array;

    typeof searchWord == "string"
      ? (searchWord = searchWord.toLowerCase())
      : searchWord;

    return array.filter((data) => {
      return typeof data[field] == "string"
        ? (data[field] as string).toLowerCase().includes(searchWord)
        : JSON.stringify(data[field]).includes(searchWord);
    });
  }
}
