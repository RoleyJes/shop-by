import { defineStore } from "pinia";
import { computed } from "vue";
import { ref } from "vue";
import toast from "vue3-hot-toast";

export const useCartStore = defineStore("cart", () => {
  const cartLS = ref(JSON.parse(localStorage.getItem("cartLS")) || []);
  const offcanvasCart = ref(false);

  const count = computed(() => cartLS.value.length);

  const totalAmt = computed(() =>
    cartLS.value.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0),
  );

  function getIndex(id) {
    return cartLS.value.findIndex((i) => i.id === id);
  }

  function toggleOffcanvasCart() {
    offcanvasCart.value = !offcanvasCart.value;
  }

  // Add to cart for unauthenticated users
  const addToLocalStorageCart = (product) => {
    const existingItem = cartLS.value.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
      toast.success("Product added to cart");
    } else {
      cartLS.value.unshift({ ...product, quantity: 1 });
      toast.success("Product added to cart");
    }

    localStorage.setItem("cartLS", JSON.stringify(cartLS.value));
  };

  function deleteFromCart(id) {
    const index = getIndex(id);

    if (index !== -1) {
      cartLS.value.splice(index, 1);
    }
    localStorage.setItem("cartLS", JSON.stringify(cartLS.value));
  }

  return {
    cartLS,
    offcanvasCart,
    toggleOffcanvasCart,
    addToLocalStorageCart,
    count,
    totalAmt,
    deleteFromCart,
  };
});
