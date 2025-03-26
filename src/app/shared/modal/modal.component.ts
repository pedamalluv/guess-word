
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() showModal: boolean = false;  // Control modal visibility
  @Input() title: string = 'Modal Title'; // Dynamic title
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  close() {
    this.showModal = false;
    this.closeModal.emit();
  }
}
