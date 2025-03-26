import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  
  constructor(private http: HttpClient) {}
  
  getWordDefinition(word: string): Observable<any> {
    const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    return this.http.get<any>(`${apiUrl}${word}`);
  }
  generateRandomword(wordLength: number): Observable<any> {
    const apiURL = 'https://random-word-api.vercel.app/api?words=1&length=';
    return this.http.get<any>(`${apiURL}${wordLength}`);
  }
}
