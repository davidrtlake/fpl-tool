import React from "react"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#9c27b0"
    },
    background: {
      default: "#1e0021",
      paper: "#28002b"
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff"
    }
  },
  shape: {
    borderRadius: 10
  },
  typography: {
    fontFamily: ["Roboto", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"].join(","),
    h6: {
      fontWeight: 600
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid rgba(0, 0, 0, 0.12)"
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      }
    }
  }
})

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
