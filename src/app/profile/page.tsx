import React from 'react';
import Image from 'next/image';

// ตัวอย่างข้อมูลคำสั่งซื้อ (สมมุติว่ามาจาก API หรือฐานข้อมูล)
const orders = [
  {
    orderId: 1,
    date: '2023-09-01',
    status: 'Delivered',
    total: 1200.50,
    items: [
      { productName: 'Motorcycle Tire - 120/70-17', quantity: 2, price: 600.25, imageUrl: '/images/product2.jpg' },
      { productName: 'Motorcycle Tire - 120/70-17', quantity: 2, price: 600.25, imageUrl: '/images/product2.jpg' },
      { productName: 'Motorcycle Tire - 120/70-17', quantity: 2, price: 600.25, imageUrl: '/images/product2.jpg' }
    ],
  },
  {
    orderId: 2,
    date: '2023-08-20',
    status: 'Shipped',
    total: 1800.75,
    items: [
      { productName: 'Motorcycle Tire - 180/55-17', quantity: 2, price: 900.37, imageUrl: '/images/product2.jpg' },
    ],
  },
];

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        {/* ข้อมูลผู้ใช้ */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Customer Information</h2>
          <p>Email: john.doe@example.com</p>
          <p>Phone: 0801234567</p>
          <div className="bg-gray-50 p-3 rounded">
            <p>Address: 1234 Main St, Springfield, IL 62701</p>
            <p>Country: United States</p>
            <p>Postal Code: 62701</p>
            <button className='bg-blue-500 w-full  text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>Edit Adress</button>
          </div>
          
          
        </div>

        {/* ประวัติคำสั่งซื้อ */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.orderId} className="p-4 bg-gray-50 rounded shadow">
                  <h3 className="text-lg font-bold mb-2">Order #{order.orderId}</h3>
                  <p>Date: {order.date}</p>
                  <p>Status: <span className="font-semibold">{order.status}</span></p>
                  <p>Total: ${order.total.toFixed(2)}</p>

                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Items</h4>
                    <ul className="list-disc list-inside">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex items-center space-x-4">
                          {/* แสดงรูปภาพสินค้า */}
                          <Image 
                            src={item.imageUrl} 
                            alt={item.productName} 
                            width={50} 
                            height={50} 
                            className="rounded"
                          />
                          <span>{item.productName} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
