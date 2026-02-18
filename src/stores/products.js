import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductsStore = defineStore("products", () => {
  const productsPerRow = ref(3);

  function updateProductsPerRow(num) {
    productsPerRow.value = num;
  }

  return { productsPerRow, updateProductsPerRow };
});
