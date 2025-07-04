import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppRoutes from "./Pages/Router/Router"
import store from "./Pages/Slice/store"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <AppRoutes />
        </Provider>
    </QueryClientProvider>
  </StrictMode>
)