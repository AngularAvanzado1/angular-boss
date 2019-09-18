export interface PaymentMethod {
  id: string;
  expiration: Date;
}

export interface RegisteredPaymentMethods {
  list: PaymentMethod[];
  preferred: string;
}
