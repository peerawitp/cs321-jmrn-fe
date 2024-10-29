"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
interface CartItemUpdaterProps {
  productId: number;
  productSizeId: number;
  quantity: number;
  increaseQuantity: (productId: number, productSizeId: number) => void;
  decreaseQuantity: (productId: number, productSizeId: number) => void;
  removeItem: (productId: number, productSizeId: number) => void; // เพิ่ม prop สำหรับ removeItem
}


const CartItemUpdater: React.FC<CartItemUpdaterProps> = ({
  productId,
  productSizeId,
  quantity,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) => {
  
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => removeItem(productId, productSizeId)} // เมื่อคลิกปุ่ม Remove จะลบสินค้าออก
        className="text-red-600 hover:text-red-700"
      >
        <FontAwesomeIcon icon={faTrashCan} size='xl' />
      </button>
      <button
        onClick={() => decreaseQuantity(productId, productSizeId)}
        className="px-3 py-1 text-gray-700 bg-gray-200 rounded"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => increaseQuantity(productId, productSizeId)}
        className="px-3 py-1 text-gray-700 bg-gray-200 rounded"
      >
        +
      </button>
    </div>
  );
};

export default CartItemUpdater;
