<script setup>
import GeneralFooter from "./GeneralFooter.vue"
import GeneralNavbar from "./GeneralNavbar.vue"
</script>

<template>
  <div class="flex h-screen flex-col">
    <GeneralNavbar />
    <RouterView />
    <GeneralFooter />
  </div>
</template>

<style scoped></style>
