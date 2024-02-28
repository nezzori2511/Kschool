import { Injectable } from '@angular/core';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  constructor(private apiServices:ApiServices) { }
  // thongTinTaiKhoanMoi(req: any): Observable<any> {
  //   // Call the API to authenticate the user
  //   return this.apiServices.callAPIJson(environment.ApiEndpoint.Course, req).pipe(
  //         map((data: any) => {
          
  //           return data; 
      
  //     })
  //   );
    
  // }

  sendData(data: any) {
    this.dataSubject.next(data);
  }
}
