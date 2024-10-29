interface CreateOrder {
  addressId: number;
  orderItems: OrderItemForPurchase[];
}

interface OrderItemForPurchase {
  productId: number;
  productSizeId: number;
  quantity: number;
}
