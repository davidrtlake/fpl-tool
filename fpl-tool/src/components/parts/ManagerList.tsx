// import React from "react";
import { Box, Divider, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"

export default function ManagerList() {
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="h6" noWrap>
          Managers
        </Typography>
      </Toolbar>

      <Divider />

      <List sx={{ flex: 1, py: 1 }}>
        <ListItemButton>
          <ListItemText primary="David Lake" />
        </ListItemButton>

        <ListItemButton>
          <ListItemText primary="Liam Coveney" />
        </ListItemButton>
      </List>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Sidebar footer
        </Typography>
      </Box>
    </Box>
  )
}
