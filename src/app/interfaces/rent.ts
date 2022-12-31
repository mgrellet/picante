export interface Rent {
  //client info
  id: string;
  dni: number
  name: string;
  email: string;
  phone: number;
  address: string;
  //reservation info
  reservationDate: Date;
  tryDate: Date;
  deliveryDate: Date;
  returnDate: Date;
  price: number;
  advancePayment: number;
  balance: number;
  notes?: string;
  //rent details
  type: string;
  size: number;
  model: string;
  color: string;
  shirt: boolean;
  tie: boolean;
  vest: boolean;
  //metadata
  creationDate: Date;
}
