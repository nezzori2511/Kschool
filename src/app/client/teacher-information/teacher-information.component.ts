import { Component, OnInit } from '@angular/core';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';

@Component({
  selector: 'app-teacher-information',
  templateUrl: './teacher-information.component.html',
  styleUrls: ['./teacher-information.component.scss']
})
export class TeacherInformationComponent implements OnInit {
  list_teacher:any;
  constructor(private apiservice:ApiServices) { }

  getlist_teacher()
  {
    const req ={
      action_id:1,
      vart:'',
      varm:'',
      var1:'',
      var2:'',
      var3:'',
      var4:'',
      var5:'',
      var6:'',
      var7:'',
      var8:'',
   
     
    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Teacher_management,req).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.list_teacher=data.dulieu.table1;
          console.log(this.list_teacher)
        }
        else[
          console.log("Lỗi")
        ]
      })
  }
  ngOnInit(): void {
    this.getlist_teacher()
  }

}
