<script setup>
import { fetchSingleProduct } from "@/services/apiProducts";
import BreadCrumbs from "@/ui/BreadCrumbs.vue";
import ProductCard from "@/ui/ProductCard.vue";
import { useQuery } from "@tanstack/vue-query";
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { formatCurrency } from "@/utils/helpers";
import { Icon } from "@iconify/vue";
import QuantityOptions from "@/ui/QuantityOptions.vue";
import ButtonOrLink from "@/ui/ButtonOrLink.vue";

const route = useRoute();
const routeId = computed(() => route.params.id);
// const routeId = ref(route.params.id);

const agreed = ref(false);

const {
  isPending,
  data: product,
  error,
} = useQuery({
  queryKey: ["product", routeId],
  queryFn: () => fetchSingleProduct(routeId.value),
});

// It is product.value because useQuery returns a ref. So to access the product's name, we need to use product.value.name.
const BClabel = computed(() => product.value?.name || "Product");

const breadcrumbs = [
  {
    path: "/",
    label: "Home",
  },
  {
    label: BClabel,
  },
];

const skuData = [
  {
    label: "SKU:",
    value: 1415,
  },
  {
    label: "Vendor:",
    value: "Vendor 9",
  },
  {
    label: "Type:",
    value: "Type 9",
  },
  {
    label: "Share:",
    last: true,
  },
];

// watch(
//   // Why won't this work? Why do I have to use route.params.id instead of routeId.value?

//   // () => routeId.value,
//   () => route.params.id,
//   (newId) => {
//     routeId.value = newId;
//   },
// );

const localInputQuantity = computed({
  get() {
    return product.value?.quantity || 1;
  },
  set(val) {
    // This is where you would handle the logic to update the quantity in the backend or state management.
    console.log("New quantity:", val);
  },
});

// const localInputQuantity = ref(1);

// watch(
//   product,
//   (newProd) => {
//     if (!newProd) return;
//     localInputQuantity.value = newProd.quantity;
//   },
//   { immediate: true },
// );

const temp = reactive({
  id: 84,
  name: "Louis Vuitton Tote - DarkCyan (Large)",
  description:
    "Ut non iusto minus dolorem at. Saepe culpa sunt nostrum qui. Officia iure molestiae suscipit veritatis ducimus modi.",
  price: "644.19",
  stock: 110,
  image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
  hover_image: "https://images.unsplash.com/photo-1533659124865-d6072dc035e1?w=800&q=80",
  category: "Fashion",
  created_at: "2025-01-25T19:44:03.000000Z",
  updated_at: "2025-04-13T17:29:30.000000Z",
  quantity: 6,
  cart_id: 155,
});
</script>
<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs" />
  <main class="mx-auto w-full max-w-container px-3.75 py-20 md:py-25">
    <div v-if="isPending">Fetching...</div>
    <div v-else-if="error">{{ error.message }}</div>

    <section v-else class="grid grid-cols-1 gap-7.5 md:grid-cols-2">
      <!-- Image -->
      <div class="h-175">
        <img :src="product.image" :alt="product.name" class="size-full" />
      </div>

      <!-- Details -->

      <section class="space-y-3.75">
        <!-- Name -->
        <h2 class="text-2xl">{{ product.name }}</h2>
        <!-- Availability -->
        <p>
          Availability:
          <span class="font-semibold text-brand-accent"> {{ product.stock }} In Stock </span>
        </p>
        <!-- Price -->
        <div class="flex items-center gap-2.5">
          <span class="font-semibold text-[#aaa]">{{ formatCurrency(product.price) }}</span>
          <span class="text-lg font-semibold">{{ formatCurrency(product.price) }}</span>
          <p class="rounded-[15px] bg-brand-primary px-2.5 text-white">
            <span>Save -</span>
            <span>{XXX}%</span>
          </p>
        </div>
        <!-- Shipping -->
        <div class="flex items-center gap-7.5 font-semibold">
          <p class="flex items-center gap-2.5">
            <Icon icon="mdi:truck-outline" class="text-lg" />
            <span>Shipping</span>
          </p>
          <button
            class="flex items-center gap-1.5 transition-all duration-300 ease-out hover:text-brand-accent"
          >
            <Icon icon="mdi:email-outline" class="text-lg" />
            <span>Ask About This product</span>
          </button>
        </div>
        <!-- Quantity -->
        <div class="mb-10 flex items-center">
          <p class="basis-[25%]">Quantity:</p>
          <QuantityOptions :item="product" v-model="localInputQuantity" />
        </div>
        <!-- Cart/wishlist -->
        <div class="flex gap-5">
          <ButtonOrLink text="Add to Cart" />

          <!-- Wishlist -->
          <div class="group relative">
            <button
              class="peer flex h-12 w-12.5 items-center justify-center border border-[#d8d8d8] text-neutral-600 transition-all duration-300 ease-out hover:border-brand-primary hover:bg-brand-primary hover:text-white"
            >
              <Icon icon="mdi:heart-outline" class="size-6" />
            </button>

            <div
              class="invisible absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:bottom-full group-hover:opacity-100"
            >
              <p
                class="relative bg-brand-primary px-2 py-1.5 text-xs text-nowrap text-white shadow-xl lg:inline-block"
              >
                Add to wishlist
                <span
                  :class="[
                    `absolute text-xl text-brand-primary ${rightTriangle ? 'top-1/2 left-[95%] -translate-y-1/2' : 'top-full left-1/2 -translate-x-1/2 -translate-y-3 rotate-90'}`,
                  ]"
                  >&#9654;</span
                >
              </p>
            </div>
          </div>
        </div>
        <!-- Agree & Checkout btn-->
        <div>
          <div class="mb-4.5 flex items-center gap-2.5">
            <input id="t-and-c" type="checkbox" v-model="agreed" />
            <label for="t-and-c" class="text-neutral-600"
              >I agree with the terms and conditions</label
            >
          </div>
          <button
            :disabled="!agreed"
            class="w-full bg-[#ecd265] py-3 text-center text-black uppercase transition-all duration-200 ease-in-out hover:text-brand-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            buy it now
          </button>
        </div>
        <!-- Payment options -->
        <div class="mb-7.5">
          <p class="text-lg">Guaranteed safe checkout</p>
          <div>
            <img src="@/assets/productDetail/paymentOptions.avif" alt="payment options" />
          </div>
        </div>
        <!-- SKU, vendor section -->
        <div class="space-y-7.5 border-t border-t-[#e0e0e0] pt-6.25">
          <div v-for="(item, i) in skuData" :key="i" class="flex items-center gap-3.75">
            <p class="basis-16.25">
              {{ item.label }}
            </p>
            <div v-if="item.last" class="flex gap-1.5">
              <div class="flex size-10 items-center justify-center rounded-full text-white">
                <Icon :icon="item.icon" class="" />
              </div>
            </div>
            <p v-else class="text-[15px] text-neutral-600">{{ item.value }}</p>
          </div>
        </div>
      </section>
    </section>

    <!-- <ProductCard :product="temp" class="transition-all transition-discrete duration-500" /> -->
  </main>
</template>

<style lang="scss" scoped></style>
