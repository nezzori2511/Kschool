import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { DataService } from 'app/services/data.service';
import { Router } from '@angular/router';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { EMPTY, concatMap, empty, forkJoin, map, mergeMap } from 'rxjs';
import { Data } from 'popper.js';
import { addDays, format, isValid } from  'date-fns';
import { en } from '@fullcalendar/core/internal-common';
import { element } from 'protractor';
import { env } from 'process';
import * as e from 'express';
import { type } from 'os';
import { SharefunshionService } from 'app/services/sharefunshion.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'app/services/dialog-service.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],

  
})
export class CourseComponent implements OnInit {
  data: any[] = [];
  data2:any[]=[];
  data3:any[]=[];
  listShedule:any[]=[];
  apiResponse:any = [];
  dataSource:MatTableDataSource<any>;
  datacourseinfor:MatTableDataSource<any>
  datacoursepromotion:MatTableDataSource<any>
  count=0;
  add_schedule_form:FormGroup;
  day_lesson:any;
  courses:any;
  courses_promotion:any;
  promotion_form:FormGroup;
  displayedColumns: string[] = ['course_id','name', 'describe','created_at','updated_at','price','specialized_name','actions'];
  displayedColumnspromotion: string[] = ['course_id','name', 'price','price_discount','promotion','price_affter_promotion','actions'];
  displayedColumnsCourseOpenning: string[] = ['course_id','name', 'specialized_name','status','scheduled','registration_opening','registration_close','time_start_course' ,'empty_slot','actions'];

  @ViewChild('firstsort') firstsort!: MatSort;

  @ViewChild('secondsort') secondsort!: MatSort;
  @ViewChild('thirdsort') thirdsort!: MatSort;

  
  @ViewChild('firstPaginator') firstPaginator: MatPaginator;
  @ViewChild('secondPaginator') secondPaginator: MatPaginator;
  @ViewChild('thirdPaginator') thirdPaginator: MatPaginator;
  constructor(    private dialogservice:DialogService,
    private fb: FormBuilder,
    private apiServices: ApiServices ,
    private dataService:DataService,
    private route:Router,
    private sharefunshion:SharefunshionService,
    private dialog:MatDialog,
    ) {
      
   }
   
   getdata()
   {
     const reqDN = {
       action_id: 6, // Replace 1 with the appropriate action ID for login
       vart: "",
       varm: "",
       var1: "", // Fill in additional parameters if required by the API
       var2: "",
       var3: "",
       var4: "",
       var5: "",
       var6: "",
       var7: "",
       var8: ""
     };
     //const action_id = 3; // Đặt action_id tương ứng với yêu cầu lấy thông tin tài khoản từ API
 
     this.apiServices.callAPIJson(environment.ApiEndpoint.Course,reqDN).subscribe(data=>{
 
       if(data.mathongbao===1)
       {
         this.data = data.dulieu.table1;
         this.data2 = data.dulieu.table1;
         this.data3 = data.dulieu.table1;
         //this.data2 = [...this.data];
         //  this.apiResponse = this.data;
         console.log("data",this.data)
         this.dataSource = new MatTableDataSource<any>(this.data);
         this.dataSource.paginator = this.firstPaginator;
         this.dataSource.sort = this.firstsort;
         this.dataSource.connect();
        
       

         this.datacourseinfor = new MatTableDataSource<any>(this.data2);
         this.datacourseinfor.paginator = this.secondPaginator;
      
         this.datacourseinfor.sort = this.secondsort;
         this.datacourseinfor.connect();

         this.datacoursepromotion = new MatTableDataSource<any>(this.data3);
         this.datacoursepromotion.paginator = this.thirdPaginator;
   
         this.datacoursepromotion.sort = this.thirdsort;
         this.datacoursepromotion.connect();
       }
       
       else
       {
         alert("Lỗi");
       }
   });
  
   }
  

   add_schedule ()
   {
      //console.log(courses.time_start_course)
    
      
      //this.day_lesson=new Date(courses.time_start_course);
      console.log(typeof(this.day_lesson),this.day_lesson)
      if(this.add_schedule_form.get('total_day')?.value )
      {

       
        const reqcheckdate=
        {
          action_id:10,
          var1:this.add_schedule_form.get('hourly_rate')?.value,
          var2:'',
          var3:this.courses.course_id,
          var4:'',
          var5:'',
          var6:'',
          var7:'',
          var8:'',
          var9:'',
          var10:'',
  
        }
        console.log(reqcheckdate)
        this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqcheckdate).subscribe(data=>
          {
            console.log("ma thong bao",data.mathongbao)
            if(data.mathongbao==1)
            {
              this.dialogservice.openProgressDialog();
              this.schedule(this.courses,this.add_schedule_form.get('total_day')?.value)
            }
          })
     
      }
     
   }
   schedule(courses:any,attempts: number)
   {
    
    console.log(attempts)
    if (attempts <= 0) {
      const reqcheckdate=
      {
        action_id:23,
        var1:courses.course_id,
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
      
      this.apiServices.callAPIJson(environment.ApiEndpoint.Course,reqcheckdate).subscribe(data=>
        {
          console.log(data.mathongbao)
          if(data.mathongbao==1)
          {
            console.log("Đã thực hiện đủ 10 lần");
            this.cancelAddScheduleForm();
            this.dialogservice.closeProgressDialog();
            this.sharefunshion.showNotification('top', 'right', 2, 'Lênh lịch thành công');
            this.getdata();
          }
        })
      
      
      
      return;
    }
    else
    {
      console.log("chay")
      //console.log(courses)
      let time_start='08:00:00'
      let course_id=courses.course_id
  
      //this.day_lesson=new Date(courses.time_start_course);
      //let ngayFormatted =format(this.day_lesson, 'yyyy-MM-dd')
      //const ngayFormatted = format(day_lesson, 'yyyy-MM-dd');
      //console.log("loại dữ liệu",this.day_lesson)
      let room =1
      let count=0
      //const maxAttempts = 3;
   

        const reqcheckdate=
        {
          action_id:1,
          var1:format(this.day_lesson, 'yyyy-MM-dd'),
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
        this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqcheckdate).pipe(concatMap(data=>
          {
            console.log("ma thong bao ",data.mathongbao)
            //onsole.log("ma thông báo check ngày",data.mathongbao)
            if(data.mathongbao==1)
            {
  
            
              const reqAddSchedule=
              {
                action_id:4,
                var1:room,
                var2:format(this.day_lesson, 'yyyy-MM-dd'),
                var3:time_start,
                var4:course_id,
                var5:'',
                var6:'',
                var7:'',
                var8:'',
                var9:'',
                var10:'',
  
              }
              //console.log(reqAddSchedule)
              return  this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                {
                  console.log("ma thong bao ",data.mathongbao)
                  //console.log("ma thông báo thêm ",data.mathongbao)
                  if(data.mathongbao==1)
                  {
                    count+=1;
                    this.count+=1;
                    console.log("Thêm thành công" ,attempts)
                    //this.schedule(courses, attempts + 1);
                    this.day_lesson = addDays(this.day_lesson, 1);
                    const reqAddSchedule=
                    {
                      action_id:7,
                      var1:format(this.day_lesson, 'yyyy-MM-dd'),
                      var2:course_id,
                      var3:'',
                      var4:'',
                      var5:'',
                      var6:'',
                      var7:'',
                      var8:'',
                      var9:'',
                      var10:'',
        
                    }
                    //console.log(reqAddSchedule)
                    return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                      {
                        console.log("ma thong bao ",data.mathongbao)
                        if(data.mathongbao==1)
                        {
                                 console.log("ma thong bao ",data.mathongbao)
                          console.log(this.day_lesson)
                          console.log("cộng ngày thành công");
                          this.schedule(courses, attempts-1 );
                          console.log("check ",attempts)
                        }
              
                        return EMPTY;
                      }))
                  }
                 
                  return EMPTY
                }))
             
            }
            else
            {
            
              const reqAddSchedule=
              {
                action_id:2,
                var1:'08:00:00',
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
              return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                {
                  //console.log("ma thông báo check 8h",data.mathongbao)
                  if(data.mathongbao==1)
                  {
                    const reqAddSchedule=
                    {
                      action_id:4,
                      var1:room,
                      var2:format(this.day_lesson, 'yyyy-MM-dd'),
                      var3:'08:00:00',
                      var4:course_id,
                      var5:'',
                      var6:'',
                      var7:'',
                      var8:'',
                      var9:'',
                      var10:'',
        
                    }
                    
                    return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                      {
                        //console.log("ma thông báo thêm ",data.mathongbao)
                        if(data.mathongbao==1)
                        {
                          count+=1;
                          this.count+=1;
                          console.log("Thêm thành công" ,attempts)
                          //this.schedule(courses, attempts + 1);
                          this.day_lesson = addDays(this.day_lesson, 1);
                          const reqAddSchedule=
                          {
                            action_id:7,
                            var1:format(this.day_lesson, 'yyyy-MM-dd'),
                            var2:course_id,
                            var3:'',
                            var4:'',
                            var5:'',
                            var6:'',
                            var7:'',
                            var8:'',
                            var9:'',
                            var10:'',
              
                          }
                          //console.log(reqAddSchedule)
                          return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                            {
                              if(data.mathongbao==1)
                              {
                                console.log(this.day_lesson)
                                console.log("cộng ngày thành công");
                                this.schedule(courses, attempts-1 );
                                console.log("check ",attempts)
                              }
                    
                              return EMPTY;
                            }))
                        }
                       
                        return EMPTY
                      }))
                  }
                  else
                  {
                    const reqAddSchedule=
                    {
                      action_id:5,
                      var1:format(this.day_lesson, 'yyyy-MM-dd'),
                      var2:'08:00:00',
                      var3:'',
                      var4:'',
                      var5:'',
                      var6:'',
                      var7:'',
                      var8:'',
                      var9:'',
                      var10:'',
        
                    }
                    //console.log(reqAddSchedule)
                    return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                      {
                        //console.log("ma thông báo lấy list phòng ",data.mathongbao)
                        if(data.mathongbao==1)
                        {
                          //console.log("list phòng",data.dulieu.table1.length)
                          if(data.dulieu.table1.length!=0)
                          {

                            
                            //console.log("đã vào list còn ")
                            const reqAddSchedule=
                            {
                              action_id:4,
                              var1:data.dulieu.table1[0].room_id,
                              var2:format(this.day_lesson, 'yyyy-MM-dd'),
                              var3:'08:00:00',
                              var4:course_id,
                              var5:'',
                              var6:'',
                              var7:'',
                              var8:'',
                              var9:'',
                              var10:'',
                
                            }
                            return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                              {
                                if(data.mathongbao==1)
                                {
                                  console.log("Thêm thành công" ,attempts)
                                  this.count+=1;
                                  //this.schedule(courses, attempts + 1);
                                  this.day_lesson = addDays(this.day_lesson, 1);
                                  const reqAddSchedule=
                                  {
                                    action_id:7,
                                    var1:format(this.day_lesson, 'yyyy-MM-dd'),
                                    var2:course_id,
                                    var3:'',
                                    var4:'',
                                    var5:'',
                                    var6:'',
                                    var7:'',
                                    var8:'',
                                    var9:'',
                                    var10:'',
                      
                                  }
                                  //console.log(reqAddSchedule)
                                  return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                    {
                                      if(data.mathongbao==1)
                                      {
                                        console.log(this.day_lesson)
                                        console.log("cộng ngày thành công");
                                        this.schedule(courses, attempts-1 );
                                        console.log("check ",attempts)
                                      }
                            
                                      return EMPTY;
                                    }))
                                }
                                return EMPTY;
                              }))
                          }
                          else{
                            //console.log("lst trống")
                            const reqAddSchedule=
                            {
                              action_id:2,
                              var1:'13:00:00',
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
                            return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                              {
                                //console.log("kiểm tra 13h",data.mathongbao)
                                if(data.mathongbao==1)
                                {
                                  const reqAddSchedule=
                                  {
                                    action_id:4,
                                    var1:room,
                                    var2:format(this.day_lesson, 'yyyy-MM-dd'),
                                    var3:'13:00:00',
                                    var4:course_id,
                                    var5:'',
                                    var6:'',
                                    var7:'',
                                    var8:'',
                                    var9:'',
                                    var10:'',
                      
                                  }
                                  return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                    {
                                      if(data.mathongbao==1)
                                      {
                                        count+=1;
                                        this.count+=1;
                                        console.log("Thêm thành công" ,attempts)
                                        //this.schedule(courses, attempts + 1);
                                        this.day_lesson = addDays(this.day_lesson, 1);
                                        const reqAddSchedule=
                                        {
                                          action_id:7,
                                          var1:format(this.day_lesson, 'yyyy-MM-dd'),
                                          var2:course_id,
                                          var3:'',
                                          var4:'',
                                          var5:'',
                                          var6:'',
                                          var7:'',
                                          var8:'',
                                          var9:'',
                                          var10:'',
                            
                                        }
                                        //console.log(reqAddSchedule)
                                        return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                          {
                                            if(data.mathongbao==1)
                                            {
                                              console.log(this.day_lesson)
                                              console.log("cộng ngày thành công");
                                              this.schedule(courses, attempts-1 );
                                              console.log("check ",attempts)
                                            }
                                  
                                            return EMPTY;
                                          }))
                                      
                                      }
                                      return EMPTY;
                                    }))
                                }
                                else
                                {
                                  const reqAddSchedule=
                                  {
                                    action_id:5,
                                    var1:format(this.day_lesson, 'yyyy-MM-dd'),
                                    var2:'13:00:00',
                                    var3:'',
                                    var4:'',
                                    var5:'',
                                    var6:'',
                                    var7:'',
                                    var8:'',
                                    var9:'',
                                    var10:'',
                      
                                  }
                                  return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                    {
                                        if(data.mathongbao==1)
                                        {
                                          if(data.dulieu.table1.length!=0)
                                          {
                                            const reqAddSchedule=
                                            {
                                              action_id:4,
                                              var1:data.dulieu.table1[0].room_id,
                                              var2:format(this.day_lesson, 'yyyy-MM-dd'),
                                              var3:'13:00:00',
                                              var4:course_id,
                                              var5:'',
                                              var6:'',
                                              var7:'',
                                              var8:'',
                                              var9:'',
                                              var10:'',
                                
                                            }
                                            return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                              {
                                                  if(data.mathongbao==1)
                                                  {
                                                    count+=1;
                                                    this.count+=1;
                                                    console.log("Thêm thành công" ,attempts)
                                                    this.day_lesson = addDays(this.day_lesson, 1);
                                                    const reqAddSchedule=
                                                    {
                                                      action_id:7,
                                                      var1:format(this.day_lesson, 'yyyy-MM-dd'),
                                                      var2:course_id,
                                                      var3:'',
                                                      var4:'',
                                                      var5:'',
                                                      var6:'',
                                                      var7:'',
                                                      var8:'',
                                                      var9:'',
                                                      var10:'',
                                        
                                                    }
                                                    //console.log(reqAddSchedule)
                                                    return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                                      {
                                                        if(data.mathongbao==1)
                                                        {
                                                          console.log(this.day_lesson)
                                                          console.log("cộng ngày thành công");
                                                          this.schedule(courses, attempts-1 );
                                                          console.log("check ",attempts)
                                                        }
                                              
                                                        return EMPTY;
                                                      }))
                                                  
                                                    // this.schedule(courses, attempts + 1);
                                                   
                                                  }
                                                  return EMPTY;
                                              }))
                                          }
  
                                          else
                                          {
                                            this.day_lesson = addDays(this.day_lesson, 1);
                                            const reqAddSchedule=
                                            {
                                              action_id:7,
                                              var1:format(this.day_lesson, 'yyyy-MM-dd'),
                                              var2:course_id,
                                              var3:'',
                                              var4:'',
                                              var5:'',
                                              var6:'',
                                              var7:'',
                                              var8:'',
                                              var9:'',
                                              var10:'',
                                
                                            }
                                            //console.log(reqAddSchedule)
                                            return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                              {
                                                if(data.mathongbao==1)
                                                {
                                                  console.log(this.day_lesson)
                                                  console.log("cộng ngày thành công");
                                                  this.schedule(courses, attempts-1 );
                                                  console.log("check ",attempts)
                                                }
                                      
                                                return EMPTY;
                                              }))
                                          
                                            
                                          }
                                          
                                        }
                                    }))
                                }
                              }))
                          }
                        }
                      }))
                  }
                }))
              
            }
       
          })).subscribe(
            response => {
              console.log("Hoàn thành", response);
            },
            error => {
              //this.dialogservice.closeProgressDialog();
              console.error("Lỗi xảy ra:", error);
            },
            () => {
              //console.log("Hoàn thành hàm subscribe");
             
              
             
              
            }
          );
         
           
    }
      
      
      //this.dialogservice.closeProgressDialog();

      //this.getdata()
     
   }

   edit(id:any)
   {
    
    this.dataService.sendData(id);
    this.route.navigateByUrl('admin/editcourse');
   
   }
   delete(id:any)
   {
    const reqDeleteCourse=
    {
      action_id:22,
      var1:id,
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
    this.apiServices.callAPIJson(environment.ApiEndpoint.Course,reqDeleteCourse).subscribe(data=>{
      if(data.mathongbao==1)
      {
         this.sharefunshion.showNotification('top', 'right', 2, data.thongbao);
         this.getdata();
      }
      else
      {
        this.sharefunshion.showNotification('top', 'right', 4, data.thongbao);
      }
    })
   }
  //  getcourse_promtion()
  //  {
   
  //     const reqDN = {
  //       action_id: 6, // Replace 1 with the appropriate action ID for login
  //       vart: "",
  //       varm: "",
  //       var1: "", // Fill in additional parameters if required by the API
  //       var2: "",
  //       var3: "",
  //       var4: "",
  //       var5: "",
  //       var6: "",
  //       var7: "",
  //       var8: ""
  //     };
  //     //const action_id = 3; // Đặt action_id tương ứng với yêu cầu lấy thông tin tài khoản từ API
  
  //     this.apiServices.callAPIJson(environment.ApiEndpoint.Course,reqDN).subscribe(data=>{
  
  //       if(data.mathongbao===1)
  //       {
  //         this.datacoursepromotion = data.dulieu.table1;
         
  //         this.apiResponse = this.data;
  //         console.log("data",this.data)
  //         this.dataSource = new MatTableDataSource<any>(this.data);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
          
  //         this.dataSource = new MatTableDataSource<any>(this.data);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
          
  //       }
        
  //       else
  //       {
  //         alert("Lỗi");
  //       }
  //   });
   
    
  //  }
  
  deleteschedule(courses:any)
  { 
    const reqDeleteSchedule=
    {
      action_id:9,
      var1:courses.course_id,
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
    this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqDeleteSchedule).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.sharefunshion.showNotification('top', 'right', 2,data.thongbao);
          this.getdata()
        }
      })
  }
  openDialog(dialogTemplate: TemplateRef<any>) {
    const dialogRef = this.dialog.open(dialogTemplate, {
      width: '600px', // Điều chỉnh kích thước dialog theo ý muốn
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Xử lý kết quả sau khi dialog đóng
      console.log('Dialog result:', result);
    });
  }
  confirm_add_class(courses:any)
  {
    const reqDeleteSchedule=
    {
      action_id:25,
      var1:courses.course_id,
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
    this.apiServices.callAPIJson(environment.ApiEndpoint.Course,reqDeleteSchedule).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
       
          this.sharefunshion.showNotification("top",'right',2,"Xác nhận lớp thành công")
          this.getdata()
        }
      })
    
  }
  confirm_delete_class(courses:any)
  {
    const reqDeleteSchedule=
    {
      action_id:24,
      var1:courses.course_id,
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
    this.apiServices.callAPIJson(environment.ApiEndpoint.Course,reqDeleteSchedule).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.deleteschedule(courses);
          this.sharefunshion.showNotification("top",'right',2,"Hủy lớp thành công")
          this.getdata()
        }
        
      })
    
  }
  // phan_cong_gv(courses:any)
  // {
  //   console.log(courses)
  //   const reqDeleteSchedule=
  //   {
  //     action_id:12,
  //     var1:courses.course_id,
  //     var2:'',
  //     var3:'',
  //     var4:'',
  //     var5:'',
  //     var6:'',
  //     var7:'',
  //     var8:'',
  //     var9:'',
  //     var10:'',

  //   }
  //   this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqDeleteSchedule).pipe(mergeMap(data=>{
  //     if(data.mathongbao==1)
  //     {
  //       this.listShedule=data.dulieu.table1;
  //       console.log("list schedule",this.listShedule)
  //       for(let listSheduleitem of this.listShedule)
  //       {
  //         console.log("list schedule",listSheduleitem)
  //         const reqDeleteSchedule=
  //         {
  //           action_id:11,
  //           var1:listSheduleitem.day_lesson,
  //           var2:listSheduleitem.time_start,
  //           var3:listSheduleitem.room_id,
  //           var4:courses.specialized_id,
  //           var5:'',
  //           var6:'',
  //           var7:'',
  //           var8:'',
  //           var9:'',
  //           var10:'',
      
  //         }
  //         console.log("test",reqDeleteSchedule)
  //         return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqDeleteSchedule).pipe(mergeMap(data=>
  //           {
  //               console.log("mã thông báo ",data.mathongbao)
  //               if(data.mathongbao==1)
  //               {
  //                 console.log("list",data.dulieu)
  //                 if(data.dulieu.table1.length!=0)
  //                 {
                  
  //                   const reqDeleteSchedule=
  //                   {
  //                     action_id:13,
  //                     var1:data.dulieu.table1[0].teacher_id,
  //                     var2:listSheduleitem.schedule_id,
  //                     var3:'',
  //                     var4:'',
  //                     var5:'',
  //                     var6:'',
  //                     var7:'',
  //                     var8:'',
  //                     var9:'',
  //                     var10:'',
                
  //                   }
  //                   console.log("mtb",reqDeleteSchedule)
  //                   return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqDeleteSchedule).pipe(mergeMap(data=>
  //                     {
  //                       console.log("mtb",data.mathongbao)
  //                       if(data.mathongbao==1)
  //                       {
  //                         this.sharefunshion.showNotification("top","right",2,"Phân công giảng viên thành công ");
  //                         return EMPTY;
  //                       }
                        
  //                     }))
  //                 }
  //                 else
  //                 {
  //                   this.sharefunshion.showNotification("top","right",2,"không đủ nhân sự ");
  //                 }
  //               }
                
  //           }))
  //       }
  //     }
     
  //   })).subscribe()
  // }
  
phan_cong_gv(courses: any) {
  console.log(courses);
  this.dialogservice.openProgressDialog()
  const reqDeleteSchedule = {
    action_id: 12,
    var1: courses.course_id,
    var2: '',
    var3: '',
    var4: '',
    var5: '',
    var6: '',
    var7: '',
    var8: '',
    var9: '',
    var10: '',
  };

  this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule, reqDeleteSchedule).pipe(
    mergeMap(data => {
      if (data.mathongbao == 1) {
        this.listShedule = data.dulieu.table1;
        console.log("list schedule", this.listShedule);

        const deleteRequests = this.listShedule.map(listSheduleitem => {
          console.log("list schedule", listSheduleitem);

          const reqDeleteSchedule = {
            action_id: 11,
            var1: listSheduleitem.day_lesson,
            var2: listSheduleitem.time_start,
            var3: '',
            var4: courses.specialized_id,
            var5: '',
            var6: '',
            var7: '',
            var8: '',
            var9: '',
            var10: '',
          };

          console.log("test", reqDeleteSchedule);

          return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule, reqDeleteSchedule).pipe(
            mergeMap(data => {
              console.log("mã thông báo ", data.mathongbao);

              if (data.mathongbao == 1) {
                console.log("list", data.dulieu);

                if (data.dulieu.table1.length != 0) {
                  const reqDeleteSchedule = {
                    action_id: 13,
                    var1: data.dulieu.table1[0].teacher_id,
                    var2: listSheduleitem.schedule_id,
                    var3: '',
                    var4: '',
                    var5: '',
                    var6: '',
                    var7: '',
                    var8: '',
                    var9: '',
                    var10: '',
                  };

                  console.log("mtb", reqDeleteSchedule);

                  return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule, reqDeleteSchedule).pipe(
                    map(data => {
                      console.log("mtb", data.mathongbao);
                      if (data.mathongbao == 1) {
                        
                        this.sharefunshion.showNotification("top", "right", 2, "Phân công giảng viên thành công ");
                       
                      }
                    })
                  );
                } else {
               
                  this.sharefunshion.showNotification("top", "right", 3, "Không đủ nhân sự ");
                  this.dialogservice.closeProgressDialog()
                 
                }
              }
            })
          );
        });

        return forkJoin(deleteRequests);
      }
    })
  ).subscribe(() => {
    
    console.log('All requests completed');
    this.dialogservice.closeProgressDialog()
  });
}
  gan_bien(courses:any)
  {
    
    this.day_lesson=new Date(courses.time_start_course);
    this.courses=courses;
  }
  cancelAddScheduleForm()
  {
    this.day_lesson=null;
    this.add_schedule_form.reset();
    this.dialog.closeAll();
  }

  cancelPromotionForm()
  {
    
    this.promotion_form.reset();
    this.dialog.closeAll();
  }
  sub_promotion()
  {
    const reqDeleteSchedule = {
      action_id: 26,
      var1: this.courses_promotion.course_id,
      var2: this.promotion_form.get('rate_promotion')?.value,
      var3: '',
      var4: '',
      var5: '',
      var6: '',
      var7: '',
      var8: '',
      var9: '',
      var10: '',
    }
    console.log(reqDeleteSchedule)
    this.apiServices.callAPIJson(environment.ApiEndpoint.Course,reqDeleteSchedule).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.sharefunshion.showNotification("top","right",2,"Áp dụng giảm giá thành công ")
          
          this.getdata();
        }
        else
        {
          console.log("Lỗi ");
        }
        this.cancelPromotionForm();
      })
  }
  edit_promotion(course:any)
  {
    this.courses_promotion=course;

  }
  remove_promotion(courses:any)
  {
    const reqDeleteSchedule = {
      action_id: 27,
      var1: courses.course_id,
      var2: '',
      var3: '',
      var4: '',
      var5: '',
      var6: '',
      var7: '',
      var8: '',
      var9: '',
      var10: '',
    }
    console.log(reqDeleteSchedule)
    this.apiServices.callAPIJson(environment.ApiEndpoint.Course,reqDeleteSchedule).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.sharefunshion.showNotification("top","right",2,"Xóa giảm giá thành công ")
          
          this.getdata();
        }
        else
        {
          console.log("Lỗi ");
        }
        this.cancelPromotionForm();
      })
  }
  ngOnInit(): void {
    

   this.getdata();
   this.add_schedule_form = this.fb.group({
    total_day: ['', Validators.required],
    hourly_rate:['', Validators.required],
    space_day:['', Validators.required],
    });
    this.promotion_form = this.fb.group({
      rate_promotion: ['', Validators.required],
     
      });
  }

}
