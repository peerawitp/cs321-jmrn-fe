import { OrderStatus } from "@/interfaces/Order";

export const getOrderStatusText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PROCESSING:
      return "กำลังประมวลผล";
    case OrderStatus.WAITING_PAYMENT:
      return "รอการชำระเงิน";
    case OrderStatus.PREPARING:
      return "กำลังจัดเตรียมสินค้า";
    case OrderStatus.SHIPPED:
      return "จัดส่งสำเร็จ";
    case OrderStatus.SUCCESS:
      return "เสร็จสิ้น";
    default:
      return "Unknown";
  }
};
