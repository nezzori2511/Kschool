import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { SharefunshionService } from 'app/services/sharefunshion.service';
import { EMPTY, concatMap } from 'rxjs';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})

export class CourseDetailComponent implements OnInit {
  
  amountInUSD:any;
  listschedule:any[]=[];
  calendarOptions: CalendarOptions;
  eventsPromise: Promise<EventInput[]>;
  formattedEvents:any;
  id: Number | null = null;
  course:any;
  listchapter:any[]=[];
  listLesson:any[]=[];
  total_time_video:any=0;
  total_chapter:number=0;
  total_video_lesson:any=0;
  listVideoLesson:any[]=[];
  fisrt_chapter:any;
  fisrt_lesson:any;
  listSchedule_user:any[]=[]
  listSchedule_course:any[]=[]
  payform:FormGroup;
  @ViewChild('dialogTemplatePay') dialogTemplatePay: TemplateRef<any>;
  constructor(private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private dialog:MatDialog,
    private router:Router,
    private apiservice:ApiServices,
    private sharefunshion:SharefunshionService) { }

  getVideoLesson()
  {
    const reqCourse =
    {
      action_id: 6,
      var1: this.id,
      var2: '',
      var3:'',
      var4:'',
      var5: '',
      var6: '',
      var7: '',
      var8: '',
      var9: '',
      var10: '',
    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Course_client,reqCourse).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          
          this.listVideoLesson=data.dulieu.table1;
          //const keys = Object.keys(this.listVideoLesson);
          console.log(this.listVideoLesson)
          for(let key of this.listVideoLesson)
          {
            console.log("chạy lần  ",key.index)
            this.total_video_lesson+= 1
            this.total_time_video+=key.total_time_video

          }
          this.total_time_video= this.getFormattedTime(this.total_time_video);
          console.log("thời lượng",this.total_time_video)
          console.log("tổng video",this.total_video_lesson)
        }
      })
  }
  getFormattedTime(totalSeconds: number): string {
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;
  
    // Sử dụng hàm `String.prototype.padStart` để thêm số 0 phía trước nếu cần
    const formattedTime: string = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
  }
  
  getCourse()
  {
    const reqCourse =
    {
      action_id: 2,
      var1: this.id,
      var2: '',
      var3:'',
      var4:'',
      var5: '',
      var6: '',
      var7: '',
      var8: '',
      var9: '',
      var10: '',
    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Course_client,reqCourse).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.course=data.dulieu.table1[0];
        }
      })
    
  }
  getChapter()
  {
    const reqCourse =
    {
      action_id: 3,
      var1: this.id,
      var2: '',
      var3:'',
      var4:'',
      var5: '',
      var6: '',
      var7: '',
      var8: '',
      var9: '',
      var10: '',
    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Course_client,reqCourse).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.listchapter=data.dulieu.table1;
          this.fisrt_chapter=data.dulieu.table1[0];
          
          console.log("list chapter",this.listchapter);
          for(let item of this.listchapter)
          {
            this.total_chapter+=1;
          }
        }
      })
    
  }
  openDialog(dialogTemplate: TemplateRef<any>) {
    const dialogRef = this.dialog.open(dialogTemplate, {
      width: '500px', // Điều chỉnh kích thước dialog theo ý muốn
      height: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Xử lý kết quả sau khi dialog đóng
      console.log('Dialog result:', result);
    });
  }
 
  pay_pal_sub()
  {
    console.log(this.payform.get('paymentMethod')?.value)
    if(this.payform.get('paymentMethod')?.value==1)
    {
      this.cancelPayForm()
      const reqCourse =
      {
        action_id: 8,
        var1: this.course.course_id,
        var2:this.course.price,
        var3:"",
        var4:localStorage.getItem('client_id'),
        var5: '',
        var6: '',
        var7: '',
        var8: '',
        var9: '',
        var10: '',
      }
    
     this.apiservice.callAPIJson(environment.ApiEndpoint.Progress_user,reqCourse).subscribe(data=>
        {
          //console.log(data.mathongbao)
          if(data.mathongbao==1)
          { 

           
            //this.sharefunshion.showNotification("top","right",2,"Đăng ký thành công")
            this.router.navigate(['success'])
          }
          else
          {
          
            console.log("Lỗi")
          }

        })
      //this.router.navigate(['success']);
      
    }
    else if(this.payform.get('paymentMethod')?.value==2)
    {
      this.convertToUSD(this.course.price)
      this.pay_pal();
    }
  }
  pay_pal()
  {
    const paymentRequest =
    {
      Currency: 'USD',
      Amount: this.amountInUSD,
      course_id: this.course.course_id,
    }
  
    this.apiservice.createPayment(paymentRequest).subscribe(
      response => {
        console.log('Payment initiated successfully:', response);
    //     setTimeout(() => {
        localStorage.setItem('product_id',this.course.course_id)
        localStorage.setItem('total_price',this.course.price)
    //       // Redirect đến trang thanh toán PayPal hoặc thực hiện các bước khác
          window.location.href = response.approvalurl;
    // }, 5000); // Chuyển hướng sau 5 giây
      
       
      },
      error => {
        console.error('Error initiating payment:', error);
        // Xử lý lỗi nếu có
      }
    );
  }
  register_course(course:any)
  {
    if(localStorage.getItem('token')!=null&&localStorage.getItem('client_id')!=null)
    {

       const reqCourse =
        {
          action_id: 5,
          var1: course.course_id,
          var2: localStorage.getItem('client_id'),
          var3:'',
          var4:'',
          var5: '',
          var6: '',
          var7: '',
          var8: '',
          var9: '',
          var10: '',
        }
       this.apiservice.callAPIJson(environment.ApiEndpoint.Progress_user,reqCourse).pipe(concatMap(data=>
        {
          console.log("mtb",data.mathongbao)
          
            if(data.mathongbao==1)
            {
            
              if(data.dulieu.table1.length!=0)
              {
                const reqCourseUser =
                {
                  action_id: 3,
                  var1: localStorage.getItem('client_id'),
                  var2: '',
                  var3:'',
                  var4:'',
                  var5: '',
                  var6: '',
                  var7: '',
                  var8: '',
                  var9: '',
                  var10: '',
                }
                return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule_client,reqCourseUser).pipe(concatMap(data=>
                  {
                    if(data.mathongbao==1)
                    {
                      this.listSchedule_user=data.dulieu.table1;
                      console.log("list tkb",this.listSchedule_user);
                      const reqCourse =
                      {
                        action_id: 4,
                        var1: course.course_id,
                        var2: '',
                        var3:'',
                        var4:'',
                        var5: '',
                        var6: '',
                        var7: '',
                        var8: '',
                        var9: '',
                        var10: '',
                      }
                      return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule_client,reqCourse).pipe(concatMap(data=>
                        {
                          if(data.mathongbao==1)
                          {
                            this.listSchedule_course=data.dulieu.table1
                            //console.log("lịch của khóa",this.listSchedule_course)
                            const hasCommon = this.hasCommonElements(this.listSchedule_course, this.listSchedule_user);
                            if(hasCommon)
                            {
                              this.sharefunshion.showNotification("top","right",4,"Trùng lịch")
                            }
                            else
                            {
                              const reqCourse =
                              {
                                action_id: 6,
                                var1: course.course_id,
                                var2: "",
                                var3:"",
                                var4:"",
                                var5: '',
                                var6: '',
                                var7: '',
                                var8: '',
                                var9: '',
                                var10: '',
                              }
                              return this.apiservice.callAPIJson(environment.ApiEndpoint.Progress_user,reqCourse).pipe(concatMap(data=>
                                {
                                  if(data.mathongbao==1)
                                  {
                                    
                                    this.test_dialog()
                                   
                                  }
                                  else
                                  {
                                    console.log("Lỗi ")
                                  }
                                  return EMPTY
                                }))
                            }
                          }
                          else
                          {
                            console.log("Lỗi")
                          }
                          return EMPTY;
                        }))
                    }
                    else

                    {
                      console.log("Lỗi ")
                    }
                    
                  }))
              }
              else
              {
              //   console.log("chay vao day")
              //   console.log( this.fisrt_chapter)
              //   const reqCourse =
              //   {
              //     action_id: 1,
              //     var1: course.course_id,
              //     var2: "",
              //     var3:"",
              //     var4:localStorage.getItem('client_id'),
              //     var5: '',
              //     var6: '',
              //     var7: '',
              //     var8: '',
              //     var9: '',
              //     var10: '',
              //   }
            
              // return this.apiservice.callAPIJson(environment.ApiEndpoint.Progress_user,reqCourse).pipe(concatMap(data=>
              //   {
              //     console.log(data.mathongbao)
              //     if(data.mathongbao==1)
              //     {
              //       this.test_dialog()
              //       //this.sharefunshion.showNotification("top","right",2,data.thongbao)
                
              //     }
              //     else
              //     {
              //       console.log("Lỗi")
              //     }
              //     return EMPTY;
              //   }))
              const reqCourse =
              {
                action_id: 6,
                var1: course.course_id,
                var2: "",
                var3:"",
                var4:"",
                var5: '',
                var6: '',
                var7: '',
                var8: '',
                var9: '',
                var10: '',
              }
              return this.apiservice.callAPIJson(environment.ApiEndpoint.Progress_user,reqCourse).pipe(concatMap(data=>
                {
                  if(data.mathongbao==1)
                  {
                    
                    this.test_dialog()
                   
                  }
                  else
                  {
                    console.log("Lỗi ")
                  }
                  return EMPTY
                }))
        
              }
            }
          else if(data.mathongbao==-1)
          {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!',
              text: data.thongbao,
              confirmButtonColor: '#dc3545',
            });
            //this.sharefunshion.showNotification('top','right',3,data.thongbao)
          }
          else
          {
            console.log("Lỗi")
          }
         
        })).subscribe()
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text:"Bạn chưa đăng nhập",
        confirmButtonColor: '#dc3545',
      });
      //this.sharefunshion.showNotification("top","right",3,)
      this.router.navigate(['client/login']);

   
    }
  }
  test_dialog()
  {
    console.log("Chạy ")
    if(this.course.price==0)
    {
      const reqCourse =
      {
        action_id: 1,
        var1: this.course.course_id,
        var2:this.course.price,
        var3:"",
        var4:localStorage.getItem('client_id'),
        var5: '',
        var6: '',
        var7: '',
        var8: '',
        var9: '',
        var10: '',
      }
    
     this.apiservice.callAPIJson(environment.ApiEndpoint.Progress_user,reqCourse).subscribe(data=>
        {
          //console.log(data.mathongbao)
          if(data.mathongbao==1)
          { 

            
            //this.sharefunshion.showNotification("top","right",2,"Đăng ký thành công")
            this.router.navigate(['success'])
          }
          else
          {
          
            console.log("Lỗi")
          }

        })
   
    }
    else
    {
      this.openDialog(this.dialogTemplatePay);
    }
    
  }
  hasCommonElements(arrayA: any[], arrayB: any[]):boolean
  {
    return arrayA.some(itemA =>
      arrayB.some(itemB =>
        itemA.time_start === itemB.time_start &&
        itemA.day_lesson === itemB.day_lesson
        
      )
    );
  }
  getLesson()
  {
    const reqCourse =
    {
      action_id: 5,
      var1: this.id,
      var2: '',
      var3:'',
      var4:'',
      var5: '',
      var6: '',
      var7: '',
      var8: '',
      var9: '',
      var10: '',
    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Course_client,reqCourse).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.listLesson=data.dulieu.table1;
          this.fisrt_lesson=data.dulieu.table1[0];
          //console.log(data.dulieu.table1);
        }
      })
    
  }
  getlistschedule()
  {
    
    const reqAddSchedule=
    {
      action_id:6,
      var1:this.id ,
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
    return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule_client,reqAddSchedule).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.listschedule=data.dulieu.table1;
          console.log("list tkb",this.listschedule)
           this.formattedEvents = this.listschedule.map(schedule => {
            console.log('Value of schedule.day_lesson:', schedule.day_lesson);
            console.log('giờ:', schedule.time_start);
            //console.log( format(schedule.day_lesson, 'yyyy-MM-dd'))
            // Format the date using day_lesson and time_start

            //const fomatdate=format(schedule.day_lesson, 'yyyy-MM-dd')
            //const dateTime = schedule.day_lesson;
            const dayLesson = new Date(schedule.day_lesson);
            const timeStart = schedule.time_start.split(':');
            dayLesson.setHours(Number(timeStart[0]), Number(timeStart[1]), 0, 0);

            // Tạo đối tượng ngày đầy đủ
            const dateTime = dayLesson.toISOString();
            return {
              title: schedule.name+"("+schedule.room_name+")",
              date: dateTime,
              schedule_id:schedule.schedule_id,

            };
          });
          console.log(this.formattedEvents)
           
             
        }
      this.chay();
      })
  }
  chay(){
      console.log("kiểm tra list",    this.formattedEvents)
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        events:
      // [
  
      //   {title: 'Event 417', date: '2023-11-28T00:00:00', description: 'mô tả 417', ca: 'ca 417'}
      // ],
   
     this.formattedEvents,
     
   
    
  };
    }
    convertToUSD(amountInVND: any) {
      // Tính toán số tiền sau khi chuyển đổi sang USD
      this.amountInUSD = (amountInVND / 23000).toFixed(2);
     
    }
    
    cancelPayForm()
    {
      this.payform.reset()
      this.dialog.closeAll();
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
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.payform = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
    });
    this.getlistschedule();
    this.chay();
    this.getCourse();
    this.getChapter();
    this.getLesson();
    this.getVideoLesson()
  }

}
