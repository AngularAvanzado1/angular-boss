import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethod } from './store/payment-method/payment-method.model';
import { PaymentMethodService } from './store/payment-method/payment-method.service';

@Component({
  selector: 'ab-shop-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  public paymentMethodsList$: Observable<PaymentMethod[]>;
  public preferredPaymentMethod$: Observable<string>;

  constructor(private paymentMethodService: PaymentMethodService) {}

  ngOnInit() {
    this.paymentMethodsList$ = this.paymentMethodService.getPaymentMethodsList$();
    this.preferredPaymentMethod$ = this.paymentMethodService.getPreferredPaymentMethod$();

    this.paymentMethodService.loadPaymentMethods();

    const visa: PaymentMethod = {
      id: '1234 7896 3214 6549',
      expiration: new Date(2020, 6, 30)
    };

    this.paymentMethodService.addPaymentMethod(visa);

    this.paymentMethodService.selectPreferredPaymentMethod(visa.id);

    visa.expiration = new Date(2021, 12, 31);

    this.paymentMethodService.setExpirationPaymentMethod(visa);
  }
}
