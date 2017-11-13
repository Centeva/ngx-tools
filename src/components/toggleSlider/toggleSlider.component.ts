import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';
import {
  trigger,
  state,
  animate,
  transition,
  style
} from '@angular/animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'toggle-slider',
  templateUrl: 'toggleSlider.component.html',
  styleUrls: ['toggleSlider.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSliderComponent),
      multi: true,
    },
  ],
  animations: [
    trigger('stateChanged', [
      state('true', style({ left: '0%' })),
      state('false', style({ left: '-49%' })),
      transition('true => false', animate('400ms ease-in')),
      transition('false => true', animate('400ms ease-out')),
    ]),
  ],
})
export class ToggleSliderComponent implements ControlValueAccessor {
  @Input() _toggleValue = false;
  @Input() disabled = false;
  @Input() trueText = 'Yes';
  @Input() falseText = 'No';
  @Output() onChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  public propagateChange = (_: boolean) => {};
  public animState = 'false';

  constructor() {}

  get toggleValue() {
    return this._toggleValue;
  }

  set toggleValue(val: boolean) {
    this._toggleValue = val;
    this.animState = this._toggleValue + '';
    this.propagateChange(this._toggleValue);
  }

  public toggle() {
    if (!this.disabled) {
      this.toggleValue = !this._toggleValue;
      this.onChanged.emit(this.toggleValue);
    }
  }

  public writeValue(value: boolean) {
    if (value !== undefined) {
      this.toggleValue = value;
    } else {
      this.toggleValue = false;
    }
  }

  public registerOnChange(fn) {
    this.propagateChange = fn;
  }

  public registerOnTouched() {}
}
