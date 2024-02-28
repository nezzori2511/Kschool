import { Component, OnInit, ViewChild } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Calendar, CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import { CalendarOption } from '@fullcalendar/angular/private-types';
import { FullCalendarComponent } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import { parse, format } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from '../add-event-dialog/add-event-dialog.component';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import * as Chartist from 'chartist';

/** Flat node with expandable and level information */

@Component({
  selector: 'app-testtree',
  templateUrl: './testtree.component.html',
  styleUrls: ['./testtree.component.scss']
})
export class TesttreeComponent implements OnInit {
  // public barChartData = [
  //   {
  //     name: 'Doanh Thu',
  //     series: [
  //       { name: 'Tháng 1', value: 10000000 },
  //       { name: 'Tháng 2', value: 5000000 },
  //       // ... Các tháng khác
  //     ],
  //   },
  //   {
  //     name: 'Chi Phí',
  //     series: [
  //       { name: 'Tháng 1', value: 5000000 },
  //       { name: 'Tháng 2', value: 2000000 },
  //       // ... Các tháng khác
  //     ],
  //   },
  // ];

  public barChartData : { name: string, value: number }[] = []

  // Các cài đặt khác của biểu đồ
  public view: [number, number] = [1000, 400];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  public gradient = false;
  public showLegend = false;
  public showXAxis = true;
  public showYAxis = true;
  public xAxisLabel = 'Tháng ';
  public yAxisLabel = 'Doanh thu(VNĐ)';
 
  
  ngOnInit(): void {
    const dataFromDatabase = [
      { "month": 1, "total_revenue": 0 },
      { "month": 2, "total_revenue": 0 },
      { "month": 3, "total_revenue": 0 },
      { "month": 4, "total_revenue": 0 },
      { "month": 5, "total_revenue": 0 },
      { "month": 6, "total_revenue": 0 },
      { "month": 7, "total_revenue": 1515115 },
      { "month": 8, "total_revenue": 1515115 },
      { "month": 9, "total_revenue": 0 },
      { "month": 10, "total_revenue": 1515115 },
      { "month": 11, "total_revenue": 1515115 },
      { "month": 12, "total_revenue": 14141341 }
    ];
    
    // Chuyển đổi dữ liệu từ danh sách để truyền vào biểu đồ
    this.barChartData = dataFromDatabase.map(item => ({
      name: `T${item.month}`,
      value: item.total_revenue
    }));
  }

}
