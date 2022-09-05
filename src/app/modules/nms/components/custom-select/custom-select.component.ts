import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "custom-select",
  templateUrl: "./custom-select.component.html",
  styleUrls: ["./custom-select.component.scss"],
})
export class CustomSelectComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: Array<any>;
  @Input() label: string;
  @Input() control: string;
  @Input() disabled: boolean;
  @Input() isLoaded: boolean;

  @Output() onResetDropDown = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @Output() onClick = new EventEmitter();

  locData = {};
  searchedFilter:string = '';

  constructor() {}

  ngOnInit(): void {
    // this.form.get(this.control).setValue(-1);
  }

  ngOnChanges(change: SimpleChange) {
    console.log(this.data);
  }

  get validation() {
    return this.form.controls;
  }

  getSelectData() {
    this.onResetDropDown.emit();
    this.selectionChange.emit();
  }

  onClickSelect() {
    this.onClick.emit();
  }
}
