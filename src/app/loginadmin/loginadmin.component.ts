import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { SharefunshionService } from 'app/services/sharefunshion.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.scss']
})
export class LoginadminComponent implements OnInit {
  loginForm :FormGroup;
  constructor(private apiService:ApiServices,
    private sharefunsion:SharefunshionService,
    private dialog:MatDialog,
    private router:Router,
    private formbuilder :FormBuilder) { }
  onSubmitLogin()
  {
    if (this.loginForm.valid) {
      const reqDN=
    {
      action_id: 9,
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
    this.apiService.callAPIJson(environment.ApiEndpoint.Login_admin,reqDN).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.sharefunsion.showNotification('top','right',2,data.thongbao)
          localStorage.setItem('client_id',data.dulieu.table1[0].user_id)
          localStorage.setItem('role_id',data.dulieu.table1[0].role_id)
         
          this.router.navigate(['/admin/dashboard']);

        }
        else{
          this.sharefunsion.showNotification('top','right',4,"Sai tài khoản hoặc mật khẩu")
        }
      })
    }
    else{
      this.sharefunsion.showNotification('top','right',4,"Vui lòng nhập đầy đủ thông tin")
    }
    
  }
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      
     
    });
  }

}
