import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App.tsx"
import { StoresProvider } from "./stores/StoresProvider.tsx"
import { AppThemeProvider } from "./theme/theme"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoresProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </StoresProvider>
  </StrictMode>
)
