import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent {
  @Output() selectionChange = new EventEmitter<{ maxLength: number, maxTries: number }>();
  isModalVisible: boolean = false;
  wordSize: number = 4; // Default
  difficulty: string = 'moderate'; // Default


  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  submitSelection() {
    console.log('Selected Word Size:', this.wordSize);
    console.log('Selected Difficulty:', this.difficulty);

    let dLevel = 0;
    switch (this.difficulty) {
      case 'easy' : dLevel = (this.wordSize * 2) + 2; break;
      case 'moderate' : dLevel = (this.wordSize * 2); break;
      case 'difficult' : dLevel = (this.wordSize * 2) - 2; break;
    }

    this.isModalVisible = false;

    return  this.selectionChange.emit({
      maxLength: this.wordSize * 1,
      maxTries: dLevel
    });


    // Emit values to parent if needed
  }
}
