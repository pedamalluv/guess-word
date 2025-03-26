import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @Input() min: number = 1;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() value: number = 50; // Default value
  @Output() valueChange = new EventEmitter<number>();
  @Input() title = '';
  @Input() helpText = '';

  onSliderChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.valueChange.emit(Number(newValue));
  }
}
