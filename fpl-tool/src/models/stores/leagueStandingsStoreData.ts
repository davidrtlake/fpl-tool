import { z } from "zod"

export type LeagueStanding = z.infer<typeof LeagueStandingSchema>
export const LeagueStandingSchema = z.object({

})

export type LeagueStandingsStoreData = z.infer<typeof LeagueStandingsStoreDataSchema>
export const LeagueStandingsStoreDataSchema = z.object({

})
