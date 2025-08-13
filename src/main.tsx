import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import { AuthProvider } from "./contexts/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
