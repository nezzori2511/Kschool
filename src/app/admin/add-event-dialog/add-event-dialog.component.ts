import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddEventDialogComponent>) { }

  ngOnInit(): void {
  }
  addEvent() {
    // Thực hiện xử lý khi người dùng bấm nút "Thêm"
    // Gửi dữ liệu cần thiết về cho component chính thông qua `dialogRef`
  
  }

  closeDialog() {
    // Đóng hộp thoại mà không làm gì cả (không thêm sự kiện)
    this.dialogRef.close();
  }
}
