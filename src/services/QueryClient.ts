import { QueryClient } from "@tanstack/react-query";

export const QueryClientStore = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 5
    }
  }
});
