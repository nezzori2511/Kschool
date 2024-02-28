import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-progress-dialog-component',
  templateUrl: './progress-dialog-component.component.html',
  styleUrls: ['./progress-dialog-component.component.scss']
})
export class ProgressDialogComponent implements OnInit {

  constructor() { }
  public isWorkCompleted$ = new BehaviorSubject<boolean>(false);

  completeWork(): void {
    this.isWorkCompleted$.next(true);
  }
  ngOnInit(): void {
  }

}
