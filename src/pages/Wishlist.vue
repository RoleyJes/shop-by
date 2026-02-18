<script setup>
import useWishlist from "@/composables/useWishlist";
import BreadCrumbs from "@/ui/BreadCrumbs.vue";
import ProductCard from "@/ui/ProductCard.vue";
import ProductCardSkeleton from "@/ui/ProductCardSkeleton.vue";
// import { computed } from "vue"

// const wishlistStore = useWishlistStore()

const { wishlistData, wishlistLength, isFetchingWishlist, fetchWishlistError } = useWishlist();

const breadcrumbs = [
  {
    path: "/",
    label: "Home",
  },
  {
    label: "Wishlist",
  },
];
</script>

<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs" />
  <main class="mx-auto w-full max-w-container px-3.75 py-20 md:py-25">
    <!-- Loading -->
    <div v-if="isFetchingWishlist" class="grid grid-cols-2 gap-6 lg:grid-cols-4">
      <ProductCardSkeleton v-for="n in 4" :key="n" />
    </div>

    <!-- Empty list -->
    <div class="space-y-2" v-else-if="wishlistLength <= 0">
      <h2 class="text-4xl">Your wishlist is currently empty!</h2>
      <p class="text-neutral-600">
        Continue browsing
        <RouterLink
          class="font-bold text-brand-primary transition-all duration-300 hover:underline"
          to="/collections/all"
          >here.</RouterLink
        >
      </p>
    </div>

    <!-- Error -->
    <div v-else-if="fetchWishlistError">{{ fetchWishlistError.message }}</div>

    <!-- Wishlist items -->
    <section
      v-else
      class="grid grid-cols-2 gap-3.75 md:grid-cols-3 md:gap-7.5 md:px-3.75 lg:grid-cols-4"
    >
      <div v-for="product in wishlistData" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped></style>
