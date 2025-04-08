import { Component, OnInit } from '@angular/core';
import { generate, count } from "random-words";
import { DictionaryService } from '../../services/dictionary.service';
import confetti from 'canvas-confetti';


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
  isModalVisible: boolean = false;
  guessWord: string = '';
  text: string = '';
  config: Config = {
    maxLength: 4,
    maxTries: 8
  }
  isLoading: boolean = false;

  guesses : { word: string; matchingLettersCount: number; matchedCharacterCount: number; }[] = [];


  message: string = '';


  definitions: any[] = [];

  disabledKeys: string[] = [];

  constructor(private dictionaryService: DictionaryService) {}
  
  ngOnInit(): void {
    this.generateGuessWord();
  }



  generateGuessWord() {
    this.isLoading = true;
    // this.dictionaryService.generateRandomword(this.config.maxLength).subscribe({
    //   next: (word) => {
    //     if (this.hasRepeatedLetters(word[0])  || !(word && word[0].length === this.config.maxLength)) {
    //       this.generateGuessWord();
    //     } else {
    //       this.guessWord = word[0];
    //       console.log(this.guessWord);
    //     }
    //   },
    //   error: () => {
    //     this.message = 'Word not Generated';
    //   }
    // });

    // below code is for generating the random word by node module, gives error or wrong words after multiple tries
    const word = generate({ 
                    minLength: this.config.maxLength,
                    maxLength: this.config.maxLength,
                    exactly: 1, 
                    formatter: (word) => word.toUpperCase(),
                 });
    if (this.hasRepeatedLetters(word[0])  || !(word && word[0].length == this.config.maxLength)) {
      this.generateGuessWord();
    } else {
      this.guessWord = word[0];
      console.log(this.guessWord);
      this.isLoading = false;
    }
  }

  handleKeyPress(key: string) {
    this.message = '';
    if (key === 'Backspace') {
      this.text = this.text.slice(0, -1);
    } else if (key === 'Enter') {
      if (this.text.length === this.config.maxLength) {
        const isWordValid = this.checkWord(this.text);
        if (!isWordValid.repeated) {
            this.searchWord(this.text);
        } else if (isWordValid.repeated) {
          this.message = 'That letter’s already been on stage, superstar! 🌟🎭';
          this.isModalVisible = true;
        } 
        // else if (isWordValid.sequential) {
        //   this.message = 'Sequential Letters not allowed';
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
    this.isLoading = true;
    if (!word.trim()) return;
    let isValidWord = false;
    this.dictionaryService.getWordDefinition(word).subscribe({
      next: (data) => {

        this.isLoading = false;
        // this.definitions = data;
        // !isWordValid.sequential : not checking for sequential
        const tryWord = this.getMatchingDetails(word);
        this.guesses.push(tryWord);
        if (tryWord.matchedCharacterCount === 0 && tryWord.matchingLettersCount === 0) {
          this.disabledKeys.push(...tryWord.word.split(''));
        }
        this.text = '';
        if (word === this.guessWord) {
          this.message = "🎯 Bullseye! You nailed it!";
          this.isModalVisible = true;
          this.launchFireworks();
          setTimeout(() => {
            this.resetTheGame()
          }, 5000);
        } else {
          if (this.guesses.length === this.config.maxTries) {
            this.message =  "📢 Buzzer! You've reached max attempts. Word was " + this.guessWord;
            this.isModalVisible = true;
            setTimeout(() => {
              this.resetTheGame()
            }, 5000);
          } else {
            this.message = "";
            this.isModalVisible = false;
          }
        }
        
      },
      error: () => {
        // this.definitions = [];
        this.message = '🧠 Nice try, word wizard! But that one’s not in our spellbook.';
        this.isModalVisible = true;
        isValidWord = false;
        this.isLoading= false
      },
    });

  }

  handleSelectionChange(event: Config) {
    this.config = event;
    this.guesses = [];
    this.text = '';
    this.generateGuessWord()
    console.log('Updated Selection:', this.config);
  }

  resetTheGame() {
    this.config  = {
      maxLength: 4,
      maxTries: 8
    };
    this.guesses = [];
    this.text = '';
    this.message = '';
    this.isModalVisible = false;
    this.disabledKeys = [];
    this.generateGuessWord();
  }

  getPlaceholders(): number[] {
    const n = this.config.maxLength - this.text.length;
    return Array(n).fill(0).map((_, i) => i);
  }

  launchFireworks(): void {
    const duration = 5 * 1000; // 3 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
  
    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
  
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
  
      const particleCount = 50 * (timeLeft / duration);
  
      // fire from random locations
      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: ['#ff4dde', '#38b6ff', '#8eff63', '#ffe261']
      });
    }, 250);
  }

}
