import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { DataService } from 'app/services/data.service';
import { DialogService } from 'app/services/dialog-service.service';
import { SharefunshionService } from 'app/services/sharefunshion.service';
import dayGridPlugin from '@fullcalendar/daygrid';
@Component({
  selector: 'app-schedule-client',
  templateUrl: './schedule-client.component.html',
  styleUrls: ['./schedule-client.component.scss']
})
export class ScheduleClientComponent implements OnInit {
  @ViewChild('dialogTemplateScheduleForm') dialogTemplateScheduleForm: TemplateRef<any>;
  calendarOptions: CalendarOptions;
  eventsPromise: Promise<EventInput[]>;
  formattedEvents:any;
  listschedule:any[]=[];
  schedule_infor:any
  schedule_infor_form:FormGroup;
  constructor(private dialogservice:DialogService,
    private fb: FormBuilder,
    private apiServices: ApiServices ,
    private dataService:DataService,
    private route:Router,
    private sharefunshion:SharefunshionService,
    private dialog:MatDialog,) { }
    handleEventClick(arg: EventClickArg) {
      console.log("thong tin",arg.event.extendedProps.schedule_id)
      //alert('Event click! ' + arg.event);
      this.get_information_schedule(arg.event.extendedProps.schedule_id)
      this.openDialog(this.dialogTemplateScheduleForm);
    }
    openDialog(dialogTemplate: TemplateRef<any>) {
      const dialogRef = this.dialog.open(dialogTemplate, {
        width: '600px', // Điều chỉnh kích thước dialog theo ý muốn
        height: '350px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        // Xử lý kết quả sau khi dialog đóng
        console.log('Dialog result:', result);
      });
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
      this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule,reqAddSchedule).subscribe(data=>
        {

          if(data.mathongbao==1)
          {

            this.schedule_infor=data.dulieu.table1[0];
     
          }
          else
          {
            console.log("thong tinh buoi dạy thất bại", this.schedule_infor)
          }
        })
    }
    getlistschedule()
    {
      
      const reqAddSchedule=
      {
        action_id:5,
        var1:localStorage.getItem('client_id'),
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
      return this.apiServices.callAPIJson(environment.ApiEndpoint.Schedule_client,reqAddSchedule).subscribe(data=>
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
    canclescheduleform()
    {
    
      this.schedule_infor_form.reset()
      this.dialog.closeAll();
    }
    chay()
    {
      console.log("kiểm tra list",    this.formattedEvents)
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        events:
      // [
  
      //   {title: 'Event 417', date: '2023-11-28T00:00:00', description: 'mô tả 417', ca: 'ca 417'}
      // ],
   
     this.formattedEvents,
     
    eventClick: this.handleEventClick.bind(this),
    
  };
    }
  ngOnInit(): void {
      this.getlistschedule()
      this.chay();
      this.schedule_infor_form = this.fb.group({
        schedule_id: ['', Validators.required],
       
      });
  }

}
