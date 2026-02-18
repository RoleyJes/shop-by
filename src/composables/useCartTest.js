// import { useAuthStore } from "@/stores/auth";
// import useServerCart from "./useServerCart";
// import useGuestCart from "./useGuestCart";

// export function useCart() {
//   const authStore = useAuthStore();

//   if (authStore.isAuthenticated) {
//     return useServerCart();
//   } else {
//     return useGuestCart();
//   }
// }

// composables/useCart.js
import { useAuthStore } from "@/stores/auth";
import { ref, computed } from "vue";
import useServerCart from "./useCart";
import { useGuestCart } from "./useGuestCart";

export function useCart() {
  const authStore = useAuthStore();

  // ✅ Authenticated user → Vue Query cart
  if (authStore.isAuthenticated) {
    const serverCart = useServerCart();

    return {
      cartData: serverCart.cartData,
      totalAmt: serverCart.totalAmt,
      cartLength: serverCart.cartLength,
      addToCart: serverCart.addToCart,
      deleteFromCart: serverCart.deleteFromCart,
      updateCart: serverCart.updateCart,
      updateCartbyQuantityInput: serverCart.updateCartbyQuantityInput,
      clearCart: serverCart.clearCart,

      // Status flags normalized
      isFetchingCart: serverCart.isFetchingCart,
      isAddingToCart: serverCart.isAddingToCart,
      isDeleting: serverCart.isDeleting,
      isUpdating: computed(() => !!serverCart.updatingId),
      isClearingCart: serverCart.isClearingCart,
      deletingId: serverCart.deletingId,
      updatingId: serverCart.updatingId,
      fetchCartError: serverCart.fetchCartError,
    };
  }

  // ✅ Guest user → Pinia cart
  const guestCart = useGuestCart();

  // For guest, no network operations → all flags false
  const isFetchingCart = ref(false);
  const isAddingToCart = ref(false);
  const isDeleting = ref(false);
  const isUpdating = ref(false);
  const isClearingCart = ref(false);
  const deletingId = ref(null);
  const updatingId = ref(null);
  const fetchCartError = ref(null);

  return {
    cartData: guestCart.cart,
    totalAmt: guestCart.totalAmt,
    cartLength: guestCart.count,
    addToCart: guestCart.addToLocalStorageCart,
    deleteFromCart: guestCart.deleteFromCart,
    updateCart: undefined, // guest cart doesn't support server updates
    updateCartbyQuantityInput: undefined,
    clearCart: undefined, // optional: can implement clearing guest cart

    // Status flags
    isFetchingCart,
    isAddingToCart,
    isDeleting,
    isUpdating,
    isClearingCart,
    deletingId,
    updatingId,
    fetchCartError,
    offcanvasCart: guestCart.offcanvasCart,
    toggleOffcanvasCart: guestCart.toggleOffcanvasCart,
  };
}
