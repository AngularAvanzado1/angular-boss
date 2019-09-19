export interface PaymentMethod {
  id: string;
  expiration: Date;
}
export interface PaymentMethods {
  list: PaymentMethod[];
  preferred: string;
}
