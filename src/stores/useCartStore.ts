import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartStoreState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (productId: number, productSizeId: number) => void;
  decreaseQuantity: (productId: number, productSizeId: number) => void;
  removeItem: (productId: number, productSizeId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item: CartItem) => {
        set((state: CartStoreState) => {
          const existingItem = state.cartItems.find(
            (cartItem: CartItem) =>
              cartItem.productId === item.productId &&
              cartItem.productSizeId === item.productSizeId,
          );
          if (existingItem) {
            existingItem.quantity += item.quantity;
            existingItem.totalPrice =
              existingItem.price * existingItem.quantity;
          } else {
            state.cartItems.push(item);
          }
          return { cartItems: state.cartItems };
        });
      },
      increaseQuantity: (productId: number, productSizeId: number) => {
        set((state: CartStoreState) => {
          const existingItem = state.cartItems.find(
            (cartItem: CartItem) =>
              cartItem.productId === productId &&
              cartItem.productSizeId === productSizeId,
          );
          if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice =
              existingItem.price * existingItem.quantity;
          }
          return { cartItems: state.cartItems };
        });
      },
      decreaseQuantity: (productId: number, productSizeId: number) => {
        set((state: CartStoreState) => {
          const existingItem = state.cartItems.find(
            (cartItem: CartItem) =>
              cartItem.productId === productId &&
              cartItem.productSizeId === productSizeId,
          );
          if (existingItem) {
            if (existingItem.quantity > 1) {
              existingItem.quantity -= 1;
              existingItem.totalPrice =
                existingItem.price * existingItem.quantity;
            }
          }
          return { cartItems: state.cartItems };
        });
      },
      removeItem: (productId: number, productSizeId: number) => {
        set((state: CartStoreState) => {
          const index = state.cartItems.findIndex(
            (cartItem: CartItem) =>
              cartItem.productId === productId &&
              cartItem.productSizeId === productSizeId,
          );
          if (index !== -1) {
            state.cartItems.splice(index, 1);
          }
          return { cartItems: state.cartItems };
        });
      },
      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cart-store", // The key in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    },
  ),
);
