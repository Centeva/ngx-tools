import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { WherePipe } from 'angular-pipes/src/array/where.pipe';
import * as _ from 'lodash';

export interface NameValuePair {
  Name: string;
  Value: any;
}

@Component({
  selector: 'search-options',
  templateUrl: 'searchOptions.component.html',
  styleUrls: ['searchOptions.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchOptionsComponent),
      multi: true,
    },
  ],
  host: {
    '(document:click)': 'clickOutOfComponent($event)',
  },
})
export class SearchOptionsComponent<T> implements ControlValueAccessor, OnInit, OnChanges {
  @Input() _optionsValue: T = null;
  @Input() options: T[] = [];
  @Input() required: boolean = false;
  @Output() onChange: EventEmitter<T> = new EventEmitter<T>();
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() disabled: boolean = false;
  @Input() displayField: string = 'Name';
  @Input() valueField: string = 'Value';
  @Input() readOnly: boolean = false;
  @Input() placeholder: string = '';
  @Input() inputId: string = 'search-options';

  search: string = undefined;
  public toggled = false;

  propagateChange = (_: any) => {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.writeValue(this.optionsValue);
  }

  ngOnChanges() {
    this.writeValue(this.optionsValue);
  }

  get optionsValue() {
    return this._optionsValue;
  }

  set optionsValue(val) {
    this._optionsValue = val;
    this.propagateChange(this._optionsValue);
    let option = undefined;
    if (typeof val === 'object') {
      option = this.options ? this.options.find((x) => _.get(x, this.valueField) === this._optionsValue) : undefined;
    } else {
      option = this.options ? this.options.find(x => _.get(x, this.valueField) + '' === val + '') : undefined;
    }
    if (option && _.get(option, this.displayField)) {
      this.search = _.get(option, this.displayField) + '';
    }
  }

  set(val) {
    this.optionsValue = val;
    this.onChange.emit(val);
    this.toggled = false;
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.optionsValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  searchMatch(item: any) {
    return _.toLower(_.get(item, this.displayField) + '').includes(_.toLower(this.search));
  }

  clickOutOfComponent(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.toggled = false;
      let option = this.options ? this.options.find((x) => _.get(x, this.valueField) === this._optionsValue) : undefined;
      if (option && _.get(option, this.displayField)) {
        this.search = _.get(option, this.displayField) + '';
      } else {
        this.search = undefined;
      }
    }
  }

  public openDropdown() {
    this.toggled = true;
    this.search = undefined;
  }

  public print() {
    console.log('Do this!');
  }

  public isInvalid() {
    return this.required && !this._optionsValue;
  }

  public eventHandler(keyCode) {
    if (keyCode === 13) {
      this.openDropdown();
    }
    this.searchChange.emit(this.search);
  }
}
