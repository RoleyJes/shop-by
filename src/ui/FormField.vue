<template>
  <input
    :type="inputType"
    :placeholder="placeholder"
    class="inline-block w-full placeholder:text-brand-primary bg-white px-5 py-2 text-sm text-brand-primary"
  />
</template>

<script setup>
import { defineProps } from "vue"
defineProps({
  inputType: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
})
</script>

<style lang="scss" scoped></style>
