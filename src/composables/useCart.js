import {
  addToCart as addToCartApi,
  deleteFromCart as deleteFromCartApi,
  getCart,
  updateCart as updateCartApi,
} from "@/services/apiCart";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, ref } from "vue";
import toast from "vue3-hot-toast";

export default function useCart() {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  const deletingId = ref(null);
  const updatingId = ref(null);

  // Fetch cart
  const { isPending: isFetchingCart, data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: authStore.isAuthenticated,
  });

  // Add to cart
  const { isPending: isAddingToCart, mutate: addToCart } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // Delete from cart
  const { mutate: deleteFromCart } = useMutation({
    mutationFn: deleteFromCartApi,
    onMutate: (id) => {
      deletingId.value = id;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      deletingId.value = null;
    },
  });

  // Update cart
  const { mutate: updateCart } = useMutation({
    mutationFn: updateCartApi,
    onMutate: ({ id }) => {
      updatingId.value = id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
    onSettled: () => {
      updatingId.value = null;
    },
  });

  // Computed total amt
  const totalAmt = computed(() =>
    cartData.value.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0),
  );

  // Computed cart length
  const cartLength = computed(() => cartData.value?.length ?? 0);

  return {
    isFetchingCart,
    cartData,
    cartLength,
    isAddingToCart,
    addToCart,
    totalAmt,
    deleteFromCart,
    deletingId,
    updatingId,
    updateCart,
  };
}
