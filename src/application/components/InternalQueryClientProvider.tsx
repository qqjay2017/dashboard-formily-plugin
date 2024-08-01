import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import React from "react";

export default function InternalQueryClientProvider(props: PropsWithChildren) {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: 1000 * 60 * 5,
              refetchOnWindowFocus: false,
              retry: false,
            },
          },
        })
      }
    >
      {props.children}
    </QueryClientProvider>
  );
}
