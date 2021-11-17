import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { store, useAppSelector, fetchAll } from "app/store";
import theme from "./theme";
import { LandingPage } from "./landing";
import { DashboardPage } from "./dashboard";
import { WidgetPage, NewWidgetPage } from "./editor";
import { NotFound } from "./NotFound";

const AppRoutes = () => {
  const auth = useAppSelector((state) => state.auth);
  if (!auth.loaded) {
    return null;
  }
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/dashboard">
        <Route index element={<DashboardPage />} />
        <Route path="new" element={<NewWidgetPage />} />
        <Route path=":id" element={<WidgetPage />} />
      </Route>
    </Routes>
  );
};

export default function App() {
  React.useEffect(() => {
    fetchAll(store);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
