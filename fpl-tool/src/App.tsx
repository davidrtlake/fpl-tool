import React from "react"
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material"
import { Menu as MenuIcon, Home, Settings } from "@mui/icons-material"
import ManagerList from "./components/parts/managerList"

const DRAWER_WIDTH = 360

export default function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev)

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="h6" noWrap>
          Your App
        </Typography>
      </Toolbar>

      <Divider />

      <List sx={{ flex: 1, py: 1 }}>
        <ListItemButton>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List>

      <ManagerList />

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Sidebar footer
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {/* Mobile drawer toggle */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
            aria-label="Open navigation"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flex: 1 }}>
            Page Title
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar (responsive) */}
      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        {/* Mobile (temporary) */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: DRAWER_WIDTH }
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop (permanent) */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box"
            }
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0
        }}
      >
        {/* Push content below AppBar */}
        <Toolbar />

        <Box
          sx={{
            flex: 1,
            p: { xs: 2, md: 3 },
            overflow: "auto"
          }}
        >
          {/* Replace with routes/pages */}
          <Typography variant="h4" sx={{ mb: 1 }}>
            Content Area
          </Typography>
          <Typography color="text.secondary">
            This space is for your pages. It scrolls independently of the header and sidebar.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
