export const orderDetails = {
  orderId: "123456",
  date: "2024-10-01",
  total: 250.00,
  shippingAddress: {
    id: 1, // เพิ่ม id ถ้าจำเป็น
    userId: "peerawith",
    houseNumber: "1234",
    village: "Village A",
    alley: "Alley B",
    street: "Main St",
    subDistrict: "Sub-District D",
    district: "District E",
    province: "IL",
    postalCode: "62701",
    country: "USA",
  },
  items: [
    {
      productId: 1,
      size: "120/70 ZR17",
      quantity: 2,
    },
    {
      productId: 2,
      size: "180/55 ZR17",
      quantity: 1,
    },
  ],
};
