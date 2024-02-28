import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { SharefunshionService } from 'app/services/sharefunshion.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
  listRole:any[] = [];
  selectedChangAdd:any;
  addForm: FormGroup;
  constructor(
    private apiServices: ApiServices, 
    private formBuilder:FormBuilder,
    private notify :SharefunshionService) { }


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
  onSelectChangeAdd(event:any)
  {
    this.selectedChangAdd=event.value;
  }
  onSubmitAddForm()
  {
    if(this.addForm.valid)
        {
          const newTaiKhoan = {
            action_id: 5,
            vart: this.addForm.get('username')?.value,
            varm: this.addForm.get('password')?.value,
            var1: this.addForm.get('first_name')?.value,
            var2: this.addForm.get('last_name')?.value,
            var3: this.addForm.get('phone_number')?.value,
            var4: this.addForm.get('email')?.value,
            var5:this.selectedChangAdd,
            var6:"",
            var7:"",
            var8:"",
           
            
          };
          console.log(newTaiKhoan);
          this.apiServices.callAPIJson(environment.ApiEndpoint.EditUser, newTaiKhoan).subscribe(
            (data) => {
              // Handle the API response and update the view
              
              if (data.mathongbao == 1) {
                this.notify.showNotification('top','right',2,data.thongbao)
                this.clear();
              } 
              else {
                //alert("Thất bại");
                this.notify.showNotification('top','right',4,data.thongbao)
              }
            }
          );

          // Hide the add form and reset its fields
          //this.isAddFormVisible = false;
          
      
        }
  }
  clear()
  {
         this.addForm.reset();
         
  }
  ngOnInit(): void {
    this.getRoleUser();
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],

      selectedOption: [null, Validators.required],
    });
  }

}
