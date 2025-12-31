import { Box, Divider, List, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"

import type { PicksResponse } from "../../models"

type Props = {
  entryPicks: PicksResponse | null
  loading: boolean
  error: Error | null
}

// Should the higher level layout store the EntriesPicks and then pass down the EntryPick
// App level stores the stores and then the components are observers
const PicksLayout = observer(({ entryPicks, loading, error }: Props) => {
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
          Picks
        </Typography>
      </Toolbar>

      <Divider />

      <List sx={{ flex: 1, py: 1 }}>
        {entryPicks?.picks.map((it) => (
          <ListItemButton key={it.element}>
            <ListItemText primary={it.element} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
})

export default PicksLayout
