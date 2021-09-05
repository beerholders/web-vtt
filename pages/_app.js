import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import { LoginProvider } from "../lib/LoginProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider locale={ptBR}>
      <QueryClientProvider client={queryClient}>
        <LoginProvider>
          <Component {...pageProps} />
        </LoginProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default MyApp;
