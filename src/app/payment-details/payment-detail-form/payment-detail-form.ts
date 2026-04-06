import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment-detail-form',
  imports: [FormsModule],
  templateUrl: './payment-detail-form.html',
  styles: ``,
})
export class PaymentDetailForm {
  constructor(public service: PaymentDetailService) {


  }
  onSubmit(form: NgForm){
    if(this.service.formData.paymentDetailId == 0){
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm){
    this.service.postPaymentDetail().subscribe({next: (res) => {
      console.log(res);
      this.service.refreshList();
      form.resetForm();
    },
    error: (err) => {console.log(err)}});
  }

  updateRecord(form: NgForm){
    this.service.updatePaymentDetail().subscribe({next: (res) => {
      console.log(res);
      this.service.refreshList();
      form.resetForm();
    },
    error: (err) => {console.log(err)}});
  }
}
