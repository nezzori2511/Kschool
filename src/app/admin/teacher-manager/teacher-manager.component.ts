import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { an } from '@fullcalendar/core/internal-common';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { DataService } from 'app/services/data.service';
import { DialogService } from 'app/services/dialog-service.service';
import { SharefunshionService } from 'app/services/sharefunshion.service';
import { el } from 'date-fns/locale';
import * as e from 'express';
import { format } from 'date-fns';
@Component({
  selector: 'app-teacher-manager',
  templateUrl: './teacher-manager.component.html',
  styleUrls: ['./teacher-manager.component.scss']
})
export class TeacherManagerComponent implements OnInit {
  list_detail_salary:any;
  firstDayOfMonth:any;
  lastDayOfMonth:any;
  campaignOne: FormGroup;
  campaignTwo:FormGroup;
  selectspecialized_edit:any;
  selectcheck:any=0;
  dataSource:MatTableDataSource<any>;
  dataSourceSalary:MatTableDataSource<any>;
  dataSourceTableSalary:MatTableDataSource<any>;
  teacher:any;
  teacher_salary:any;
  teacher_salary_table:any
  data:any;
  data2:any;
  teacher_edit:any;
  selectspecialized:any;
  listspecailized:any[]=[]
  addteacher_form:FormGroup;
  editteacher_form:FormGroup;
  displayedColumnsCourseOpenning: string[] = ['teacher_id','teacher_name', 'teacher_describe','specialized_name','actions'];
  displayedColumnsTeacherSalaryTable: string[] = ['teacher_id','teacher_name', 'name','day_lesson','hourly_rate'];
  displayedColumnsSalaryTeacher: string[] = ['teacher_id','teacher_name','lesson_count','total_earning','actions'];
  @ViewChild('firstsort') firstsort!: MatSort
  @ViewChild('secondsort') secondsort!: MatSort;
  @ViewChild('thirdsort') thirdsort!: MatSort;

  
  @ViewChild('firstPaginator') firstPaginator: MatPaginator;
  @ViewChild('secondPaginator') secondPaginator: MatPaginator;
  @ViewChild('thirdPaginator') thirdPaginator: MatPaginator;
  constructor(private dialogservice:DialogService,
    private fb: FormBuilder,
    private apiServices: ApiServices ,
    private dataService:DataService,
    private route:Router,
    private sharefunshion:SharefunshionService,
    private dialog:MatDialog,) { }
    getdata_salaty_teacher()
    {
     
        const reqDN = {
          action_id: 8, // Replace 1 with the appropriate action ID for login
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
        this.apiServices.callAPIJson(environment.ApiEndpoint.Teacher_management,reqDN).subscribe(data=>
          {
            if(data.mathongbao==1)
            {
              this.data2 = data.dulieu.table1;
        
              //this.data2 = [...this.data];
              //  this.apiResponse = this.data;
              console.log("data2 ",data.dulieu.table1)
              this.dataSourceSalary = new MatTableDataSource<any>(this.data2);
              this.dataSourceSalary.paginator = this.secondPaginator;
              this.dataSourceSalary.sort = this.secondsort;
              this.dataSourceSalary.connect();
            }
            else
            {
              console.log("Lỗi")
            }
          })
      
    
      
    }
    // onSelectCheck(event:any)
    // {
    //   this.selectcheck=event.value
    //   this.getdata_salaty_teacher()
    // }
  getdata()
  {
    const reqDN = {
      action_id: 1, // Replace 1 with the appropriate action ID for login
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

    this.apiServices.callAPIJson(environment.ApiEndpoint.Teacher_management,reqDN).subscribe(data=>{

      if(data.mathongbao===1)
      {
        this.data = data.dulieu.table1;
      
        //this.data2 = [...this.data];
        //  this.apiResponse = this.data;
        console.log("data",this.data)
        this.dataSource = new MatTableDataSource<any>(this.data);
        this.dataSource.paginator = this.firstPaginator;
        this.dataSource.sort = this.firstsort;
        this.dataSource.connect();
        

      

      }
      
      else
      {
        alert("Lỗi");
      }
  });
 
  }
  getlist_specialized()
  {
    const reqDN = {
      action_id: 3, // Replace 1 with the appropriate action ID for login
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
    this.apiServices.callAPIJson(environment.ApiEndpoint.Teacher_management,reqDN).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.listspecailized=data.dulieu.table1;
          console.log(this.listspecailized)
        }
      })
  }
  openDialog(dialogTemplate: TemplateRef<any>) {
    const dialogRef = this.dialog.open(dialogTemplate, {
      width: '900px', // Điều chỉnh kích thước dialog theo ý muốn
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Xử lý kết quả sau khi dialog đóng
      console.log('Dialog result:', result);
    });
  }

  
  addteacher_sub()
  {
    if(this.addteacher_form.get('password1')?.value==this.addteacher_form.get('password2')?.value)
    {
      const reqDN = {
        action_id: 4, // Replace 1 with the appropriate action ID for login
        vart: this.addteacher_form.get('username')?.value,
        varm: this.addteacher_form.get('password1')?.value,
        var1: this.addteacher_form.get('fisrt_name')?.value, // Fill in additional parameters if required by the API
        var2: this.addteacher_form.get('last_name')?.value,
        var3: this.addteacher_form.get('email')?.value,
        var4: this.addteacher_form.get('phone_number')?.value,
        var5: this.addteacher_form.get('last_name')?.value+" "+this.addteacher_form.get('fisrt_name')?.value,
        var6: this.addteacher_form.get('teacher_describe')?.value,
        var7: this.selectspecialized,
        var8: "",
  
      };
      console.log(reqDN)
      this.apiServices.callAPIJson(environment.ApiEndpoint.Teacher_management,reqDN).subscribe(data=>
        {
          console.log("ma ",data.mathongbao)
          if(data.mathongbao==1)
          {
            this.sharefunshion.showNotification("top","right",2,"Thêm giảng viên thành công")
  
          }
          else{
            console.log("Lỗi")
          }
          this.cancleaddteacher_form()
        })
    }
    else
    {
      this.sharefunshion.showNotification("top","right",4,"Sai mật khẩu")
    }
  }
  onSelectChangeSpecialized(event:any)
  {
    this.selectspecialized=event.value;
  }
  cancleaddteacher_form()
  {
    this.dialog.closeAll()
    this.addteacher_form.reset()
    this.selectspecialized=null
    this.getdata()
  }
  edit_teacher(teacher:any)
  {
    this.teacher_edit=teacher
    this.editteacher_form.patchValue({
      teacher_name:teacher.teacher_name,
      teacher_describe:teacher.teacher_describe,
      selectedOption :teacher.specialized_id,
      
    });
  }
  delete_teacher(teacher:any)
  {

  }
  onSelectChangeSpecialized_edit(event:any)
  {
    this.selectspecialized_edit=event.value
  }
  filltersub()
  {
    const startValue = this.campaignOne.get('start').value;
    const endtValue = this.campaignTwo.get('start').value;
    const formattedStartValue = format(startValue, 'yyyy-MM-dd');
    const formattedendValue = format(endtValue, 'yyyy-MM-dd');
    const reqDN = {
      action_id: 7, // Replace 1 with the appropriate action ID for login
      vart: "",
      varm: "",
      var1: formattedStartValue, // Fill in additional parameters if required by the API
      var2:formattedendValue,
      var3: "",
      var4: "",
      var5: "",
      var6: "",
      var7: "",
      var8: ""
    };
    this.apiServices.callAPIJson(environment.ApiEndpoint.Teacher_management,reqDN).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.data2 = data.dulieu.table1;
    
          //this.data2 = [...this.data];
          //  this.apiResponse = this.data;
          console.log("data2 ",data.dulieu.table1)
          this.dataSourceSalary = new MatTableDataSource<any>(this.data2);
          this.dataSourceSalary.paginator = this.secondPaginator;
          this.dataSourceSalary.sort = this.secondsort;
          this.dataSourceSalary.connect();
        }
        else
        {
          console.log("Lỗi")
        }
      })
  
    

   
  }
  detail(teacher_salary:any)
  {
    const startValue = this.campaignOne.get('start').value;
    const endtValue = this.campaignTwo.get('start').value;
    const formattedStartValue = format(startValue, 'yyyy-MM-dd');
    const formattedendValue = format(endtValue, 'yyyy-MM-dd');
    const reqDN = {
      action_id: 9, // Replace 1 with the appropriate action ID for login
      vart: "",
      varm: "",
      var1: formattedStartValue, // Fill in additional parameters if required by the API
      var2:formattedendValue,
      var3: teacher_salary.teacher_id,
      var4: "",
      var5: "",
      var6: "",
      var7: "",
      var8: ""
    };
    this.apiServices.callAPIJson(environment.ApiEndpoint.Teacher_management,reqDN).subscribe(data=>
    {

      if(data.mathongbao==1)
      {
        this.list_detail_salary=data.dulieu.table1;
        this.dataSourceTableSalary = new MatTableDataSource<any>(this.list_detail_salary);
        this.dataSourceTableSalary.paginator = this.thirdPaginator;
        this.dataSourceTableSalary.sort=this.thirdsort;
        console.log(this.list_detail_salary)
      } 
      else
      {
        console.log("Lỗi")
      }
    })
  }
  allsub()
  {
    this.getdata_salaty_teacher()
  }
  subedit_teacher()
  {
    const reqDN = {
      action_id: 6, // Replace 1 with the appropriate action ID for login
      vart: "",
      varm: "",
      var1: this.teacher_edit.teacher_id, // Fill in additional parameters if required by the API
      var2: this.editteacher_form.get('teacher_name')?.value,
      var3: this.selectspecialized_edit,
      var4: this.editteacher_form.get('teacher_describe')?.value,
      var5: "",
      var6: "",
      var7: "",
      var8: ""
    };
    console.log(reqDN)
    this.apiServices.callAPIJson(environment.ApiEndpoint.Teacher_management,reqDN).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.sharefunshion.showNotification("top","right",2,data.thongbao)
        }
        else
        {
          console.log("Lỗi")
        }
        this.cancleaddteacher_editform()
      })
  }
  cancleaddteacher_editform()
  {
    this.dialog.closeAll()
    this.editteacher_form.reset()
    this.selectspecialized_edit=null;
    this.getdata()
  }

  cancletable_salary()
  {
    this.dialog.closeAll()

  }
  ngOnInit(): void {
    this.getdata_salaty_teacher()
    this.getdata();
    this.getlist_specialized()
    this.addteacher_form = this.fb.group({
      
      teacher_describe:['', Validators.required],
      
      fisrt_name:['',Validators.required],
      last_name:['',Validators.required],
      email:['',Validators.required],
      phone_number:['',Validators.required],
      selectedOption:[null,Validators.required],
      username:['',Validators.required],
      password1:['',Validators.required],
      password2:['',Validators.required],
      });
      this.editteacher_form = this.fb.group({
      
        teacher_describe:['', Validators.required],
        
        teacher_name:['',Validators.required],
        
        selectedOption:[null,Validators.required],
       
        });
       
      
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();

        this.campaignOne = new FormGroup({
          start: new FormControl(new Date(year, month, 13)),
          end: new FormControl(new Date(year, month, 16)),
        });
        this.campaignTwo = new FormGroup({
          start: new FormControl(new Date(year, month, 15)),
          end: new FormControl(new Date(year, month, 19)),
        });
  }

}
