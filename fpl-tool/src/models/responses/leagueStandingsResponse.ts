import { z } from "zod"

export type LeagueStanding = z.infer<typeof LeagueStandingSchema>
export const LeagueStandingSchema = z.object({
  id: z.number(),
  event_total: z.number(),
  player_name: z.string(),
  rank: z.number(),
  last_rank: z.number(),
  rank_sort: z.number(),
  total: z.number(),
  entry: z.number(),
  entry_name: z.string(),
  has_played: z.boolean()
})

export type LeagueStandingsResponse = z.infer<typeof LeagueStandingsResponseSchema>
export const LeagueStandingsResponseSchema = z.object({
  new_entries: z.object({
    has_next: z.boolean(),
    page: z.number(),
    results: z.array(LeagueStandingSchema)
  }),
  last_updated_data: z.coerce.date(),
  league: z.object({
    id: z.number(),
    name: z.string(),
    created: z.coerce.date(),
    closed: z.boolean(),
    max_entries: z.number().nullable(),
    league_type: z.string(),
    scoring: z.string(),
    admin_entry: z.number(),
    start_event: z.number(),
    code_privacy: z.string(),
    has_cup: z.boolean(),
    cup_league: z.unknown().nullable(),
    rank: z.number().nullable()
  }),
  standings: z.object({
    has_next: z.boolean(),
    page: z.number(),
    results: z.array(LeagueStandingSchema)
  })
})
