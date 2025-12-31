import { z } from "zod"

import { EventStatusResponseSchema } from "../responses/eventStatusResponse"
import { LeagueStandingsResponseSchema } from "../responses/leagueStandingsResponse"

export type LeagueStandingsStoreData = z.infer<typeof LeagueStandingsStoreDataSchema>
export const LeagueStandingsStoreDataSchema = z.object({
  leagueStandings: LeagueStandingsResponseSchema,
  eventStatus: EventStatusResponseSchema
})
