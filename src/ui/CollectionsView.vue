<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs" :title="collection === 'all' ? 'products' : collection" />

  <!-- Shop page header -->
  <ShopPageHeader />

  <section
    class="mx-auto my-16.25 grid w-full max-w-container grid-cols-1 px-3.75 md:my-17.5 md:px-7.5 lg:mt-20 lg:mb-25 lg:grid-cols-[270px_1fr]"
  >
    <!-- Sidebar filters -->
    <aside class="hidden lg:block">test</aside>

    <!-- Products -->
    <main>
      <!-- Skeletons -->
      <div v-if="isPending" :class="`grid grid-cols-2 gap-6 md:grid-cols-${store.productsPerRow}`">
        <ProductCardSkeleton v-for="n in 6" :key="n" />
      </div>

      <!-- Error -->
      <div v-else-if="error">Error: {{ error.message }}</div>

      <!-- Products -->

      <div
        v-else
        :class="[
          'grid gap-6 md:gap-7',
          store.productsPerRow === 4 ? 'md:grid-cols-4' : '',
          store.productsPerRow === 3 ? 'md:grid-cols-3' : '',
          store.productsPerRow === 2 ? 'grid-cols-2' : '',
          store.productsPerRow === 1 ? 'grid-cols-1' : '',
        ]"
      >
        <div v-for="product in products" :key="product.id">
          <ProductCard :product="product" class="transition-all transition-discrete duration-500" />
        </div>
      </div>
    </main>
  </section>
</template>

<script setup>
import { useQuery } from "@tanstack/vue-query"
import ProductCard from "./ProductCard.vue"
import { fetchProducts } from "@/services/apiProducts"
import ProductCardSkeleton from "./ProductCardSkeleton.vue"
import ShopPageHeader from "./ShopPageHeader.vue"
import BreadCrumbs from "./BreadCrumbs.vue"
import { useRoute } from "vue-router"
import { computed, onBeforeUnmount, onMounted } from "vue"
import { useProductsStore } from "@/stores/products"

const route = useRoute()
const store = useProductsStore()

function updateGrid() {
  store.updateProductsPerRow(window.innerWidth < 768 ? 2 : 3)
}

onMounted(() => {
  updateGrid()
  window.addEventListener("resize", updateGrid)
})

const breadcrumbs = [
  {
    path: "/",
    label: "Home",
  },
  {
    label: "Products",
  },
]

const collection = computed(() => route.params.collection)

const {
  isPending,
  error,
  data: products,
} = useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateGrid)
})
</script>

<style lang="scss" scoped></style>
