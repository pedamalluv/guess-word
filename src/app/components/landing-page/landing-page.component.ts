import { Component, OnInit } from '@angular/core';
import { generate, count } from "random-words";
import { DictionaryService } from '../../services/dictionary.service';


interface Config {
  maxLength: number,
  maxTries: number
}

interface Guess { 
  word?: string | undefined,
  matchingLettersCount?: number | 0,
  matchedCharacterCount?: number | 0
}
  
 
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit {
  guessWord: string = '';
  text: string = '';
  config: Config = {
    maxLength: 4,
    maxTries: 4
  }

  guesses : { word: string; matchingLettersCount: number; matchedCharacterCount: number; }[] = [];


  errorMessage: string = '';


  definitions: any[] = [];

  disabledKeys: string[] = [];

  constructor(private dictionaryService: DictionaryService) {}
  
  ngOnInit(): void {
    this.generateGuessWord();
  }

  generateGuessWord() {
    const word = generate({ 
                    minLength: this.config.maxLength,
                    maxLength: this.config.maxLength,
                    exactly: 1, 
                    formatter: (word) => word.toUpperCase(),
                 });
    if (this.hasRepeatedLetters(word[0])) {
      this.generateGuessWord();
    } else {
      this.guessWord = word[0];
      console.log(this.guessWord);
    }
  }

  handleKeyPress(key: string) {
    this.errorMessage = '';
    if (key === 'Backspace') {
      this.text = this.text.slice(0, -1);
    } else if (key === 'Enter') {
      if (this.text.length === this.config.maxLength) {
        const isWordValid = this.checkWord(this.text);
        if (!isWordValid.repeated) {
            this.searchWord(this.text);
        } else if (isWordValid.repeated) {
          this.errorMessage = 'Letters Repeated';
        } 
        // else if (isWordValid.sequential) {
        //   this.errorMessage = 'Sequential Letters not allowed';
        // }
      }
    } else if (this.text.length < this.config.maxLength){
      this.text += key.toUpperCase();
    }
  }

  hasRepeatedLetters(word: string): boolean {
    const letterSet = new Set();
    for (let char of word) {
      if (letterSet.has(char)) return true;
      letterSet.add(char);
    }
    return false;
  }

  hasSequentialLetters(word: string): boolean {
    for (let i = 0; i < word.length - 1; i++) {
      if (word.charCodeAt(i) + 1 === word.charCodeAt(i + 1)) return true;
    }
    return false;
  }

  checkWord(word: string) {
    return {
      'repeated': this.hasRepeatedLetters(word),
      'sequential': this.hasSequentialLetters(word)
    };
  }

  getMatchingDetails(word: string): { word: string, matchingLettersCount: number, matchedCharacterCount: number } {
    word = word.toUpperCase();

    const word1Set = new Set(word);
    const word2Set = new Set(this.guessWord);
    const matchingLetters = [...word1Set].filter(letter => word2Set.has(letter));
    console.log(matchingLetters);
    const matchingLettersCount = matchingLetters.length;
    const minLength = Math.min(word.length, this.guessWord.length);
    let matchedCharacterCount = 0;

    for (let i = 0; i < minLength; i++) {
      if (word[i] === this.guessWord[i]) {
        matchedCharacterCount++;
      }
    }

    return { word: word, matchingLettersCount, matchedCharacterCount };
  }

  searchWord(word: string) {
    if (!word.trim()) return;
    let isValidWord = false;
    this.dictionaryService.getWordDefinition(word).subscribe({
      next: (data) => {
        // this.definitions = data;
        // !isWordValid.sequential : not checking for sequential
        const tryWord = this.getMatchingDetails(word);
        this.guesses.push(tryWord);
        if (tryWord.matchedCharacterCount === 0 && tryWord.matchingLettersCount === 0) {
          this.disabledKeys.push(...tryWord.word.split(''));
        }
        this.text = '';
        if (word === this.guessWord) {
          this.errorMessage = "Guess Correctly";
        } else {
          if (this.guesses.length === this.config.maxTries) {
            this.errorMessage = "Sorry Max Tries Over, Right Word :" + this.guessWord;
          } else {
            this.errorMessage = "";
          }
        }
        
      },
      error: () => {
        // this.definitions = [];
        this.errorMessage = 'Word not found!';
        isValidWord = false;
      },
    });

  }

}
