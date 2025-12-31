import { Box, Divider, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"

import type { LeagueStanding } from "../../models"

type Props = {
  leagueStandings: LeagueStanding[]
  loading: boolean
  error: Error | null
  handleSelectEntry: (entryId: number, eventId: number) => void
}

const LeagueStandings = observer(({ leagueStandings, loading, error, handleSelectEntry }: Props) => {
  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Loading…</Typography>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="h6" noWrap>
          Managers
        </Typography>
      </Toolbar>

      <Divider />

      <List sx={{ flex: 1, py: 1 }}>
        {leagueStandings.map((it) => (
          <ListItemButton key={it.entry} onClick={() => handleSelectEntry(it.entry, 19)}>
            <ListItemText primary={it.player_name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
})

export default LeagueStandings
