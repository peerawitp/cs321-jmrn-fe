export enum OrderStatus {
  PROCESSING = "PROCESSING",
  WAITING_PAYMENT = "WAITING_PAYMENT",
  PREPARING = "PREPARING",
  SHIPPED = "SHIPPED",
  SUCCESS = "SUCCESS",
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
