import { OrderStatus } from "@/interfaces/Order";

export const getOrderStatusText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PROCESSING:
      return "Processing";
    case OrderStatus.WAITING_PAYMENT:
      return "Waiting for Payment";
    case OrderStatus.WAITING_PAYMENT_CONFIRMATION:
      return "Waiting for Payment Confirmation";
    case OrderStatus.PREPARING:
      return "Preparing";
    case OrderStatus.SHIPPED:
      return "Shipped";
    case OrderStatus.SUCCESS:
      return "Succeeded";
    case OrderStatus.CANCELLED:
      return "Cancelled";
    default:
      return "Unknown";
  }
};
