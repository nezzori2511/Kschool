import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgZone } from '@angular/core';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { SharefunshionService } from 'app/services/sharefunshion.service';
import { el } from 'date-fns/locale';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  loginForm :FormGroup;
  resForm :FormGroup;
  constructor(private apiService:ApiServices,
    private sharefunsion:SharefunshionService,
    private dialog:MatDialog,
    private router:Router,
    private formbuilder :FormBuilder,
    private toastr:ToastrService,


    ) { 
      
  }
showToast() {
  
}
  onSubmitLogin() {
    if (this.loginForm.valid) {
      const reqDN=
    {
      action_id: 7,
      vart: this.loginForm.get('username')?.value,
      varm: this.loginForm.get('password')?.value,
      var1: '',
      var2: '',
      var3: '',
      var4:'',
      var5:'',
      var6:"",
      var7:"",
      var8:"",
    }
    this.apiService.callAPIJson(environment.ApiEndpoint.DN,reqDN).subscribe(data=>
      {
        if(data.mathongbao==1)
        { 
          
          Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Đăng nhập thành công.',
            confirmButtonColor: '#28a745', // Màu xanh lá cây
          });

          localStorage.setItem('client_id',data.dulieu.table1[0].user_id)
          localStorage.setItem('token',data.token)
          this.router.navigate(['/home']);

        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Sai tài khoản hoặc mật khẩu.',
            confirmButtonColor: '#dc3545',
          });

        }
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Vui lòng nhập đầy đủ thông tin.',
        confirmButtonColor: '#dc3545', // Màu đỏ
      });

      
  
    }
    
 

    //this.showToast();
  }
  onSubmitRes()
  {
    if (this.resForm.valid) {
      console.log(this.resForm.get("password")?.value,this.resForm.get("password2")?.value)
      if(this.resForm.get("password")?.value==this.resForm.get("password2")?.value)
      {
        const reqRes=
        {
          action_id: 6,
          vart: this.resForm.get('username')?.value,
          varm: this.resForm.get('password')?.value,
          var1: this.resForm.get('first_name')?.value,
          var2: this.resForm.get('last_name')?.value,
          var3: this.resForm.get('phone_number')?.value,
          var4:this.resForm.get('email')?.value,
          var5:"",
          var6:"",
          var7:"",
          var8:"",
        }
        console.log(reqRes);
        this.apiService.callAPIJson(environment.ApiEndpoint.UserClient,reqRes).subscribe(data=>
          {
            if(data.mathongbao==1)
            {
  
              //this.toastr.success(data.thongbao);
              Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Đăng ký thành công.',
                confirmButtonColor: '#28a745', // Màu đỏ
              });
              this.resForm.reset()
           
            }
            else if(data.mathongbao==-1)
            {
              Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: data.thongbao,
                confirmButtonColor: '#dc3545', // Màu đỏ
              });
              //this.toastr.success(data.thongbao);
             
            }
            else
            {
              Swal.fire({
                icon: 'error',
                title: 'Lỗi!',
                text: 'Lỗi hệ thống.',
                confirmButtonColor: '#dc3545', // Màu đỏ
              });
             
            }
          })
      }
      else
      {

        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: 'Mật khẩu nhập không đúng.',
          confirmButtonColor: '#dc3545', // Màu đỏ
        });
       
      }
      
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: 'Vui lòng nhập đầy đủ thông tin.',
        confirmButtonColor: '#dc3545', // Màu đỏ
      });
      
      
 
    }
  }
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      
     
    });
    this.resForm = this.formbuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      password2: ['',Validators.required],
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      phone_number:['',Validators.required],
    });
  }

}
