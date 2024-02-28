import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private apiservice:ApiServices) { }
  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.router.navigate(['/home']);
    // }, 5000); // Chuyển hướng sau 5 giây
    this.route.queryParams.subscribe(params => {
      const paymentId = params['paymentId'];
      const PayerID = params['PayerID'];
      const productId=localStorage.getItem('product_id')
      if (paymentId && PayerID) {
      
        
        // Người dùng đã trở lại từ PayPal, thực hiện kiểm tra trạng thái thanh toán
        this.apiservice.executePayment(paymentId, PayerID).subscribe(
          response => {
            console.log('Payment execution result:', response);
            if (response.status === 'success') {
              // Hiển thị thông báo thành công
              const reqCourse =
              {
                action_id: 1,
                var1: localStorage.getItem('product_id'),
                var2: localStorage.getItem('total_price'),
                var3:"",
                var4:localStorage.getItem('client_id'),
                var5: '',
                var6: '',
                var7: '',
                var8: '',
                var9: '',
                var10: '',
              }
            
               this.apiservice.callAPIJson(environment.ApiEndpoint.Progress_user,reqCourse).subscribe(data=>
                {
                  //console.log(data.mathongbao)
                  if(data.mathongbao==1)
                  { 
                    localStorage.setItem('product_id',null)
                    console.log("Ok")
                    //this.sharefunshion.showNotification("top","right",2,"Đăng ký thành công")

                  }
                  else
                  {
                  
                    console.log("Lỗi")
                  }
                 
                })
              console.log("status",response.message);
            } else {
              // Hiển thị thông báo lỗi
              console.log("status",response.message);
            }
          },
          error => {
            console.error('Error executing payment:', error);
            // Xử lý lỗi nếu có
          }
        );
      }
    });
  }
}


