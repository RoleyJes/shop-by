<script setup>
import BreadCrumbs from "@/ui/BreadCrumbs.vue";

const breadcrumbs = [
  {
    path: "/",
    label: "Home",
  },
  {
    label: "Collections",
  },
];
</script>

<template>
  <BreadCrumbs :breadcrumbs="breadcrumbs" />
  <main class="mx-auto w-full max-w-container px-3.75 py-20 md:py-25">
    <div>Ask Mr David about this</div>
  </main>
</template>

<style lang="scss" scoped></style>
