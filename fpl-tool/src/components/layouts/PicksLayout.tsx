import { Box, Divider, Grid, Toolbar, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"

import type { PicksResponse, PlayerPick } from "../../models"
import PlayerCard from "../parts/PlayerCard"

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

  const mappedPlayers =
    entryPicks?.picks.reduce((acc: Record<string, PlayerPick[]>, val) => {
      const key = val.position > 11 ? "bench" : val.element_type.toString()
      acc[key] = acc[key] ?? []
      acc[key].push(val)
      return acc
    }, {}) ?? {}

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="h6" noWrap>
          Picks
        </Typography>
      </Toolbar>

      <Divider />

      <Grid
        container
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        {Object.keys(mappedPlayers).map((key) => (
          <Grid container direction="row">
            {mappedPlayers[key].map((it) => (
              <PlayerCard element={it.element} isCaptain={it.is_captain} />
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
})

export default PicksLayout
