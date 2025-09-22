import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import Routing from "./Routing";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { SettingsConsumer, SettingsProvider } from "./contexts/settings";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "./theme";
import { Toaster } from "react-hot-toast";
import { UserLocationProvider } from "./contexts/location";
import ThemeToggle from "./dev/ThemeToggle";
import { PersistGate } from "redux-persist/integration/react";
import useFrameBuster from "./hooks/useFrameBuster";

const App = () => {
  useFrameBuster();
  return  (
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => (
              <ThemeProvider theme={createTheme(settings.theme)}>
                <CssBaseline />
                <Toaster
                  toastOptions={{ className: "toast" }}
                  position="top-right"
                />
                <UserLocationProvider>
                  <Routing />
                </UserLocationProvider>
                <ThemeToggle />
              </ThemeProvider>
            )}
          </SettingsConsumer>
        </SettingsProvider>
      </PersistGate>
    </Provider>
  </>
);
}
ReactDOM.render(<App />, document.getElementById("app"));
