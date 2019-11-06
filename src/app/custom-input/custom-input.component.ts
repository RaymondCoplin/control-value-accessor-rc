import { Input, Component, Renderer2, forwardRef, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'custom-input',
  template: `
    <input #ctrl type="text" [placeholder]="placeholder" (input)="onInput($event)" (blur)="onBlur($event)" />
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInputComponent),
    multi: true
  }]
})
export class CustomInputComponent implements ControlValueAccessor {

  constructor(private renderer: Renderer2) {}

  @ViewChild('ctrl', { static: true }) element;
  @Input() placeholder: string;

  onChange: (_: any) => {}
  onTouched: () => {}

  writeValue(value: any): void {
    this.renderer.setProperty(this.element.nativeElement, 'value', value);
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  onInput(evt) {
    this.onChange(evt.currentTarget.value);
  }

  onBlur(evt) {
    this.onTouched();
  }

}