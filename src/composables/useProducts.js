import { fetchAllProducts, fetchProductsByTab } from "@/services/apiProducts";
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { ref } from "vue";

export function useProducts() {
  const tab = ref("new");
  const page = ref(1);
  const url = ref(null);

  // Fetch all products
  const {
    isPending: isFetchingAllProducts,
    data: allProductsData,
    error: allProductsError,
  } = useQuery({
    queryKey: computed(() => ["products", page.value, url.value]),
    queryFn: () => fetchAllProducts({ page: page.value, url: url.value }),
  });

  // Fetch products by tab
  const { isPending: isFetchingByTab, data: tabbedProducts } = useQuery({
    queryKey: computed(() => ["products", tab.value]),
    queryFn: () => fetchProductsByTab(tab.value),
  });

  return {
    isFetchingAllProducts,
    tab,
    page,
    url,
    allProductsData,
    allProductsError,
    isFetchingByTab,
    tabbedProducts,
  };
}
