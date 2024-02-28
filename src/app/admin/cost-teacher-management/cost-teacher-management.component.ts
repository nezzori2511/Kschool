import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { SharefunshionService } from 'app/services/sharefunshion.service';

@Component({
  selector: 'app-cost-teacher-management',
  templateUrl: './cost-teacher-management.component.html',
  styleUrls: ['./cost-teacher-management.component.scss']
})
export class CostTeacherManagementComponent implements OnInit {
  displayedColumns: string[] = ['order_id','name', 'revenue','day_pay','status_order','actions'];
  dataSource:MatTableDataSource<any>;
  order:any;
  @ViewChild('firstsort') firstsort!: MatSort
  @ViewChild('firstPaginator') firstPaginator: MatPaginator;
  constructor(private apiservice:ApiServices,
    private sharefunshion:SharefunshionService) { }

  getdata()
  {
    const reqDN = {
      action_id: 7, // Replace 1 with the appropriate action ID for login
     
      var1: "", // Fill in additional parameters if required by the API
      var2: "",
      var3: "",
      var4: "",
      var5: "",
      var6: "",
      var7: "",
      var8: "",
      var9: "",
      var10: ""
    };
    this.apiservice.callAPIJson(environment.ApiEndpoint.Revenue_management,reqDN).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.dataSource = new MatTableDataSource<any>(data.dulieu.table1);
          this.dataSource.paginator = this.firstPaginator;
          this.dataSource.sort = this.firstsort;
        }
      })
  }
  confirmed_receipt(order:any)
  {
    const reqDN = {
      action_id: 8, // Replace 1 with the appropriate action ID for login
     
      var1: order.order_id, // Fill in additional parameters if required by the API
      var2: "",
      var3: "",
      var4: "",
      var5: "",
      var6: "",
      var7: "",
      var8: "",
      var9: "",
      var10: ""
    };
    this.apiservice.callAPIJson(environment.ApiEndpoint.Revenue_management,reqDN).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.sharefunshion.showNotification("top","right",2,"Chỉnh trạng thái thành công");
        }
        else
        {
          console.log("Lỗi ")
        }
        this.getdata()
      })
  }
  ngOnInit(): void {
    this.getdata()
  }

}
