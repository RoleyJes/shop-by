<script setup>
import useCart from "@/composables/useCart";
import BreadCrumbs from "@/ui/BreadCrumbs.vue";
import { Icon } from "@iconify/vue";
import { formatCurrency } from "@/utils/helpers";
import { reactive } from "vue";
import { watch } from "vue";

const { cartData, deletingId, deleteFromCart, addToCart, updateCart, updatingId } = useCart();

const breadcrumbs = [
  {
    path: "/",
    label: "Home",
  },
  {
    label: "Cart",
  },
];

const localInputQuantity = reactive({});

watch(
  cartData,
  (items) => {
    if (!items) return;
    items.forEach((item) => {
      localInputQuantity[item.id] = item.quantity;
    });
  },
  { immediate: true },
);
</script>

<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs" />
  <main class="mx-auto w-full max-w-container px-3.75 py-20 md:py-25">
    <!-- headers -->
    <div class="grid grid-cols-[1fr_163px_286px_163px_160px] border border-neutral-200">
      <h3 class="border-r border-r-neutral-200 py-4 text-center uppercase">product</h3>
      <h3 class="border-r border-r-neutral-200 py-4 text-center uppercase">price</h3>
      <h3 class="border-r border-r-neutral-200 py-4 text-center uppercase">quantity</h3>
      <h3 class="border-r border-r-neutral-200 py-4 text-center uppercase">total</h3>
      <h3 class="py-4 text-center uppercase"></h3>
    </div>

    <!-- Items -->
    <div v-for="cartItem in cartData" :key="cartItem.id">
      <div
        class="relative grid h-40 grid-cols-[1fr_163px_286px_163px_160px] divide-x divide-neutral-200 overflow-hidden border-x border-b border-neutral-200"
      >
        <!-- Image and name cell -->
        <div class="grid grid-cols-[115px_1fr] divide-x divide-neutral-200">
          <!-- image -->
          <div class="flex items-center justify-center ps-6.25 pe-3.75">
            <img :src="cartItem.image" :alt="cartItem.name" />
          </div>

          <!-- name -->
          <div class="flex items-center justify-center ps-6.25 pe-3.75">
            <p class="ps-6.25 pe-3.75 text-center text-neutral-600">{{ cartItem.name }}</p>
          </div>
        </div>

        <!-- Price -->
        <div class="flex items-center justify-center ps-6.25 pe-3.75">
          <p class="font-semibold">{{ formatCurrency(cartItem.price) }}</p>
        </div>

        <!-- Quantity -->
        <div class="flex items-center justify-center ps-6.25 pe-3.75">
          <div class="border-b-2 border-b-[#cccccc] pb-4">
            <button
              :disabled="deletingId === cartItem.id || updatingId === cartItem.id"
              @click="updateCart({ id: cartItem.id, type: 'decrement' })"
              class="text-xl disabled:cursor-not-allowed!"
            >
              <span>-</span>
            </button>
            <input
              type="text"
              v-model="localInputQuantity[cartItem.id]"
              class="w-20 px-3.75 text-center focus:outline-0"
              @blur="
                () => {
                  addToCart({ product_id: cartItem.id, quantity: localInputQuantity[cartItem.id] });
                }
              "
            />
            <button
              :disabled="deletingId === cartItem.id || updatingId === cartItem.id"
              class="w-5 text-xl disabled:cursor-not-allowed!"
              @click="updateCart({ id: cartItem.id, type: 'increment' })"
            >
              <span>+</span>
            </button>
          </div>
        </div>

        <!-- Total -->
        <div class="flex items-center justify-center ps-6.25 pe-3.75">
          <p class="font-semibold">{{ formatCurrency(cartItem.quantity * cartItem.price) }}</p>
        </div>

        <!-- Delete btn -->
        <div class="flex items-center justify-center ps-6.25 pe-3.75">
          <button
            class="group flex size-11.25 items-center justify-center border-2 border-[#e6e6e6] transition-all duration-250 ease-out hover:border-brand-accent disabled:cursor-not-allowed! disabled:bg-gray-100/50 disabled:hover:border-[#e6e6e6]"
            :disabled="deletingId === cartItem.id"
            @click="deleteFromCart(cartItem.id)"
          >
            <Icon
              :icon="deletingId === cartItem.id ? 'eos-icons:bubble-loading' : 'iconoir:cancel'"
              class="text-[22px] text-[#ababab] transition-all duration-250 ease-out group-hover:text-brand-accent group-disabled:text-[#ababab]"
            />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
