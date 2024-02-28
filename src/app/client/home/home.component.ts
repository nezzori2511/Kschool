import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listCourse  :any[]=[];
  listCourseFreefull  :any[]=[];
  listCourseFree  :any[]=[];
  listCourseDiscountfull  :any[]=[];
  listCourseDiscount  :any[]=[];
  listCourseFull:any[]=[];
  checkcoursefull:boolean=false;
  checkcoursefreefull:boolean=false;
  checkcoursediscountfull:boolean=false;
  constructor(private apiservice:ApiServices,
    private router:Router) { }

  images = [
    'assets/img/course_1.jpg',
    'assets/img/course_4.jpg',
    'assets/img/course_3.jpg'
  ];
  interval: any;
  currentIndex = 0;
  transitioning = false;
  getListCourse()
  {
    const reqCourse=
    {
      action_id: 1,
      var1: "",
      var2: "",
      var3: "",
      var4:"",
      var5:"",
      var6:"",
      var7:"",
      var8:"",
      var9:"",
      var10:"",
    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Course_client,reqCourse).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          
          this.listCourseFull=data.dulieu.table1;
          this.listCourseFreefull=this.listCourseFull.filter(c=>c.price===0);
          this.listCourseFree=this.listCourseFreefull.slice(0,3)
         
          this.listCourseFull=data.dulieu.table1;
          this.listCourseDiscountfull=this.listCourseFull.filter(c=>c.promotion!=false);
         
          this.listCourseDiscount=this.listCourseDiscountfull.slice(0,3)

          this.listCourse=data.dulieu.table1;  
          this.listCourse=this.listCourse.slice(0,3);
          
        }
      }
      )
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
  getListCourseFull()
  {
    this.checkcoursefull=true;
    this.listCourse=this.listCourseFull;
  }
  getListCourseFreeFull()
  {
    this.checkcoursefreefull=true;
    this.listCourseFree=this.listCourseFreefull;
  }
  getListCourseDiscountFull()
  {
    this.checkcoursediscountfull=true;
    this.listCourseDiscount=this.listCourseDiscountfull;
  }
  getCourseDetail(id:Number)
  {
    this.router.navigate(['/course-detail', id]);
  }
  ngOnInit(): void {
    this.startInterval(); 
    this.getListCourse();
    console.log(this.listCourseFreefull.length)
  }
  ngOnDestroy() {
    this.clearInterval();
    
  }
  
  startInterval() {
    this.interval = setInterval(() => {
      this.showNext();
    }, 3000);
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  showNext() {
    this.transitioning = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.transitioning = false;
    }, 500); 
  }

  showPrev() {
    this.transitioning = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.transitioning = false;
    }, 500);
  }

}
