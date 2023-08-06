import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./theme";
import { GlobalStyle } from "./global";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = new QueryClient();
const clientId = "753812416039-gf53l1ivqv738rptcutuhnep6hp7to96.apps.googleusercontent.com";
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <GoogleOAuthProvider clientId={clientId}>
          <App />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);