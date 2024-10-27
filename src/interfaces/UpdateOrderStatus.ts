import { OrderStatus } from "./Order";

export interface UpdateOrderStatus {
  orderId: number;
  status: OrderStatus;
}
