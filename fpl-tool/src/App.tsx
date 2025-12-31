import { Menu as MenuIcon } from "@mui/icons-material"
import { AppBar, Box, Divider, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"

import PicksLayout from "./components/layouts/PicksLayout"
import LeagueStandings from "./components/parts/LeagueStandings"
import { useStores } from "./contexts/StoresContext"

const DRAWER_WIDTH = 360

// Think about the app state
// Selected teams and where they are in the layout.
const App = observer(function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [currEntryId, setCurrEntryId] = React.useState<number | null>(null)
  const [currEventId, setCurrEventId] = React.useState<number | null>(null)
  // Use stores here and pass to manager list?
  const { leagueStandingsStore, entriesPicksStore } = useStores()

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev)

  const handleSelectEntry = async (entryId: number, eventId: number) => {
    await entriesPicksStore.loadEntryPicks(entryId, eventId)

    setCurrEntryId(entryId)
    setCurrEventId(eventId)
  }

  useEffect(() => {
    leagueStandingsStore.load(1190630)

    return () => {
      leagueStandingsStore.abort()
    }
  }, [leagueStandingsStore])

  // useEffect(() => {
  //   entriesPicksStore.load(
  //     leagueStandingsStore.managers.map((it) => it.entry),
  //     leagueStandingsStore.currentWeek
  //   )

  //   return () => {
  //     entriesPicksStore.abort()
  //   }
  // }, [leagueStandingsStore.managers])

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ px: 2 }} />

      <LeagueStandings
        leagueStandings={leagueStandingsStore.managers}
        loading={leagueStandingsStore.loading}
        error={leagueStandingsStore.error}
        handleSelectEntry={handleSelectEntry}
      />

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
            FPL Tool
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
          {currEntryId && currEventId && (
            <PicksLayout
              entryPicks={entriesPicksStore.getEntryPicks(currEntryId, currEventId)}
              loading={entriesPicksStore.loading}
              error={entriesPicksStore.error}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
})

export default App
