<script setup>
defineProps({
  value: { type: Number },
})
</script>

<template>
  <span
    class="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-brand-accent text-xs text-white"
    >{{ value }}
  </span>
</template>

<style lang="scss" scoped></style>
