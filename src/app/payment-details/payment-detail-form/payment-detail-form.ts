import { Component } from '@angular/core';
import { PaymentDetailService } from '../../shared/payment-detail.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  imports: [FormsModule],
  templateUrl: './payment-detail-form.html',
  styles: ``,
})
export class PaymentDetailForm {
  constructor(public service: PaymentDetailService,private toastr: ToastrService) {


  }
  onSubmit(form: NgForm){
    if(form.valid){
    if(this.service.formData.paymentDetailId == 0){
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }
  else{
    this.toastr.error('Please fill all required fields correctly', 'Payment Detail Register');
  }}

  insertRecord(form: NgForm){
    this.service.postPaymentDetail().subscribe({next: (res) => {
      console.log(res);
      this.service.refreshList();
      form.resetForm();
      this.toastr.success('Submitted successfully', 'Payment Detail Register');
    },
    error: (err) => {console.log(err)}});
  }

  updateRecord(form: NgForm){
    this.service.updatePaymentDetail().subscribe({next: (res) => {
      console.log(res);
      this.service.refreshList();
      form.resetForm();
      this.toastr.info('Updated successfully', 'Payment Detail Register');
    },
    error: (err) => {console.log(err)}});
  }
}
