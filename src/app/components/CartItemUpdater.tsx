"use client";

interface CartItemUpdaterProps {
  productId: number;
  size: string;
  quantity: number;
  increaseQuantity: (productId: number, size: string) => void;
  decreaseQuantity: (productId: number, size: string) => void;
}

const CartItemUpdater: React.FC<CartItemUpdaterProps> = ({
  productId,
  size,
  quantity,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => decreaseQuantity(productId, size)}
        className="px-3 py-1 text-gray-700 bg-gray-200 rounded"
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => increaseQuantity(productId, size)}
        className="px-3 py-1 text-gray-700 bg-gray-200 rounded"
      >
        +
      </button>
    </div>
  );
};

export default CartItemUpdater;
