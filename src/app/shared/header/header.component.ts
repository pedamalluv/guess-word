import { Component, EventEmitter, Output } from '@angular/core';

interface Config {
  maxLength: number,
  maxTries: number
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() selectionChange = new EventEmitter<{ maxLength: number, maxTries: number }>();
    
  handleSelectionChange(event: Config) {
    return this.selectionChange.emit(event);
  }
}
