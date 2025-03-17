import { Component } from '@angular/core';
import { DictionaryService } from '../../services/dictionary.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent {
  word: string = '';
  definitions: any[] = [];
  errorMessage: string = '';

  constructor(private dictionaryService: DictionaryService) {}

  searchWord() {
    if (!this.word.trim()) return;

    this.dictionaryService.getWordDefinition(this.word).subscribe({
      next: (data) => {
        this.definitions = data;
        this.errorMessage = '';
      },
      error: () => {
        this.definitions = [];
        this.errorMessage = 'Word not found!';
      },
    });
  }
}
