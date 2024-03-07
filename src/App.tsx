import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/Pages/Home";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { theme } from "./styles/material";
import { CacheProvider } from "@emotion/react";
import { cacheRtl } from "./styles/cache";
import { GlobalStyled } from "./styles/global";
import TermsPage from "./components/Pages/Terms";
import DetailPage from "./components/Pages/Detail";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClientStore } from "./services/QueryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const App: React.FC = (): JSX.Element => {
  return (
    <QueryClientProvider client={QueryClientStore}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <GlobalStyles styles={GlobalStyled} />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="items/:id" element={<DetailPage />} />
                  <Route path="terms" element={<TermsPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
            <CssBaseline />
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </QueryClientProvider>
  );
};
