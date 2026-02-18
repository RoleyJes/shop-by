import {
  addToWishlist as addToWishlistApi,
  deleteFromWishlist as deleteFromWishlistAPi,
  getWishlist,
} from "@/services/apiWishlist";
import { useAuthStore } from "@/stores/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed } from "vue";
import toast from "vue3-hot-toast";

export default function useWishlist() {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch wishlist
  const {
    isPending: isFetchingWishlist,
    data: wishlistData,
    error: fetchWishlistError,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: computed(() => authStore.isAuthenticated), //This would auto fetch the Wishlist when the user's authenticated (loggedin/registered)
  });

  // Add to wishlist
  const { isPending: isAddingToWishlist, mutate: addToWishlist } = useMutation({
    mutationFn: addToWishlistApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // Delete from wishlist
  const { isPending: isDeletingFromWishlist, mutate: deleteFromWishlist } = useMutation({
    mutationFn: deleteFromWishlistAPi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isInWishlist = (productId) => {
    return wishlistData.value?.some((item) => item.id === productId);
  };

  // Toggle wihslist
  const toggleWishlist = (productId) => {
    // const index = wishlistData.value.findIndex((p) => p.id === product.id);
    if (isInWishlist(productId)) {
      deleteFromWishlist(productId);
    } else {
      addToWishlist({ product_id: productId });
    }
  };

  // Computed wishlist length
  const wishlistLength = computed(() => wishlistData.value?.length ?? 0);

  return {
    isFetchingWishlist,
    wishlistData,
    fetchWishlistError,
    isAddingToWishlist,
    addToWishlist,
    isDeletingFromWishlist,
    deleteFromWishlist,
    isInWishlist,
    toggleWishlist,
    wishlistLength,
  };
}
