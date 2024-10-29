import { OrderStatus } from "@/interfaces/Order";

export const marketingAllowedOrderStatus: OrderStatus[] = [];
export const storeAllowedOrderStatus: OrderStatus[] = [
  OrderStatus.PREPARING,
  OrderStatus.SHIPPED,
];
