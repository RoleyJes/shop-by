import { getUser } from "@/services/apiAuth";
import { useAuthStore } from "@/stores/auth";
import { useQuery } from "@tanstack/vue-query";

export function useUser() {
  const authStore = useAuthStore();

  const { isPending, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: authStore.isAuthenticated,
  });

  return { isPending, user };
}
