import { Injectable, signal } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { PaymentDetail } from './payment-detail.model';
@Injectable({
  providedIn: 'root',
})
export class PaymentDetailService {
  url:string = environment.apibaseUrl + '/PaymentDetail';
  list = signal<PaymentDetail[]>([]);
  formData:PaymentDetail = new PaymentDetail();
constructor(private http: HttpClient) {}

refreshList(){
  this.http.get(this.url).subscribe({ next: (res) =>
  { this.list.set(res as PaymentDetail[]);
    console.log(this.list());},
    error: (err) => {console.log(err)}});
}
 postPaymentDetail(){
  return this.http.post(this.url, this.formData);
}
deletePaymentDetail(id:number){
  return this.http.delete(`${this.url}/${id}`);
}
updatePaymentDetail(){
  return this.http.put(`${this.url}/${this.formData.paymentDetailId}`, this.formData);
}
}
