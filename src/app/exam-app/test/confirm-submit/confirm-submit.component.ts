import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-submit',
  templateUrl: './confirm-submit.component.html',
  styleUrls: ['./confirm-submit.component.scss']
})
export class ConfirmSubmitComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmSubmitComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      if( data['isAutoSubmit'] ) {
        this.onConfirm();
      }
  }

  ngOnInit() {
  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
