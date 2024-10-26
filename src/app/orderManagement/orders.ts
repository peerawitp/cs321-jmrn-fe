// orders.ts
import { Order, OrderStatus } from "./types";

export const orders: Order[] = [
  {
    id: 1,
    customerName: "Peerawit",
    address: "Victory Monument",
    status: OrderStatus.PAYMENT_PENDING,
    createdAt: new Date("2023-10-01T10:00:00"),
  },
  {
    id: 2,
    customerName: "Tanawat",
    address: "Rangsit",
    status: OrderStatus.PREPARING,
    createdAt: new Date("2023-10-03T12:00:00"),
  },
  {
    id: 3,
    customerName: "Nakorn",
    address: "Pinkao",
    status: OrderStatus.SHIPPED,
    createdAt: new Date("2023-10-02T14:00:00"),
  },
  {
    id: 4,
    customerName: "Narisara",
    address: "Phayathai",
    status: OrderStatus.DELIVERED,
    createdAt: new Date("2023-10-04T16:00:00"),
  },
];
