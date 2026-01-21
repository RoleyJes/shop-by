<template>
  <div>
    <label v-if="label" :for="inputId" class="mb-2 inline-block text-[15px]">{{ label }}</label>
    <input
      :type="inputType"
      :placeholder="placeholder"
      :class="[
        'inline-block h-10 w-full bg-white py-2 text-sm text-brand-primary placeholder:text-brand-primary focus:outline-none',
        label ? 'px-2.5' : 'px-5',
      ]"
    />
  </div>
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
  label: {
    type: String,
    required: false,
  },
  inputId: {
    type: String,
    required: false,
  },
})
</script>

<style lang="scss" scoped></style>
