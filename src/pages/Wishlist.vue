<script setup>
import useWishlist from "@/composables/useWishlist";
import BreadCrumbs from "@/ui/BreadCrumbs.vue";
import ProductCard from "@/ui/ProductCard.vue";
// import { computed } from "vue"

// const wishlistStore = useWishlistStore()

const { wishlistData, wishlistLength } = useWishlist();

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
    <div class="space-y-2" v-if="!wishlistLength">
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
