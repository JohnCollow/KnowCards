import { Component,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  @Output() mensagem = new EventEmitter<string>();
  constructor() {}



  confirm() {
    this.mensagem.emit("confirm")
  }

  cancel(){
    this.mensagem.emit("cancel")
  }
}
