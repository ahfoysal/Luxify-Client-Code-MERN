import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";
import AuthProvider from "./hooks/AuthContextProvider";
import { ThemeProvider } from "./hooks/useTheme";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthProvider>
            <main className="min-h-screen  overflow-hidden font-poppins text-foreground bg-background">
              <RouterProvider
                location={location}
                key={location}
                router={routes}
              />
            </main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </NextUIProvider>
  </React.StrictMode>
);
