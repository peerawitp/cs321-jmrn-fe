export enum OrderStatus {
  PAYMENT_PENDING = "Payment Pending",
  PAYMENT_CONFIRMED = "Payment Confirmed",
  PREPARING = "Preparing",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

export interface Order {
  id: number;
  customerName: string;
  address: string;
  status: OrderStatus;
  createdAt: Date;
}
