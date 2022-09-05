import { Component, OnInit } from "@angular/core";
import { ResizeEvent } from "angular-resizable-element";
import moment from "moment";
import {
  MedalsAlias,
  Medals,
} from "src/app/shared/constants/constants";

@Component({
  selector: "app-base-component",
  templateUrl: "./base-component.component.html",
  styleUrls: ["./base-component.component.scss"],
})
export class BaseComponentComponent implements OnInit {
  tableEvents: any = [];
  designation: any[] = [];
  band: any[] = [];
  salary: any[] = [];
  years: any = [];
  employeData: any = {};
  assignValue: number = 1;
  brandOrderValues: any = {
  };
  reverseBrandValues: any = {};
  floatValues: any = [
    0.1,
    0.2,
    0.3,
    0.4,
    0.5,
    0.6,
    0.7,
    0.8,
    0.9]

  startingYear: any = new Date().getFullYear() - 8;
  endYear: any = new Date().getFullYear() - 1;

  constructor() { }

  ngOnInit(): void { }
// graph customization
  graphDataCustomization(
    band_designation_data: any = {},
    salary: any = {},
    designations: any[],
    bandsValues: any = [],
    type: any = 'line'
  ) {
    let that = this;
    for (var l = bandsValues[0]; l <= bandsValues[bandsValues.length - 1]; l++) {
      that.brandOrderValues[l] = bandsValues[bandsValues.length - 1] - l;
      that.floatValues.forEach(function (item, index) {
        var value = l + item;
        that.brandOrderValues[value] = bandsValues[bandsValues.length - 1] - l - item;
      });
    }
    that.reverseBrandValues = that.objectFlip(that.brandOrderValues);

    that.startingYear = null;
    if (band_designation_data && band_designation_data.band_events) {
      const employee_band_year = Object.keys(band_designation_data.band_events);
      this.startingYear = employee_band_year.length > 0 ? parseInt(employee_band_year[0]) : null;
      this.endYear = employee_band_year.length > 0 ? parseInt(employee_band_year[employee_band_year.length - 1]) : null;
      const employee_band_data: any = Object.values(
        band_designation_data.band_events
      );
      employee_band_data.map((result: any, index: any) => {
        var data: any[] = result[0] && result[0].employee__histories_group;
        if (data && data.length > 0) {
          data.map((band: any, index: any) => {
            that.band.push(type == 'column' ? that.brandOrderValues[parseFloat(band.new_label)] : parseFloat(band.new_label));
          });
        } else {
          that.band.push(null);
        }
      });
    }

    if (band_designation_data && band_designation_data.designation_events) {
      const employee_designation_year = Object.keys(
        band_designation_data.designation_events
      );
      if (!this.startingYear) {
        this.startingYear = employee_designation_year.length > 0 ? parseInt(employee_designation_year[0]) : null;
      }
      if (!this.endYear) {
        this.endYear = employee_designation_year.length > 0 ? parseInt(employee_designation_year[employee_designation_year.length - 1]) : null;
      }
      const employee_designation_data: any = Object.values(
        band_designation_data.designation_events
      );
      employee_designation_data.map((result: any, index: any) => {
        var data: any[] = result[0] && result[0].employee__histories_group;
        if (data && data.length > 0) {
          data.map((designation: any, index: any) => {
            var desination = designations.findIndex(
              (el) => el === designation.new_label
            );
            that.designation.push(desination);
          });
        } else {
          that.designation.push(null);
        }
      });
    }
    if (salary) {
      that.startingYear = null;
      that.endYear = null;
      const employee_salary_year = Object.keys(salary);
      if (!this.startingYear) {
        this.startingYear = employee_salary_year.length > 0 ? parseInt(employee_salary_year[0]) : null;
      }
      if (!this.endYear) {
        this.endYear = employee_salary_year.length > 0 ? parseInt(employee_salary_year[employee_salary_year.length - 1]) : null;
      }
      const employee_salary_data: any = Object.values(salary);
      employee_salary_data.map((result: any, index: any) => {
        var data: any = result[0] && result[0].employee_salary_history;
        if (data) {
          that.salary.push(parseInt(data.new_salary));
        } else {
          that.salary.push(null);
        }
      });
    }
    that.setXaxisYears();
  }

  // reset data table
  onResizeEnd(event: ResizeEvent, columnName, load = false): void {
    load == false
      ? this.tableEvents.push({ event: event, columnName: columnName })
      : null;
    if (event.edges.right) {
      const cssValue = event.rectangle.width + "px";
      const columnElts = document.getElementsByClassName(
        "cdk-column-" + columnName.columnDef
      );
      for (let i = 0; i < columnElts.length; i++) {
        const currentEl = columnElts[i] as HTMLDivElement;
        currentEl.style.flex = `0 0 ${cssValue}`;
      }
    }
  }

  //object values flip with key
  objectFlip(obj: any) {
    return Object.keys(obj).reduce((ret, key) => {
      ret[obj[key]] = key;
      return ret;
    }, {});
  }

  // data table column resize
  setColumnResize(timeLimit: any, tableEvents: any) {
    let that = this;
    setTimeout(function () {
      for (let i = 0; i < tableEvents.length; i++) {
        that.onResizeEnd(
          tableEvents[i].event,
          that.tableEvents[i].columnName,
          true
        );
      }
    }, timeLimit);
  }

  // set x axis years
  setXaxisYears() {
    let that = this;
    if(this.startingYear)
    {
      var startYear = new Date(this.startingYear, 0, 1);
      var endYear = new Date(this.endYear, 12, 31);
  
      var allYears = moment(endYear).diff(startYear, "years");
      for (var year = 0; year < allYears; year++) {
        that.years.push((startYear.getFullYear() + year).toString());
      }
    }
    if(that.years.length == 0) {
      that.years = []
    }
      
  }

  // set models
  medals(pref_type: string) {
    let that = this;
    switch (pref_type) {
      case Medals.Reward:
        return MedalsAlias.R;
      case Medals.Appreciation:
        return MedalsAlias.A;
      case Medals.Warning:
        return MedalsAlias.W;
      case Medals.Training:
        return MedalsAlias.T;
      default:
        return "";
    }
  }

  // model reverse value
  medalsReverse(key: string) {
    let that = this;
    switch (key) {
      case MedalsAlias.R:
        return "Reward";
      case MedalsAlias.A:
        return "Appreciation";
      case MedalsAlias.W:
        return "Warning";
      case Medals.Training:
        return "Training";
      default:
        return "";
    }
  }

  //convet 1st letter to capital
  capitalizeFirstLetter(data: any) {
    return data.charAt(0).toUpperCase() + data.slice(1);
  }

  // convert hex to rgb color
  hexToRgbNew(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = result ? parseInt(result[1], 16) : null;
    var g = result ? parseInt(result[2], 16) : null;
    var b = result ? parseInt(result[3], 16) : null;
    var rgb = `rgb(${r} ${g} ${b})`;
    return rgb;
  }

  // group by list with key
  groupBy(list: any, keyGetter: any) {
    const map = new Map();
    list.forEach((item: any) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}


export class EnumReflection {
  private static REGEXP: RegExp = /^[0-9]+$/g;

  private static isString<T>(name: string): boolean {
    if (name.match(this.REGEXP)) return false;

    return true;
  }

  public static getNames<T>(object: T): Array<string> {
    let result = new Array<string>();

    for (let name in object) {
      if (this.isString(name)) result.push(name);
    }

    return result;
  }

  public static getValues<T>(object: T): Array<string | number> {
    let result = new Array<string | number>();

    for (let name in object) {
      if (this.isString(name)) result.push(<any>object[name]);
    }

    return result;
  }


}
