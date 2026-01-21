<script setup>
import BreadCrumbs from "@/ui/BreadCrumbs.vue"

const breadcrumbs = [
  {
    path: "/",
    label: "Home",
  },
  {
    label: "Wishlist",
  },
]
</script>

<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs" />
  <main></main>
</template>

<style lang="scss" scoped></style>
