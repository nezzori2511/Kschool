import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { INavData } from '@coreui/angular';
import { environment } from 'app/environments/environment';

export const MaThongBaoAPI = {
  UNSUCCESS: -1,//Không Thành công
  SUCCESS: 1,//Thành công
  END_OF_LOGIN_SESSION: 2, // kết thúc phiên đăng nhập
  UNKNOWN: 99, //Lỗi không xác định
  NOT_NOTIFY: 100, //Lỗi không xác định
}

export declare type ResultAPI<T> = {
  mathongbao: number;
  thongbao: string;
  dulieu: T;
  token :string;
};
export declare type ResultAPIVideo<T> = {
  mathongbao: number;
  thongbao: string;
  linkvideo:string;
};
export declare type ApiErrorResponse = HttpErrorResponse & {
  title_custom: string;
  message_custom: string;
};

declare type ContentType = "application/json" | "application/xml" | null;

@Injectable({
  providedIn: 'root'
})
export class ApiServices {
  private BASEURL = environment.ApiEndpoint.BASE;
  public config = {
    ngonngu_id: 1,
    form_id: 1,
    server_id: 1,
    token: '',
    khachang_id: 0
  }
  public portal_id: number = 0;
  public menu: INavData[] = [];
  constructor(private http: HttpClient) {

    if (localStorage.getItem(environment.envi_key.config) !== null) {
      const res: any = localStorage.getItem(environment.envi_key.config);
      this.config = Object.assign(JSON.parse(res), this.config);
    }
  }

  setPortalId(portalId: any): boolean {
    let result = false;
    if (this.portal_id == portalId) {
      result = true;
    } else {
      result = false;
    }
    this.portal_id = portalId;
    return result;
  }

  setKhachHang(khId: any) {
    this.config.khachang_id = khId;
  }

  callApiFormData<T = any>(
    api: string,
    body: FormData,
    showloading = true
  ): Observable<ResultAPI<T>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "ngonngu_id": this.config.ngonngu_id.toString(),
        "form_id": this.config.form_id.toString(),
        "server_id": this.config.server_id.toString(),
        "portal_id": this.portal_id.toString(),
        "token": localStorage.getItem(environment.envi_key.token) ? localStorage.getItem(environment.envi_key.token) : '',
      }),
    };

    try {
      return this.http.post<ResultAPI<T>>(this.BASEURL + api, body, httpOptions);
    } catch (error) {
      return Observable.create(observer => {
        observer.next({
          mathongbao: 500,
          thongbao: error,
          dulieu: null,
        });
        observer.complete();
      });
    }
  }

  callApiMultiFormData<T = any>(
    api: string,
    body: any,
    showloading = true
  ): Observable<ResultAPI<T>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "ngonngu_id": this.config.ngonngu_id.toString(),
        "form_id": this.config.form_id.toString(),
        "server_id": this.config.server_id.toString(),
        "portal_id": this.portal_id.toString(),
        "token": localStorage.getItem(environment.envi_key.token) ? localStorage.getItem(environment.envi_key.token) : '',
      }),
    };

    try {
      return this.http.post<ResultAPI<T>>(this.BASEURL + api, body, httpOptions);
    } catch (error) {
      return Observable.create(observer => {
        observer.next({
          mathongbao: 500,
          thongbao: error,
          dulieu: null,
        });
        observer.complete();
      });
    }
  }

  callApiFormData0Module<T = any>(
    api: string,
    body: FormData,
    portal_id: string,
    showloading = true
  ): Observable<ResultAPI<T>> {
    const httpOptions = {
      headers: new HttpHeaders({
        "ngonngu_id": this.config.ngonngu_id.toString(),
        "form_id": this.config.form_id.toString(),
        "server_id": this.config.server_id.toString(),
        "portal_id": portal_id,
        "token": localStorage.getItem(environment.envi_key.token) ? localStorage.getItem(environment.envi_key.token) : '',
      }),
    };

    try {
      return this.http.post<ResultAPI<T>>(this.BASEURL + api, body, httpOptions);
    } catch (error) {
      return Observable.create(observer => {
        observer.next({
          mathongbao: 500,
          thongbao: error,
          dulieu: null,
        });
        observer.complete();
      });
    }
  }

  callApiFormDataMulti<T = any>(
    api: string,
    body: FormData,
    showloading = true
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "ngonngu_id": this.config.ngonngu_id.toString(),
        "form_id": this.config.form_id.toString(),
        "server_id": this.config.server_id.toString(),
        "portal_id": this.portal_id.toString(),
        "token": localStorage.getItem(environment.envi_key.token) ? localStorage.getItem(environment.envi_key.token) : '',
      }),
    };

    return this.http.post(this.BASEURL + api, body, { responseType: 'text', headers: httpOptions.headers });
  }

//   getHt2401TaiLieuArrayBuffer(fileId): Observable<ArrayBuffer> {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         "ngonngu_id": this.config.ngonngu_id.toString(),
//         "form_id": this.config.form_id.toString(),
//         "server_id": this.config.server_id.toString(),
//         "portal_id": this.portal_id.toString(),
//         "token": localStorage.getItem(environment.envi_key.token) ? localStorage.getItem(environment.envi_key.token) : '',
//       })
//     };
//     return this.http.get(this.BASEURL + environment.ApiEndpoint.GetDocument,
//       { responseType: 'arraybuffer', headers: httpOptions.headers, params: { file_id: fileId } });
//   }

  getFileArrayBuffer(url, obj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "ngonngu_id": this.config.ngonngu_id.toString(),
        "form_id": this.config.form_id.toString(),
        "server_id": this.config.server_id.toString(),
        "portal_id": this.portal_id.toString(),
        "token": localStorage.getItem(environment.envi_key.token) ? localStorage.getItem(environment.envi_key.token) : '',
      })
    };

    return this.http.post( url, obj, { responseType: 'json', headers: httpOptions.headers });
  }

  callAPIJson<T = any>(
    api: string,
    body?: object | string | null,
    method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
    contentType?: ContentType,
    showloading = true
  ): Observable<ResultAPI<T>> {
    return this.httpAPI(this.BASEURL + api, body, method, contentType, "application/json", showloading);
  }
  
  callAPIJsonVideo<T = any>(
    api: string,
    body?: object | string | null,
    file?:File | null,
    method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
    contentType?: ContentType,
    showloading = true
  ): Observable<ResultAPIVideo<T>> {
    return this.httpAPI(this.BASEURL + api, body, method, contentType, "application/json", showloading);
  }
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`https://localhost:44358/api/Authorization/UploadImageCloud`, formData);
  }
  uploadFileAndObject(file: File, obj: any) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('var1', obj.var1);
    formData.append('var2', obj.var2);
    formData.append('var3', obj.var3);
    formData.append('var4', obj.var4);
    formData.append('var5', obj.var5);
    formData.append('var6', obj.var6);
    formData.append('var7', obj.var7);
    formData.append('var8', obj.var8);
    formData.append('var9', obj.var9);
    formData.append('var10', obj.var10);
    // Thêm các thuộc tính khác của obj nếu cần thiết
  
    const headers = new HttpHeaders();
    // Nếu API yêu cầu headers đặc biệt, bạn có thể thêm chúng vào đây
  
    return this.http.post<ResultAPI<any>>('https://localhost:44358/api/Authorization/TestUp3', formData, { headers });
  }
  uploadVideoCloud(videoFile: File): Observable<any>{
    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('upload_preset', 'ml_default');

    return this.http.post('https://api.cloudinary.com/v1_1/djcvwvfb7/upload', formData);
  }
  callAPIXml(
    api: string,
    body?: object | string | null,
    method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
    contentType?: ContentType,
    showloading = true
  ): Observable<string> {
    return this.httpAPI(this.BASEURL + api, body, method, contentType, "application/xml", showloading);
  }
  // uploadVideo(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);

  //   return this.http.post<any>(`https://localhost:44358/api/Authorization/TestUp2`, formData);
  // }
  uploadVideo(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    
    return this.http.post<any>(`https://localhost:44358/api/Authorization/TestUp2`, formData);
  }
  private apiUrl = 'https://localhost:44358/api/payment';
  // createPayment(paymentRequest: any,course_id:any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/create`, paymentRequest,course_id);
  // }
  createPayment(paymentRequest: any): Observable<any> {
    // Truyền course_id như là một query parameter
    const options = { params: new HttpParams().set('productId', paymentRequest.course_id) };
    return this.http.post<any>(`${this.apiUrl}/create`, paymentRequest, options);
  }
 

  executePayment(paymentId: string, payerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/execute?paymentId=${paymentId}&PayerID=${payerId}`);
  }


  checkPaymentStatus(paymentId: string, payerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/check-status?paymentId=${paymentId}&PayerID=${payerId}`);
  }
  private httpAPI(api: string,
    body?: object | string | null,
    method: "GET" | "POST" | "PUT" | "DELETE" = "POST",
    contentType?: ContentType,
    accept?: ContentType,
    showloading = true) {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: accept ? accept : "application/json",
        "Content-Type": contentType ? contentType : "application/json",
        "ngonngu_id": this.config.ngonngu_id.toString(),
        "form_id": this.config.form_id.toString(),
        "server_id": this.config.server_id.toString(),
        "portal_id": this.portal_id.toString(),
        //"token": localStorage.getItem(environment.envi_key.token) ? localStorage.getItem(environment.envi_key.token) : '',
        "Authorization": localStorage.getItem("token") ? localStorage.getItem("token") : '',
        
      }),
    };

    if (accept === "application/xml") {
      Object.assign(httpOptions, { responseType: 'text' as 'json' })
    }

    try {
      if (method === "GET") {
        return this.http.get(api, httpOptions);
      } else if (method === "POST") {
        return this.http.post(api, body, httpOptions);
      } else if (method === "PUT") {
        return this.http.put(api, body, httpOptions);
      } else {
        return Observable.create(observer => {
          observer.next(accept === "application/json" ? {
            mathongbao: 404,
            thongbao: "response not exsits.",
            dulieu: null,
          } : "404: response not exsits");
          observer.complete();
        });
      }
    } catch (error) {
      return Observable.create(observer => {
        observer.next(accept === "application/json" ? {
          mathongbao: 500,
          thongbao: error,
          dulieu: null,
        } : "404: response not exsits");
        observer.complete();
      });
    }
  }

}
