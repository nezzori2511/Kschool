import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';

@Component({
  selector: 'app-course-client',
  templateUrl: './course-client.component.html',
  styleUrls: ['./course-client.component.scss']
})
export class CourseClientComponent implements OnInit {
  list_special:any[]=[];
  specialized_id:any;
  list_course:any[]=[];
  constructor(private apiservice:ApiServices,
    private router:Router) { }
  get_list_special()
  {
    const req=
    {

      action_id:7,
      var1:'',
      var2:'',
      var3:'',
      var4:'',
      var5:'',
      var6:'',
      var7:'',
      var8:'',
      var9:'',
      var10:'',
    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Course_client,req).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.list_special=data.dulieu.table1;
          console.log(this.list_special)
        }
        else
        {
          console.log("Lỗi")
        }
      })

  }
  get_list_course_full()
  {
    const req=
    {

      action_id:1,
      var1:'',
      var2:'',
      var3:'',
      var4:'',
      var5:'',
      var6:'',
      var7:'',
      var8:'',
      var9:'',
      var10:'',
    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Course_client,req).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.list_course=data.dulieu.table1;
          console.log(this.list_special)
        }
        else
        {
          console.log("Lỗi")
        }
      })
  }
  get_list_course_fillter(special:any)
  {
    const req=
    {

      action_id:1,
      var1:'',
      var2:'',
      var3:'',
      var4:'',
      var5:'',
      var6:'',
      var7:'',
      var8:'',
      var9:'',
      var10:'',
    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Course_client,req).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.list_course=data.dulieu.table1;
          console.log(this.list_special)
          this.list_course=this.list_course.filter(x=>x.specialized_id==special.specialized_id)
          console.log(this.list_course)
        }
        else
        {
          console.log("Lỗi")
        }
      })
  }
  calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
    if (discountPercentage && discountPercentage > 0 && discountPercentage <= 100) {
      const discountAmount = (discountPercentage / 100) * originalPrice;
      return originalPrice - discountAmount;
    } else {
      // Nếu không có giảm giá hoặc phần trăm giảm giá không hợp lệ, trả về giá gốc.
      return originalPrice;
    }
  }
  fillter_course(special:any)
  {
   
  this.get_list_course_fillter(special)
  }
  getCourseDetail(id:Number)
  {
    this.router.navigate(['/course-detail', id]);
  }
  ngOnInit(): void {
    this.get_list_special()
    this.get_list_course_full()
  }

}
