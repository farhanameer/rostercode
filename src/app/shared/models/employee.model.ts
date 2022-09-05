export class Employee {
  id: string;
  name: string;
  office: string;
  role: string;
  backgroundColor: string;
  upperManagerId?: string;
}

export interface Employee {
  empid: number;
  designation: string;
  department: string;
  band: string;
  joining_date: string;
  emp_status: string;
}

export class MatMenuListItem {
  menuLinkText: string;
  path: string;
  isDisabled: boolean;
}

export interface LegendBand {
  color: string;
  name: string;
}

export interface BubbleChart {
  data: Array<any>;
  color: string;
}
