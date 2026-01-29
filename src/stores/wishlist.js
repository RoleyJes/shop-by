import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useWishlistStore = defineStore("wishlist", () => {
  const wishlist = ref([])
  const count = computed(() => wishlist.value.length)

  function toggleWishlist(product) {
    const index = wishlist.value.findIndex((p) => p.id === product.id)

    if (index !== -1) {
      wishlist.value.splice(index, 1)
    } else {
      wishlist.value.push(product)
    }
  }

  return { wishlist, toggleWishlist, count }
})
