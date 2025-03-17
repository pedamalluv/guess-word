import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.scss']
})
export class VirtualKeyboardComponent {

  @Input() disabledKeys: string[] = [];
  // QWERTY keyboard layout
  keys: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Backspace', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter']
  ];

  // disabledKeys = ['Q', 'E', 'Backspace']; // List of disabled keys

  specialKeys = ['Backspace', 'Enter'];

  // Event emitter to send key press events
  @Output() keyPress = new EventEmitter<string>();

  onKeyPress(key: string): void {
    this.keyPress.emit(key);
  }
}
