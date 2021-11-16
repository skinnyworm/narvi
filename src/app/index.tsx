import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { store } from "app/store";
import theme from "./theme";
import DashboardPage from "./DashboardPage";
import NewWidgetPage from "./NewWidgetPage";
import WidgetPage from "./WidgetPage";
import LandingPage from "./LandingPage";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard">
              <Route index element={<DashboardPage />} />
              <Route path="new" element={<NewWidgetPage />} />
              <Route path=":id" element={<WidgetPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
