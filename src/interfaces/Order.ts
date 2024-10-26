export enum OrderStatus {
  PROCESSING = "PROCESSING",
  WAITING_PAYMENT = "WAITING_PAYMENT",
  WAITING_PAYMENT_CONFIRMATION = "WAITING_PAYMENT_CONFIRMATION",
  PREPARING = "PREPARING",
  SHIPPED = "SHIPPED",
  SUCCESS = "SUCCESS",
  CANCELLED = "CANCELLED",
}

export interface Order {
  id: number;
  userId: string;
  addressId: number;
  status: OrderStatus;
  totalAmount: number;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productSizeId: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
