import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions,EventDropArg, EventClickArg, EventInput } from '@fullcalendar/core';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, concatMap } from 'rxjs';
import { SharefunshionService } from 'app/services/sharefunshion.service';
import { Router } from '@angular/router';
import interactionPlugin from '@fullcalendar/interaction'; 
import { el } from 'date-fns/locale';
import { Location } from '@angular/common';
//import interactionPlugin from '@fullcalendar/interaction';
// interface CustomCalendarOptions extends CalendarOptions {
//   eventDrop?: (info: any) => void;
// }
@Component({
  selector: 'app-schedule-manager',
  templateUrl: './schedule-manager.component.html',
  styleUrls: ['./schedule-manager.component.scss']
})

export class ScheduleManagerComponent implements OnInit {
  @ViewChild('dialogTemplateScheduleForm') dialogTemplateScheduleForm: TemplateRef<any>;
  schedule_infor_form:FormGroup
  schedule_infor:any;
  listteacher:any[]=[];
  inforschedule_after_drag:any;
  edit_room_affterdrag:any; 
  //dialogTemplateScheduleForm: TemplateRef<any>; 
  selectedEvent: any;
  formattedEvents:any;
  listschedule:any[]=[];
  calendarOptions: CalendarOptions;
  selectTeacher:any;
  check_drab:any;
  eventsPromise: Promise<EventInput[]>;
  constructor(private dialog:MatDialog,
    private apiservice:ApiServices,
    private formBuilder:FormBuilder,
    private sharefunshion:SharefunshionService,
    private route:Router,
    private location: Location) { }

    handleEventDrop(eventInfo: any) {
      // Xử lý khi sự kiện được kéo và thả
      //console.log('Sự kiện được kéo và thả:', eventInfo.event.extendedProps.schedule_id);
      const newDate = eventInfo.event.start;
      const formattedDate = newDate.toISOString().split('T')[0];
      this.get_schedule_affter_drag(eventInfo.event.extendedProps.schedule_id,formattedDate)
      // Chuyển đổi thành chuỗi có định dạng "YYYY-MM-DD"
      console.log("check",this.check_drab)
      // if(this.check_drab==false)
      // {
      //   eventInfo.revert();
      // }
    
      

      // In ra console để kiểm tra
      

      

      console.log('Ngày mới đã được chuyển đổi:', formattedDate);
      //eventInfo.revert();
      // Thực hiện các thao tác cập nhật dữ liệu tại đây
    }
    handleEventDragStop(eventInfo: any) {
      console.log('Sự kiện được kéo dừng:', eventInfo.event.start);
      // Thực hiện các thao tác sau khi sự kiện được kéo dừng
    }
    handleEventClick(arg: EventClickArg) {
      console.log("thong tin",arg.event.extendedProps.schedule_id)
      //alert('Event click! ' + arg.event);
        this.get_information_schedule(arg.event.extendedProps.schedule_id)
        // this.selectedEvent = arg.event.extendedProps; // Lưu thông tin sự kiện được chọn
        // console.log(this.selectedEvent)
        console.log("Dialog template:", this.dialogTemplateScheduleForm); 
        this.openDialog(this.dialogTemplateScheduleForm);
    }
    edit(schedule: any): void {

      
      console.log(schedule)
      // Set the form values with the selectedTaiKhoan data
      this.schedule_infor_form.patchValue({
        schedule_id:schedule.schedule_id,
        selectedOption :schedule.teacher_id,
      });
      

    }
    onSelectTeacher(event:any)
    {
      this.selectTeacher=event.value
    }
    get_list_teacher(schedule:any)
    {
      const reqAddSchedule=
      {
        action_id:16,
        var1:schedule.day_lesson,
        var2:schedule.time_start,
        var3:schedule.room_id,
        var4:"",
        var5:'',
        var6:'',
        var7:'',
        var8:'',
        var9:'',
        var10:'',
  
      }
      this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>{
        if(data.mathongbao==1)
        {
          
          const reqAddSchedule=
          {
            action_id:17,
            var1:schedule.teacher_id,
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
          this.listteacher =data.dulieu.table1;
          return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
            {
              if(data.mathongbao==1)
              {
                const teacher =data.dulieu.table1[0];
                if(teacher!=null)
                {
                  this.listteacher.push(teacher)
                console.log("list giảng viên",this.listteacher)
                }
                
              }
              else
              {
                console.log("Lỗi")
              }
              return EMPTY
            }))
        }
        else{
          console.log("lỗi")
        }
      })).subscribe()
    }
    get_information_schedule(schedule_id:any)
    {
      const reqAddSchedule=
      {
        action_id:14,
        var1:schedule_id,
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
      console.log("truyền vào",reqAddSchedule)
      this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).subscribe(data=>
        {
          console.log("matb",data.mathongbao)
          if(data.mathongbao==1)
          {
            console.log("da chay vào đây")
            this.schedule_infor=data.dulieu.table1[0];
            console.log("da chay vào đây",this.schedule_infor)
            this.edit(this.schedule_infor)
            this.get_list_teacher(this.schedule_infor)
            console.log("thong tinh buoi dạy", this.schedule_infor)
          }
          else
          {
            console.log("thong tinh buoi dạy thất bại", this.schedule_infor)
          }
        })
    }
    openDialog(dialogTemplate: TemplateRef<any>) {
      const dialogRef = this.dialog.open(dialogTemplate, {
        width: '600px', // Điều chỉnh kích thước dialog theo ý muốn
        height: '500px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        // Xử lý kết quả sau khi dialog đóng
        console.log('Dialog result:', result);
      });
    }
    chay()
    {
      console.log("kiểm tra list",    this.formattedEvents)
      this.calendarOptions = {
        droppable: true,
        editable: true,
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin,interactionPlugin],
        events:
      // [
  
      //   {title: 'Event 417', date: '2023-11-28T00:00:00', description: 'mô tả 417', ca: 'ca 417'}
      // ],
   
     this.formattedEvents,
     
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    //eventDragStop:this.handleEventDragStop.bind(this)
  } ;
    }
     getlistschedule()
    {
      
      const reqAddSchedule=
      {
        action_id:8,
        var1:"",
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
      return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).subscribe(data=>
        {
          if(data.mathongbao==1)
          {
            this.listschedule=data.dulieu.table1;
            console.log(this.listschedule)
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
              if(schedule.teacher_id!=null)
              {
                return {
                  title: `${schedule.room_name}`,
                  date: dateTime,
                  schedule_id:schedule.schedule_id,
  
                };
              }
              else
              {
                return {
                  title: `${schedule.room_name}${' Chưa có gv'}` ,
                  date: dateTime,
                  schedule_id:schedule.schedule_id,
  
                };
              }
            
            });
            console.log(this.formattedEvents)
             
               
          }
        this.chay();
        })
    }
    get_schedule_affter_drag(schedule_id:any,newdate:any)
    {
      const reqAddSchedule=
      {
        action_id:14,
        var1:schedule_id,
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
      
      this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
        {
          if(data.mathongbao==1)
          {
          
            this.inforschedule_after_drag=data.dulieu.table1[0];
            console.log(this.inforschedule_after_drag)
            if(this.inforschedule_after_drag.time_start=='08:00:00')
            {
              const reqAddSchedule=
              {
                action_id:22,
                var1:this.inforschedule_after_drag.teacher_id,
                var2:newdate,
                var3:this.inforschedule_after_drag.time_start,
                var4:"",
                var5:'',
                var6:'',
                var7:'',
                var8:'',
                var9:'',
                var10:'',
          
              }
              console.log(reqAddSchedule)
              return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                {
                  if(data.mathongbao==1)
                  {
                      console.log("không có lịch")

                      const reqAddSchedule=
                      {
                        action_id:23,
                        var1:newdate,
                        var2:this.inforschedule_after_drag.time_start,
                        var3:"",
                        var4:"",
                        var5:'',
                        var6:'',
                        var7:'',
                        var8:'',
                        var9:'',
                        var10:'',
                  
                      }
                      return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                        {
                          console.log("matb",data.mathongbao)
                          if(data.mathongbao==1)
                          {
                            if(data.dulieu.table1.length!=0)
                            {
                              console.log("đã chạy vào đây")
                              this.edit_room_affterdrag=data.dulieu.table1[0]; 
                              const reqAddSchedule=
                              {
                                action_id:24,
                                var1:newdate,
                                var2:this.inforschedule_after_drag.time_start,
                                var3:this.edit_room_affterdrag.room_id,
                                var4:this.inforschedule_after_drag.schedule_id,
                                var5:'',
                                var6:'',
                                var7:'',
                                var8:'',
                                var9:'',
                                var10:'',
                          
                              }
                              console.log("đã chạy vào đây",reqAddSchedule)
                              //console.log("list phòng",data.dulieu.table1)
                              return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                {
                                  console.log("matb",data.mathongbao)
                                  if(data.mathongbao==1)
                                  {
                                    this.check_drab=true
                                    this.sharefunshion.showNotification("top","right",2,data.thongbao)
                                    this.reloadPage()
                                    
                                  }
                                  else
                                  {
                                    console.log("Lỗi")
                                  }
                                  return EMPTY
                                }))
                            }
                            else
                            {
                              this.inforschedule_after_drag.time_start='13:00:00'
                              if(this.inforschedule_after_drag.time_start=='13:00:00')
                              {
                                const reqAddSchedule=
                                {
                                  action_id:22,
                                  var1:this.inforschedule_after_drag.teacher_id,
                                  var2:newdate,
                                  var3:this.inforschedule_after_drag.time_start,
                                  var4:"",
                                  var5:'',
                                  var6:'',
                                  var7:'',
                                  var8:'',
                                  var9:'',
                                  var10:'',
                            
                                }
                                console.log("matb",data.mathongbao)
                                return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                  {
                                    if(data.mathongbao==1)
                                    {
                                      const reqAddSchedule=
                                      {
                                        action_id:23,
                                        var1:newdate,
                                        var2:this.inforschedule_after_drag.time_start,
                                        var3:"",
                                        var4:"",
                                        var5:'',
                                        var6:'',
                                        var7:'',
                                        var8:'',
                                        var9:'',
                                        var10:'',
                                  
                                      }
                                      return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                        {
                                          if(data.mathongbao==1)
                                          {
                                            if(data.dulieu.table1.length!=0)
                                            {
                                              this.edit_room_affterdrag=data.dulieu.table1[0]; 
                                              const reqAddSchedule=
                                              {
                                                action_id:24,
                                                var1:newdate,
                                                var2:this.inforschedule_after_drag.time_start,
                                                var3:this.edit_room_affterdrag.room_id,
                                                var4:this.inforschedule_after_drag.schedule_id,
                                                var5:'',
                                                var6:'',
                                                var7:'',
                                                var8:'',
                                                var9:'',
                                                var10:'',
                                          
                                              }
                                              
                                              //console.log("list phòng",data.dulieu.table1)
                                              return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                                {
                                                  if(data.mathongbao==1)
                                                  {
                                                    this.sharefunshion.showNotification("top","right",2,data.thongbao)
                                                    this.reloadPage()
                                                    this.check_drab=true
                                                  }
                                                  else
                                                  {
                                                    console.log("Lỗi")
                                                  }
                                                  return EMPTY
                                                }))
                                            }
                                            else
                                            {
                                              this.check_drab=false
                                              this.sharefunshion.showNotification("top","right",4,"Không đủ phòng trống")
                                              this.reloadPage()
                                              
                                            }
                                          }
                                        }))
                                    }
                                    else
                                    {
                                      this.check_drab=false
                                      this.sharefunshion.showNotification("top","right",4,"Lịch của giảng viên đã kín")
                                      this.reloadPage()
                                      
                                    }
                                  }))
                              }
                            }
                          }
                          else{
                            console.log("Lỗi")
                          }
                          return EMPTY
                        }))
                  }
                  else if(data.mathongbao==-1)
                  {
                    this.inforschedule_after_drag.time_start='13:00:00'
                    if(this.inforschedule_after_drag.time_start=='13:00:00')
                    {
                      const reqAddSchedule=
                      {
                        action_id:22,
                        var1:this.inforschedule_after_drag.teacher_id,
                        var2:newdate,
                        var3:this.inforschedule_after_drag.time_start,
                        var4:"",
                        var5:'',
                        var6:'',
                        var7:'',
                        var8:'',
                        var9:'',
                        var10:'',
                  
                      }
                      console.log("matb",data.mathongbao)
                      return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                        {
                          if(data.mathongbao==1)
                          {
                            const reqAddSchedule=
                            {
                              action_id:23,
                              var1:newdate,
                              var2:this.inforschedule_after_drag.time_start,
                              var3:"",
                              var4:"",
                              var5:'',
                              var6:'',
                              var7:'',
                              var8:'',
                              var9:'',
                              var10:'',
                        
                            }
                            return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                              {
                                if(data.mathongbao==1)
                                {
                                  if(data.dulieu.table1.length!=0)
                                  {
                                    this.edit_room_affterdrag=data.dulieu.table1[0]; 
                                    const reqAddSchedule=
                                    {
                                      action_id:24,
                                      var1:newdate,
                                      var2:this.inforschedule_after_drag.time_start,
                                      var3:this.edit_room_affterdrag.room_id,
                                      var4:this.inforschedule_after_drag.schedule_id,
                                      var5:'',
                                      var6:'',
                                      var7:'',
                                      var8:'',
                                      var9:'',
                                      var10:'',
                                
                                    }
                                    
                                    //console.log("list phòng",data.dulieu.table1)
                                    return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                      {
                                        console.log("matb",data.mathongbao)
                                        if(data.mathongbao==1)
                                        {
                                          this.check_drab=true
                                          this.sharefunshion.showNotification("top","right",2,data.thongbao)
                                          this.reloadPage()
                                         
                                          
                                        }
                                        else
                                        {
                                          console.log("Lỗi")
                                        }
                                        return EMPTY;
                                      }
                                       
                                      ))
                                  }
                                  else
                                  {
                                    this.check_drab=false
                                    this.sharefunshion.showNotification("top","right",4,"Không đủ phòng trống")
                                    this.reloadPage()
                                    
                                  }
                                 
                                }
                              }))
                          }
                          else
                          {
                            this.check_drab=false
                            console.log("đã hạy vào đây")
                            this.sharefunshion.showNotification("top","right",4,"Lịch của giảng viên đã kín")
                            this.reloadPage()
                          
                          }
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
            else if(this.inforschedule_after_drag.time_start=='13:00:00')
            {
              const reqAddSchedule=
              {
                action_id:22,
                var1:this.inforschedule_after_drag.teacher_id,
                var2:newdate,
                var3:this.inforschedule_after_drag.time_start,
                var4:"",
                var5:'',
                var6:'',
                var7:'',
                var8:'',
                var9:'',
                var10:'',
          
              }
              console.log(reqAddSchedule)
              return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                {
                  if(data.mathongbao==1)
                  {
                      console.log("không có lịch")

                      const reqAddSchedule=
                      {
                        action_id:23,
                        var1:newdate,
                        var2:this.inforschedule_after_drag.time_start,
                        var3:"",
                        var4:"",
                        var5:'',
                        var6:'',
                        var7:'',
                        var8:'',
                        var9:'',
                        var10:'',
                  
                      }
                      return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                        {
                          console.log("matb",data.mathongbao)
                          if(data.mathongbao==1)
                          {
                            if(data.dulieu.table1.length!=0)
                            {
                              console.log("đã chạy vào đây")
                              this.edit_room_affterdrag=data.dulieu.table1[0]; 
                              const reqAddSchedule=
                              {
                                action_id:24,
                                var1:newdate,
                                var2:this.inforschedule_after_drag.time_start,
                                var3:this.edit_room_affterdrag.room_id,
                                var4:this.inforschedule_after_drag.schedule_id,
                                var5:'',
                                var6:'',
                                var7:'',
                                var8:'',
                                var9:'',
                                var10:'',
                          
                              }
                              console.log("đã chạy vào đây",reqAddSchedule)
                              //console.log("list phòng",data.dulieu.table1)
                              return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                {
                                  console.log("matb",data.mathongbao)
                                  if(data.mathongbao==1)
                                  {
                                    this.check_drab=true
                                    this.sharefunshion.showNotification("top","right",2,data.thongbao)
                                    this.reloadPage()
                                    
                                  }
                                  else
                                  {
                                    console.log("Lỗi")
                                  }
                                  return EMPTY
                                }))
                            }
                            else
                            {
                              this.inforschedule_after_drag.time_start='08:00:00'
                              if(this.inforschedule_after_drag.time_start=='08:00:00')
                              {
                                const reqAddSchedule=
                                {
                                  action_id:22,
                                  var1:this.inforschedule_after_drag.teacher_id,
                                  var2:newdate,
                                  var3:this.inforschedule_after_drag.time_start,
                                  var4:"",
                                  var5:'',
                                  var6:'',
                                  var7:'',
                                  var8:'',
                                  var9:'',
                                  var10:'',
                            
                                }
                                console.log("matb",data.mathongbao)
                                return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                  {
                                    if(data.mathongbao==1)
                                    {
                                      const reqAddSchedule=
                                      {
                                        action_id:23,
                                        var1:newdate,
                                        var2:this.inforschedule_after_drag.time_start,
                                        var3:"",
                                        var4:"",
                                        var5:'',
                                        var6:'',
                                        var7:'',
                                        var8:'',
                                        var9:'',
                                        var10:'',
                                  
                                      }
                                      return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                        {
                                          console.log("matb",data.mathongbao)
                                          if(data.mathongbao==1)
                                          {
                                            if(data.dulieu.table1.length!=0)
                                            {
                                              this.edit_room_affterdrag=data.dulieu.table1[0]; 
                                              const reqAddSchedule=
                                              {
                                                action_id:24,
                                                var1:newdate,
                                                var2:this.inforschedule_after_drag.time_start,
                                                var3:this.edit_room_affterdrag.room_id,
                                                var4:this.inforschedule_after_drag.schedule_id,
                                                var5:'',
                                                var6:'',
                                                var7:'',
                                                var8:'',
                                                var9:'',
                                                var10:'',
                                          
                                              }
                                              
                                              //console.log("list phòng",data.dulieu.table1)
                                              return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                                {
                                                  console.log("matb",data.mathongbao)
                                                  if(data.mathongbao==1)
                                                  {
                                                    this.check_drab=true
                                                    this.sharefunshion.showNotification("top","right",2,data.thongbao)
                                                    this.reloadPage()
                                                    
                                                  }
                                                  else
                                                  {
                                                    console.log("Lỗi")
                                                  }
                                                  return EMPTY
                                                }))
                                            }
                                            else
                                            {
                                              this.check_drab=false
                                              this.sharefunshion.showNotification("top","right",4,"Không đủ phòng trống")
                                              this.reloadPage()
                                              
                                            }
                                          }
                                        }))
                                    }
                                    else
                                    {
                                      this.check_drab=false
                                      this.sharefunshion.showNotification("top","right",4,"Lịch của giảng viên đã kín")
                                      this.reloadPage()
                                     
                                    }
                                  }))
                              }
                            }
                          }
                          else{
                            console.log("Lỗi")
                          }
                          return EMPTY
                        }))
                  }
                  else if(data.mathongbao==-1)
                  {
                    this.inforschedule_after_drag.time_start='08:00:00'
                    if(this.inforschedule_after_drag.time_start=='08:00:00')
                    {
                      const reqAddSchedule=
                      {
                        action_id:22,
                        var1:this.inforschedule_after_drag.teacher_id,
                        var2:newdate,
                        var3:this.inforschedule_after_drag.time_start,
                        var4:"",
                        var5:'',
                        var6:'',
                        var7:'',
                        var8:'',
                        var9:'',
                        var10:'',
                  
                      }
                
                      return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                        {
                          console.log("matb",data.mathongbao)
                          if(data.mathongbao==1)
                          {
                            const reqAddSchedule=
                            {
                              action_id:23,
                              var1:newdate,
                              var2:this.inforschedule_after_drag.time_start,
                              var3:"",
                              var4:"",
                              var5:'',
                              var6:'',
                              var7:'',
                              var8:'',
                              var9:'',
                              var10:'',
                        
                            }
                            return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                              {
                                console.log("matb",data.mathongbao)
                                if(data.mathongbao==1)
                                {
                                  if(data.dulieu.table1.length!=0)
                                  {
                                    console.log("Chạy vào đây")
                                    this.edit_room_affterdrag=data.dulieu.table1[0]; 
                                    const reqAddSchedule=
                                    {
                                      action_id:24,
                                      var1:newdate,
                                      var2:this.inforschedule_after_drag.time_start,
                                      var3:this.edit_room_affterdrag.room_id,
                                      var4:this.inforschedule_after_drag.schedule_id,
                                      var5:'',
                                      var6:'',
                                      var7:'',
                                      var8:'',
                                      var9:'',
                                      var10:'',
                                
                                    }
                                    
                                    console.log("list phòng",reqAddSchedule)
                                    
                                    return this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).pipe(concatMap(data=>
                                      {
                                        console.log("matb",data.mathongbao)
                                        if(data.mathongbao==1)
                                        {
                                          this.check_drab=true
                                          this.sharefunshion.showNotification("top","right",2,data.thongbao)
                                          this.reloadPage()
                                        
                                          
                                        }
                                        else
                                        {
                                          console.log("Lỗi")
                                        }
                                        return EMPTY;
                                      }
                                       
                                      ))
                                  }
                                  else
                                  {
                                    this.check_drab=false
                                    console.log("không đủ phòng ")
                                    this.sharefunshion.showNotification("top","right",4,"Không đủ phòng trống")
                                    this.reloadPage()
                                    
                                  }
                                }
                              }))
                          }
                          else if(data.mathongbao==-1)
                          {
                            this.check_drab=false
                            this.sharefunshion.showNotification("top","right",4,"Lịch của giảng viên đã kín")
                            this.reloadPage()
                            
                          }
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
            
          }
          else
          {
            console.log("thong tinh buoi dạy thất bại", this.schedule_infor)
          }
          return EMPTY;
        })).subscribe(data=>
        {
     
        
        })
    }
    edit_schedule()
    {
      const reqAddSchedule=
      {
        action_id:18,
        var1:this.schedule_infor_form.get('schedule_id')?.value,
        var2:this.selectTeacher,
        var3:"",
        var4:"",
        var5:'',
        var6:'',
        var7:'',
        var8:'',
        var9:'',
        var10:'',
  
      }
      this.apiservice.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).subscribe(data=>
        {
          if(data.mathongbao==1)
          {
            this.canclescheduleform()
            this.sharefunshion.showNotification("top","right",2,data.thongbao)
            this.route.navigate(['admin/schedule-manager']);
          }
          else{
            this.sharefunshion.showNotification("top","right",4,data.thongbao)
          }
        })
    }
    reloadPage(): void {
      console.log("Đã load")
      window.location.reload();
      //this.route.navigate(['admin/schedule-manager']);
    }
  
    canclescheduleform()
    {
      this.selectTeacher=null
      this.schedule_infor_form.reset()
      this.dialog.closeAll();
    }
    ngOnInit(): void {
      //this.dialogTemplateScheduleForm = this.dialogTemplateScheduleForm;
      this.schedule_infor_form = this.formBuilder.group({
        schedule_id: ['', Validators.required],
        selectedOption: [null, Validators.required],
      });
      this.getlistschedule();
    
      this.chay();
      // Kết hợp ngày và giờ thành chuỗi đầy đủ
      // const ngayGioDayDu = ngayTrongChuoi + ' ' + gioThemVao;
      //     const enventdata= [
      //       { title: 'Event 1', date: ngayGioDayDu ,description:'mô tả',ca:'ss'},
      //       { title: 'Event 2', date: '2023-11-09T00:00:00' ,description:'mô tả2',ca:'aa'},
      //       { title: 'Event 3', date: '2023-11-09' ,description:'mô tả3',ca:'cc'},
      //       { title: 'Event 2', date: '2023-11-10' ,description:'mô tả',ca:'tt'},
            
      //       // Thêm sự kiện của bạn vào đây
      //     ]
      //this.chay();
      console.log("data",this.formattedEvents)
    }
  

}
