<script setup>
import { defineProps } from "vue"
defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    // default: "medium",
  },
})

const types = {
  medium: "text-[10px] md:text-sm py-1.5 leading-6 px-4 md:py-2.5 md:px-11.5",
}
</script>

<template>
  <button
    :class="[
      'inline-block cursor-pointer rounded-none border border-brand-primary bg-brand-primary font-medium tracking-[1px] text-white uppercase transition-all duration-300 hover:bg-[#0000] hover:text-brand-primary',
      types[type],
    ]"
  >
    {{ text }}
  </button>
</template>

<style lang="scss" scoped></style>
