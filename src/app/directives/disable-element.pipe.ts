import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'disableElement'
})
export class DisableElementPipe implements PipeTransform {
  transform(value: string, disableList: string[]): boolean {
    return disableList.includes(value); // Returns true if value is in disableList
  }
}
