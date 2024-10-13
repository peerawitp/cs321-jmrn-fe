"use client";

interface CartItemUpdaterProps {
  productId: number;
  productSizeId: number;
  quantity: number;
  increaseQuantity: (productId: number, productSizeId: number) => void;
  decreaseQuantity: (productId: number, productSizeId: number) => void;
}

const CartItemUpdater: React.FC<CartItemUpdaterProps> = ({
  productId,
  productSizeId,
  quantity,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="flex items-center space-x-4">
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
