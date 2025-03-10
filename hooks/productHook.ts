import { getProducts } from "@/actions/action";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts(){
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const queryClient = useQueryClient()
    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
      });
    return {
        products:productsQuery.data ?? [],
        isLoading:productsQuery.isLoading,
        error:productsQuery.error
    }
}