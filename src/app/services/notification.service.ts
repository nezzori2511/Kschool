

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<any>();

  constructor() {}

  // Phương thức để lấy thông báo từ component khác
  getNotification() {
    return this.notificationSubject.asObservable();
  }

  // Phương thức để thiết lập thông báo từ component khác
  setNotification(notification: any) {
    this.notificationSubject.next(notification);
  }
}