import { OrderStatus } from "@/interfaces/Order";

export const getOrderStatusText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PROCESSING:
      return "กำลังประมวลผล";
    case OrderStatus.WAITING_PAYMENT:
      return "รอการชำระเงิน";
    case OrderStatus.WAITING_PAYMENT_CONFIRMATION:
      return "รอการตรวจสอบการชำระเงิน";
    case OrderStatus.PREPARING:
      return "กำลังจัดเตรียมสินค้า";
    case OrderStatus.SHIPPED:
      return "อยู่ระหว่างการขนส่ง";
    case OrderStatus.SUCCESS:
      return "จัดส่งสำเร็จ";
    case OrderStatus.CANCELLED:
      return "ยกเลิก";
    default:
      return "Unknown";
  }
};
