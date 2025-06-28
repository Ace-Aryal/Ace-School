import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/Templates/ErrorBondary";
import { Toaster } from "@/components/ui/sonner";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const persistor = persistStore(store);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
    <Toaster position="top-right" />
  </StrictMode>
);
