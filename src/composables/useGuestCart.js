import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

export function useGuestCart() {
  const cartStore = useCartStore();

  // Destructure reactive state safely
  const { cartLS, offcanvasCart, count, totalAmt } = storeToRefs(cartStore);

  const toggleOffcanvasCart = () => cartStore.toggleOffcanvasCart();
  const addToCart = (product) => cartStore.addToLocalStorageCart(product);
  const deleteFromCart = (id) => cartStore.deleteFromCart(id);

  return {
    cartData: cartLS,
    offcanvasCart,
    toggleOffcanvasCart,
    addToCart,
    deleteFromCart,
    cartLength: count,
    totalAmt,
  };
}
