import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})

export class ClientLayoutComponent implements OnInit {
  title = "my first app";
  images =[
    {
      imgSrc:'/assets/img/course_1.jpg',
      imgAlt:'IT1' 
    },
    {
      imgSrc:'/assets/img/course_2.jpg',
      imgAlt:'IT2' 
    },
    {
      imgSrc:'/assets/img/course_3.jpg',
      imgAlt:'IT3' 
    },
    {
      imgSrc:'/assets/img/course_4.jpg',
      imgAlt:'IT4' 
    },
    ]
  user_id:any;
  user_name:any;
  constructor(private router:Router,
    private apiservice:ApiServices) { }
  check_login():boolean
  {
    if(localStorage.getItem('client_id')!=null&&localStorage.getItem('token')!=null)
    {
      //this.getusername();
      return true
    }
    else
    {
      return false;
    }
  }
  clear_login()
  {
    this.router.navigate(['/home']);
    localStorage.clear()
  }
  getusername()
  {
    const reqGetuser =
    {
      action_id: 8,
      vart:"",
      varm:"",
      var1: localStorage.getItem('client_id'),
      var2: "",
      var3: "",
      var4:"",
      var5:"",
      var6:"",
      var7:"",
      var8:"",
    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.UserClient,reqGetuser).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.user_name=data.dulieu.table1[0].username
        }
      })
  }
  ngOnInit(): void {
   
    (function(d, m){
      var kommunicateSettings = {
        appId: "374cd64822d96e38656de77d41f735665" // Thay YOUR_APP_ID bằng App ID của bạn
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      (window as any).kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});

    
    //this.clear_login();
    this.check_login();
    this.getusername();
    this.user_id=localStorage.getItem('client_id');
    console.log(localStorage.getItem('client_id'))
    console.log(this.check_login())
  }

}
