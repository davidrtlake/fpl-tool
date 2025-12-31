import { Box, Typography } from "@mui/material"

type Props = {
  element: number
  isCaptain: boolean
}

function PlayerCard({ element, isCaptain }: Props) {
  return (
    <Box sx={{ width: 100, height: 100, bgcolor: "gray" }}>
      <Typography>Player ID: {element}</Typography>
      {isCaptain && <Typography>Captain</Typography>}
    </Box>
  )
}

export default PlayerCard
