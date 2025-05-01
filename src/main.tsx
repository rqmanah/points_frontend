import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// Import Swiper styles
import "./index.css";
import "swiper/css";
import Root from "./Root.tsx";
import { UserProvider } from "./utils/userContext.tsx";
import { LocationProvider } from "./context/LocationContext.tsx";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
        <LocationProvider>

          <Root />
        </LocationProvider>
          {/* <ToastContainer /> */}
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  </React.Fragment>
);
