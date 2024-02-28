import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.scss']
})
export class MyCourseComponent implements OnInit {
  listMycourse:any;

  constructor(private apiservice:ApiServices,
    private route:Router

    ) { }
  view_progress(course:any)
  {
    this.route.navigate(['progress-course', course.course_id]);
  }
  getdata()
  {
    const reqAddSchedule=
    {
      action_id:7,
      var1:localStorage.getItem('client_id') ,
      var2:"",
      var3:"",
      var4:"",
      var5:'',
      var6:'',
      var7:'',
      var8:'',
      var9:'',
      var10:'',

    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Progress_user,reqAddSchedule).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.listMycourse=data.dulieu.table1;
          console.log("list",this.listMycourse)
        }
        else
        {
          console.log("Lỗi")
        }
      })
    
  }
  ngOnInit(): void {
    this.getdata()
  }

}
