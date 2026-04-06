import { Component, OnInit } from '@angular/core';
import { PaymentDetailForm } from "./payment-detail-form/payment-detail-form";
//import { NgClass } from "../../../node_modules/@angular/common/types/_common_module-chunk";
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';

@Component({
  selector: 'app-payment-details',
  imports: [PaymentDetailForm],
  templateUrl: './payment-details.html',
  styles: ``,
})
export class PaymentDetails implements OnInit {
constructor(public service: PaymentDetailService) {


}
  ngOnInit(): void {
   let result= this.service.refreshList();
   console.log(result);
  }
  onDelete(id:number){
    console.log(id);
    if(confirm('Are you sure to delete this record?')){
      this.service.deletePaymentDetail(id).subscribe({next: (res) => {
        this.service.refreshList();
      },
      error: (err) => {console.log(err)}});
    }

  }
  onUpdate(selectedRecord:PaymentDetail){
    this.service.formData = Object.assign({}, selectedRecord);
  }


}
