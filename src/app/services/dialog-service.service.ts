import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressDialogComponent } from 'app/admin/progress-dialog-component/progress-dialog-component.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogRef: MatDialogRef<ProgressDialogComponent>;

  constructor(private dialog: MatDialog) { }

  openProgressDialog(): void {
    this.dialogRef = this.dialog.open(ProgressDialogComponent, {
      width: '400px',
      disableClose: true,
    });
  }

  closeProgressDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
