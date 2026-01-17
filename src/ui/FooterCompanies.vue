<script setup>
import AmericanExpress from "@/assets/svgIconComponents.vue/AmericanExpress.vue"
import DinersClub from "@/assets/svgIconComponents.vue/DinersClub.vue"
import Discover from "@/assets/svgIconComponents.vue/Discover.vue"
import MasterCard from "@/assets/svgIconComponents.vue/MasterCard.vue"
import Paypal from "@/assets/svgIconComponents.vue/Paypal.vue"
import Visa from "@/assets/svgIconComponents.vue/Visa.vue"
import { markRaw, ref } from "vue"

const companies = ref([
  {
    icon: markRaw(Visa),
    title: "Visa",
  },
  {
    icon: markRaw(MasterCard),
    title: "Mastercard",
  },
  {
    icon: markRaw(Paypal),
    title: "Paypal",
  },
  {
    icon: markRaw(AmericanExpress),
    title: "American Express",
  },
  {
    icon: markRaw(DinersClub),
    title: "Diners Club",
  },
  {
    icon: markRaw(Discover),
    title: "Discover",
  },
])
</script>

<template>
  <ul class="mt-10 mb-5 flex items-center justify-end gap-2.5">
    <li v-for="item in companies" :key="item.title" :title="item.title">
      <component :is="item.icon" />
    </li>
  </ul>
</template>
