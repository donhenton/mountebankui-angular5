import { Component, OnInit, Input, AfterViewInit, forwardRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-imposter-selector',
  templateUrl: './imposter-selector.component.html',
  styleUrls: ['./imposter-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ImposterSelectorComponent),
    }
  ]
})
export class ImposterSelectorComponent implements OnInit, ControlValueAccessor {

  @Input() public collectionItems: any[];
  @Input() public formControlName: any;
  @Input() public parentForm: FormGroup;
  @Input() _value = ''; // this will be the selector index as a string;
  @Output() public change   = new EventEmitter();
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor() { }

  ngOnInit() {
    // console.log(this.parentForm);
    // this.parentForm.addControl(this.formControlName, new FormControl());

  }

  handleChange(ev) {
    // console.log(`1 ${ev.target.value}`);
    this.change.emit(ev);
  }

  trackByFn(index, item) {
    return item.id;
  }
  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  writeValue(value: any) {
    // tells Angular how to write value from model into view
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any) {
    // registers a handler function that is called when the view changes
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    // registers a handler to be called when the component receives a touch event, useful for knowing if the component has been focused
    this.onTouched = fn;
  }

}

// https://coryrylan.com/blog/angular-custom-form-controls-with-reactive-forms-and-ngmodel
// https://stackoverflow.com/questions/45659742/angular4-no-value-accessor-for-form-control
