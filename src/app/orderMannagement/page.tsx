import React from "react";

const OrderManagement = () => {
  const orders = [
    {
      id: 1,
      name: "Peerawit",
      description: "High-performance tire",
      tireSize: "225/45R17",
      pattern: "All-Season",
      diameter: 650,
      width: 225,
      measurementRim: "17x7.5",
      standardRim: "17x7",
      wheel: "Alloy",
      type: "Passenger",
      quantity: 10,
      price: 3000,
      createdAt: "2024-01-01T10:00:00",
    },
    {
      id: 2,
      name: "Tanawat",
      description: "Durable off-road tire",
      tireSize: "265/70R16",
      pattern: "Mud-Terrain",
      diameter: 774,
      width: 265,
      measurementRim: "16x8",
      standardRim: "16x7",
      wheel: "Steel",
      type: "SUV",
      quantity: 15,
      price: 4500,
      createdAt: "2024-02-01T11:30:00",
    },
  ];

  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Create</button>
          <button className="bg-gray-300 px-4 py-2 rounded">Update</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Tire Size</th>
            <th className="px-4 py-2">Pattern & Type</th>
            <th className="px-4 py-2">Overall Diameter</th>
            <th className="px-4 py-2">Overall Width</th>
            <th className="px-4 py-2">Measurement Rim</th>
            <th className="px-4 py-2">Standard Rim</th>
            <th className="px-4 py-2">Wheel</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.name}</td>
              <td className="px-4 py-2">{order.description}</td>
              <td className="px-4 py-2">{order.tireSize}</td>
              <td className="px-4 py-2">{order.pattern}</td>
              <td className="px-4 py-2">{order.diameter}</td>
              <td className="px-4 py-2">{order.width}</td>
              <td className="px-4 py-2">{order.measurementRim}</td>
              <td className="px-4 py-2">{order.standardRim}</td>
              <td className="px-4 py-2">{order.wheel}</td>
              <td className="px-4 py-2">{order.type}</td>
              <td className="px-4 py-2">{order.quantity}</td>
              <td className="px-4 py-2">{order.price}</td>
              <td className="px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
