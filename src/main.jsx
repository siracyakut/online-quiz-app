import "~/assets/css/tailwind.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routes from "~/routes";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { Provider } from "react-redux";
import store from "~/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

setLogger({
  log: () => {},
  warn: () => {},
  error: () => {},
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
        <RouterProvider router={routes} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </Provider>,
);
