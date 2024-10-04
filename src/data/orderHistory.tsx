export const orderHistory = [
  {
    orderId: "123456",
    date: "2024-09-28",
    total: 250.00,
    status: "Delivered",
    shippingAddress: {
      fullName: "John Doe",
      addressLine1: "1234 Main St",
      addressLine2: "Apt 101",
      city: "Springfield",
      state: "IL",
      postalCode: "62701",
      country: "USA",
    },
    items: [
      {
        productId: 1, // อ้างอิง productId แทน productName
        size: "120/70 ZR17", // ใช้ขนาดที่เลือก
        quantity: 2,
      },
      {
        productId: 2,
        size: "180/55 ZR17",
        quantity: 1,
      },
    ],
  },
  {
    orderId: "654321",
    date: "2024-09-15",
    total: 180.00,
    status: "Shipped",
    shippingAddress: {
      fullName: "Jane Smith",
      addressLine1: "5678 Oak St",
      addressLine2: "Suite 202",
      city: "Metropolis",
      state: "NY",
      postalCode: "10001",
      country: "USA",
    },
    items: [
      {
        productId: 2,
        size: "180/55 ZR17",
        quantity: 2,
      },
    ],
  },
];
