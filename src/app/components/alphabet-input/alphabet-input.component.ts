import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-alphabet-input',
  templateUrl: './alphabet-input.component.html',
  styleUrls: ['./alphabet-input.component.scss'],
})
export class AlphabetInputComponent {
  @ViewChildren('inputBox') inputBoxes!: QueryList<ElementRef>;

  letters: string[] = ['', '', '', ''];

  // Method to handle keypress and move focus
  // handleInput(index: number, event: any) {
  //   const value = event.target.value.toUpperCase();
  //   if (/^[A-Z]$/.test(value)) { // Only allow single alphabet
  //     this.letters[index] = value; // Update the array value
  //     event.target.value = value; // Prevents duplication issue

  //     // Move to the next input if available
  //     if (index < this.letters.length - 1) {
  //       //setTimeout(() => this.inputBoxes.toArray()[index + 1].nativeElement.focus(), 1000);
  //     }
  //   } else {
  //     event.target.value = ''; // Clear invalid input
  //   }
  // }

  // Handle backspace to move focus to previous box
  handleBackspace(index: number, event: any) {
    // if (event.key === 'Backspace' && index > 0 && !this.letters[index]) {
    //   //this.inputBoxes.toArray()[index - 1].nativeElement.focus();
    // }
  }

  handleInput(index: number, event: any) {

  }
}
