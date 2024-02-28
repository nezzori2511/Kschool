import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiServices } from 'app/api/index.service';
import { TaiKhoanModel } from 'app/api/models/authentication.model';
import { environment } from 'app/environments/environment';
import { SharefunshionService } from 'app/services/sharefunshion.service';


import { data } from 'jquery';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  dataSource:MatTableDataSource<any>;
  taiKhoanModel: any[] = [];
  editForm: FormGroup;
  //selectedRole:any
  selectedTaiKhoan: any | null = null;
  listRole:any[] = [];
  filteredData:any;
  filteredValue: string = '';
  selectedOption: any; // hoặc kiểu dữ liệu phù hợp với bạn
  // @ViewChild(MatPaginator)paginatior !:MatPaginator;
  apiResponse:any = [];
  displayedColumns: string[] = ['user_id','first_name', 'last_name','username','email','phone_number','role_name', 'actions'];
  //dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private formBuilder:FormBuilder,
    private apiServices: ApiServices ,
    private dialog:MatDialog,
    private route:Router,
    private sharefunshion:SharefunshionService,
   
    ) {
      // this.getdata()
  

   }
   

   openDialog(dialogTemplate: TemplateRef<any>) {
    const dialogRef = this.dialog.open(dialogTemplate, {
      width: '800px', // Điều chỉnh kích thước dialog theo ý muốn
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // Xử lý kết quả sau khi dialog đóng
      console.log('Dialog result:', result);
    });
  }
 
 
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

    this.apiServices.callAPIJson(environment.ApiEndpoint.Testuser,reqDN).subscribe(data=>{

      if(data.mathongbao===1)
      {
        this.taiKhoanModel = data.dulieu.table1;
        this.apiResponse = this.taiKhoanModel;
        console.log("data",this.taiKhoanModel)
        this.dataSource = new MatTableDataSource<any>(this.taiKhoanModel);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
       
      }
      
      else
      {
        alert("Lỗi");
      }
  });
 
  }
 
  onSelectChangeEdit(event:any)
  {
   
      this.selectedTaiKhoan.role_id=event.value;
      
    
   
    
  }
  
  applyFilter(data: Event) {

    // const value=(data.target as HTMLInputElement).value;
    // this.dataSource.filter = value;
    const value = (data.target as HTMLInputElement).value;
    
    this.filteredValue = value;
    this.filterAndSelectData();
   
  }
  onChange($event:any){
  //   if($event.value!=0)
  //   {
  //     this.filteredData = _.filter(this.apiResponse,(item) =>{
   
  //       return item.role_id == $event.value;
      
     
  //   })
  // }
  // else{
  //   this.filteredData = _.filter(this.apiResponse,(item) =>{
   
  //     return item.role_id != $event.value;
    
   
  // })
  // }
  //     this.dataSource = new MatTableDataSource(this.filteredData);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
    
  this.selectedOption = $event.value;
  this.filterAndSelectData();
    
   
  }
 
  filterAndSelectData() {
    let filteredData = this.apiResponse;
    function dynamicFilter(item: any, filterValue: any): boolean {
      // Kiểm tra xem có bất kỳ thuộc tính nào của đối tượng có giá trị chứa filterValue không
      for (const property in item) {
        if (item[property] && item[property].toString().includes(filterValue.toString())) {
          return true; 
        }
      }
      return false; 
    }
    // Áp dụng lọc

    if (this.filteredValue) {
      filteredData = filteredData.filter(item =>dynamicFilter(item, this.filteredValue) 
      
        //return item.someProperty?.includes(this.filteredValue);
      );
      console.log("data loc",filteredData)
    }
   
  
    // Áp dụng chọn
    if (this.selectedOption) {
      filteredData = filteredData.filter(item => {
        // Thực hiện logic chọn ở đây
        return item.role_id === this.selectedOption;
      });
    }
    else if(this.selectedOption==0)
    {
      filteredData = filteredData.filter(item => {
        // Thực hiện logic chọn ở đây
        return item.role_id != this.selectedOption;
      });
    }
    // Cập nhật dữ liệu trong MatTableDataSource
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  cancelEditForm(): void {
    //this.selectedTaiKhoan = null;
    this.dialog.closeAll();
    this.editForm.reset();
  }
  edit(taikhoans: any): void {
    this.selectedTaiKhoan = taikhoans;
    
    
    // Set the form values with the selectedTaiKhoan data
    this.editForm.patchValue({
      account_id:taikhoans.account_id,
      user_id:taikhoans.user_id,
      username: taikhoans.username,
      first_name: taikhoans.first_name,
      last_name: taikhoans.last_name,
      email: taikhoans.email,
      phone_number: taikhoans.phone_number,
      
      //password: taikhoans.password,
      selectedOption :taikhoans.role_id,
      
    });
    
   this.cancelAddForm();
  }
  cancelAddForm(): void {
    // Hide the add form and reset its fields
    //this.isAddFormVisible = false;
    this.dialog.closeAll();

  }
  onSubmitEditForm(): void {
    if (this.editForm.valid) {
      // Get the updated values from the form
      const updatedTaiKhoan = {
        
        ...this.selectedTaiKhoan!,
        action_id:3,
        vart: this.editForm.get('username')?.value,
        varm:'',
        var1: this.editForm.get('user_id')?.value,
        var2: '',
        var3: this.editForm.get('first_name')?.value,
        var4: this.editForm.get('last_name')?.value,
        var5: this.editForm.get('email')?.value,
        var6: this.editForm.get('phone_number')?.value,
        var7: this.selectedTaiKhoan.role_id,
        var8: '',
       
      };
      console.log("tài khoản",updatedTaiKhoan);
      //console.log(updatedTaiKhoan);
      this.apiServices.callAPIJson(environment.ApiEndpoint.EditUser, updatedTaiKhoan).subscribe(data => {
      
        
        if (data.mathongbao == 1) {
       
          this.getdata();
       
        
          this.sharefunshion.showNotification('top','right',2,'Sửa thành công');
          
        } 
        // else if(data.mathongbao==3)
        // {
        //   //this.route.navigate(['backend/login']);
        //   //this.utilsService.alertToast(data.thongbao, "Thông báo ", "warning");
          
        // } 
        // else if(data.mathongbao ==6)
        // {
        //   //this.utilsService.alertToast(data.thongbao, "Thông báo ", "warning");
        //   this.route.navigate(['backend/login']);
        // }
        else
        {
          this.sharefunshion.showNotification('top','right',4,'Lỗi');
        }
        
      });
      this.cancelEditForm();
      this.dialog.closeAll();
    }
    
  }
 
  // onSelectChangeAdd(event:any)
  //   {
  //     this.selectedChangAdd=event.value;
  //   }
 
  delete(taikhoans: any) :void
  {
    if(confirm("Bạn chắc muốn xóa ?"))
    {

      const req={
        action_id: 4,
        vart: "",
        varm: "",
        var1: taikhoans.user_id,
        var2: "",
        var3: "",
        var4: "",
        var5: "",
        var6: "",
        var7: "",
        var8: "",
        
        
       
      }
      console.log("xóa",req);
      this.apiServices.callAPIJson(environment.ApiEndpoint.EditUser, req).subscribe(data => {
        
       
        console.log("mat thong bao",data.mathongbao);
        if (data.mathongbao == 1) {
          this.sharefunshion.showNotification('top','right',2,data.thongbao);
      
          this.taiKhoanModel = this.taiKhoanModel.filter(tk => tk.user_id !== taikhoans.user_id);
        }
        
        else {
          
          this.sharefunshion.showNotification('top','right',4,'Lỗi');
        }
        this.getdata()
      });
     
    }
    
  }
  getRoleUser()
  {
    const reqGetRole = {
      action_id: 2, // Replace 1 with the appropriate action ID for login
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
    this.apiServices.callAPIJson(environment.ApiEndpoint.GetRole,reqGetRole).subscribe(data=>
      {
        if(data.mathongbao===1)
        {
          this.listRole=data.dulieu.table1;
          console.log("role",this.listRole);
        }
        else{
          //this.utilsService.alertToast(data.thongbao,"Thông báo","error");
        }
      });
  }
  ngOnInit(): void {

    //console.log("thành công"+loggedInUsername);
    this.getRoleUser();
    this.getdata();
    //this.ngAfterViewInit();
    this.editForm = this.formBuilder.group({
      account_id: ['', Validators.required],
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],

      selectedOption: [null, Validators.required],
    });
    // this.editForm = this.formBuilder.group({
    //   account_id: ['', Validators.required],
    //   username: ['', Validators.required],
    //   //password: ['', Validators.required],
    //   //selectedOption: [null, Validators.required],
    // });
  }
  

}