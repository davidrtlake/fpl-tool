import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { AppThemeProvider } from "./theme/theme"
import { StoresProvider } from "./stores/StoresProvider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoresProvider>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </StoresProvider>
  </StrictMode>
)
