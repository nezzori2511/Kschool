import { Component, OnInit,TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';





import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { FormGroup ,FormBuilder,Validator, Validators} from '@angular/forms';
import { data, get } from 'jquery';
import { MatDialog } from '@angular/material/dialog';

import {HostListener } from '@angular/core';
import { TaiKhoanModel } from 'app/api/models/authentication.model';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
@Component({
selector: 'app-quantri',
templateUrl: './quantri.component.html',
styleUrls: ['./quantri.component.scss'],

})
export class QuantriComponent implements OnInit {
taiKhoanModel: TaiKhoanModel[] = [];
isAddFormVisible :boolean=false;
editForm: FormGroup;
searchForm: FormGroup;
addForm: FormGroup;
selectedChangAdd:any;
listRole:any[] = [];
selectedDvEdit:any;
selectedTaiKhoan: TaiKhoanModel | null = null;
//private isBrowserClosing=false ;
constructor(
  //private authService: AuthenticationService, 
  private formBuilder:FormBuilder,
  private apiServices: ApiServices,

  private route:Router,
  private dialog:MatDialog,
  
  ) {
  

   }
 

  //  @HostListener('window:beforeunload', ['$event'])
  //  onBeforeUnload(event: Event): void {
  //    this.isBrowserClosing = true;
  //    console.log(this.isBrowserClosing);
  //    // Thực hiện logout trước khi trình duyệt bị đóng
  //    this.logout();
  //  }
 
  
  // @HostListener('window:unload', ['$event'])
  // onUnload(event: Event): void {
   
  //   this.authService.logout();
  // }
  
  getdata()
  {
   
   
    const reqDN = {
      action_id: 7, // Replace 1 with the appropriate action ID for login
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
   
  
    //console.log("truyền",reqDN)
    //const action_id = 3; // Đặt action_id tương ứng với yêu cầu lấy thông tin tài khoản từ API
    
    // this.authService.thongTinTaiKhoanMoi(reqDN).subscribe(
    //   (data) => {
    //     console.log("tài khoản",data);
    //     this.taiKhoanModel = data;

        
    //     console.log("tài khoản",this.taiKhoanModel);
    //     //alert(this.taiKhoanModel);
  
 
    //   },
    //   (error) => {
    //     // Xử lý lỗi khi gọi API
    //   }
    // );
    this.apiServices.callAPIJson(environment.ApiEndpoint.GetTKWithRole,reqDN).subscribe(data=>{

          console.log("tài khoản",data);
          this.taiKhoanModel = data.dulieu.table1;
          
      
    });
  }
  edit(taikhoans: TaiKhoanModel): void {
    this.selectedTaiKhoan = taikhoans;
    
    // Set the form values with the selectedTaiKhoan data
    this.editForm.patchValue({
      id:taikhoans.id,
      username: taikhoans.username,
      password: taikhoans.password,
      selectedOption :taikhoans.roleid,
      
    });
    this.cancelAddForm();
   
  }
  cancelAddForm(): void {
    // Hide the add form and reset its fields
    //this.isAddFormVisible = false;
    this.dialog.closeAll();
    this.addForm.reset();
  }
  
  cancelEditForm(): void {
    this.selectedTaiKhoan = null;
    this.dialog.closeAll();
    this.editForm.reset();
  }
 
  onSubmitEditForm(): void {
    if (this.editForm.valid) {
      // Get the updated values from the form
      const updatedTaiKhoan = {
        
        ...this.selectedTaiKhoan!,
        action_id:1,
        vart: this.editForm.get('username')?.value,
        varm: this.editForm.get('password')?.value,
        var1: this.editForm.get('id')?.value,
        var2: this.selectedTaiKhoan.roleid,
        var3:localStorage.getItem("token"),
      };
      console.log("tài khoản",updatedTaiKhoan);
      //console.log(updatedTaiKhoan);
      this.apiServices.callAPIJson(environment.ApiEndpoint.UpdateTK, updatedTaiKhoan).subscribe(data => {
      
        
        if (data.mathongbao == 1) {
          //this.ngOnInit();
          // const index = this.taiKhoanModel.findIndex(tk => tk.username === this.selectedTaiKhoan.username);
          // console.log(index);
          //     if (index !== -1) {
          //       // Thay thế tài khoản cũ bằng tài khoản mới
          //       this.taiKhoanModel[index] = { ...this.selectedTaiKhoan, ...updatedTaiKhoan };
          //     }
          this.getdata();
        } else if(data.mathongbao==3)
        {
          //this.route.navigate(['backend/login']);
          //this.utilsService.alertToast(data.thongbao, "Thông báo ", "warning");
          
        } 
        else if(data.mathongbao ==6)
        {
          //this.utilsService.alertToast(data.thongbao, "Thông báo ", "warning");
          this.route.navigate(['backend/login']);
        }
        
      });
      this.cancelEditForm();
      this.dialog.closeAll();
    }
  }
  delete(taikhoans: TaiKhoanModel) :void
  {
    // if(confirm("Bạn chắc muốn xóa ?"))
    // {
      const req={
        action_id: 2,
        vart: "",
        varm: "",
        var1: taikhoans.id,
        var2: "",
        var3: localStorage.getItem("token"),
        var4: "",
        var5: "",
        var6: "",
        var7: "",
        var8: "",
        
        
       
      }
      console.log(req);
      this.apiServices.callAPIJson(environment.ApiEndpoint.DeleteTK, req).subscribe(data => {
        
       
        console.log(data.mathongbao);
        if (data.mathongbao == 1) {
          //this.utilsService.alertToast(data.thongbao, "Xóa thành công", "success");
          this.taiKhoanModel = this.taiKhoanModel.filter(tk => tk.id !== taikhoans.id);
        }
        else if(data.mathongbao==3)
        {
          //this.utilsService.alertToast(data.thongbao, "Thông báo ", "warning");
        } 
        else if(data.mathongbao==6)
        {
          //this.utilsService.alertToast(data.thongbao, "Thông báo ", "warning");
          this.route.navigate(['backend/login']);
        } 
        else {
          
          //this.utilsService.alertToast(data.thongbao, "Thông báo ", "warning");
          //this.route.navigate(['backend/login']);
        }
        
      });
    //}
    
  }
  addNewAccount()
  {
    this.selectedTaiKhoan = null;

  // Reset the form fields to empty values
    this.editForm.reset();

  // Show the add form
    this.isAddFormVisible = true;
   
  }

  onSubmitAddForm():void
  {
    // if(this.addForm.valid)
    // {
    //   const newTaiKhoan = {
    //     action_id: 3,
    //     vart: this.addForm.get('username')?.value,
    //     varm: this.addForm.get('password')?.value,
    //     var1: this.selectedChangAdd,
    //     var3:localStorage.getItem("token"),
    //   };
    //   console.log(newTaiKhoan);
    //   this.apiServices.callAPIJson(environment.ApiEndpoint.AddTK, newTaiKhoan).subscribe(
    //     (data) => {
    //       // Handle the API response and update the view
          
    //       if (data.mathongbao == 1) {
    //         this.getdata();
    //       } else if(data.mathongbao==3)
    //       {
    //         //this.route.navigate(['backend/login']);
    //         //this.utilsService.alertToast(data.thongbao, "Thông báo ", "warning");
            
    //       } 
    //       else if(data.mathongbao ==6)
    //       {
    //         //this.utilsService.alertToast(data.thongbao, "Thông báo ", "warning");
    //         this.route.navigate(['backend/login']);
    //       }
    //       else {
    //         //alert("Thất bại");
    //         throw new Error(data.thongbao);
    //       }
    //     }
    //   );

    //   // Hide the add form and reset its fields
    //   //this.isAddFormVisible = false;
    //   this.dialog.closeAll();
    //   this.addForm.reset();
   
    // }
  }
  onSubmitSearchForm(): void {
    const keyword = this.searchForm.get('keyword').value;
    // Lọc dữ liệu tài khoản dựa vào từ khóa tìm kiếm
    this.taiKhoanModel = this.taiKhoanModel.filter(
      (tk) =>
        tk.username.includes(keyword) 
    );
  }
  clearSearch(): void {
    this.searchForm.patchValue({ keyword: '' });
    // Reset lại dữ liệu tài khoản để hiển thị toàn bộ tài khoản
    this.getdata();
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
  // logout()
  // {
   
  //     this.authService.logout();
    
  
  // }
  onSelectChangeAdd(event:any)
  {
    this.selectedChangAdd=event.value;
  }
  onSelectChangeEdit(event:any)
  {
   
      this.selectedTaiKhoan.roleid=event.value;
   
    
   
    
  }
  getRoleUser()
  {
    const reqGetRole = {
      action_id: 5, // Replace 1 with the appropriate action ID for login
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
    this.apiServices.callAPIJson(environment.ApiEndpoint.GetRoleUser,reqGetRole).subscribe(data=>
      {
        
          this.listRole=data.dulieu.table1;
        
        
      });
  }
  ngOnInit( ): void {
    this.getRoleUser()
    this.getdata();
    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      selectedOption: [null, Validators.required],
    });
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      //roleid: ['', Validators.required],
      selectedOption: [null, Validators.required],
    });
    // const loggedInUsername = localStorage.getItem("user");
    //console.log("thành công"+loggedInUsername);
    this.searchForm = this.formBuilder.group({
      keyword: [''] 
    });
    
  }
}
 






