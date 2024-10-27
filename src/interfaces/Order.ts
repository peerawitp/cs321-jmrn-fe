import Address from "./Address";

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
  slipImageUrl: string | null;
  paymentVerifiedByUserID: string | null;
  orderItems: OrderItem[];
  customerAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketingOrder extends Order {
  user: {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
  };
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
