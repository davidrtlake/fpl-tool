import { z } from "zod"

export type EntryResponse = z.infer<typeof EntryResponseSchema>
export const EntryResponseSchema = z.object({
  id: z.number(),
  joined_time: z.coerce.date(),
  started_event: z.number(),
  favourite_team: z.number(),
  player_first_name: z.string(),
  player_last_name: z.string(),
  player_region_id: z.number(),
  player_region_name: z.string(),
  player_region_iso_code_short: z.string(),
  player_region_iso_code_long: z.string(),
  years_active: z.number(),
  summary_overall_points: z.number(),
  summary_overall_rank: z.number(),
  summary_event_points: z.number(),
  summary_event_rank: z.number(),
  current_event: z.number(),
  leagues: {
    classic: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        short_name: z.string(),
        created: z.coerce.date(),
        closed: z.boolean(),
        rank: z.unknown().nullable(),
        max_entries: z.unknown().nullable(),
        league_type: z.string(),
        scoring: z.string(),
        admin_entry: z.unknown().nullable(),
        start_event: z.number(),
        entry_can_leave: z.boolean(),
        entry_can_admin: z.boolean(),
        entry_can_invite: z.boolean(),
        has_cup: z.boolean(),
        cup_league: z.number(),
        cup_qualified: z.boolean(),
        rank_count: z.number(),
        entry_percentile_rank: z.number(),
        active_phases: [
          {
            phase: z.number(),
            rank: z.number(),
            last_rank: z.number(),
            rank_sort: z.number(),
            total: z.number(),
            league_id: z.number(),
            rank_count: z.number(),
            entry_percentile_rank: z.number()
          }
        ],
        entry_rank: z.number(),
        entry_last_rank: z.number()
      })
    ),
    h2h: z.array(z.unknown()),
    cup: z.object({
      matches: z.array(z.unknown()),
      status: z.object({
        qualification_event: z.unknown().nullable(),
        qualification_numbers: z.unknown().nullable(),
        qualification_rank: z.unknown().nullable(),
        qualification_state: z.unknown().nullable()
      }),
      cup_league: z.unknown().nullable()
    }),
    cup_matches: z.array(
      z.object({
        id: z.number(),
        entry_1_entry: z.number(),
        entry_1_name: z.string(),
        entry_1_player_name: z.string(),
        entry_1_points: z.number(),
        entry_1_win: z.number(),
        entry_1_draw: z.number(),
        entry_1_loss: z.number(),
        entry_1_total: z.number(),
        entry_2_entry: z.number(),
        entry_2_name: z.string(),
        entry_2_player_name: z.string(),
        entry_2_points: z.number(),
        entry_2_win: z.number(),
        entry_2_draw: z.number(),
        entry_2_loss: z.number(),
        entry_2_total: z.number(),
        is_knockout: z.boolean(),
        league: z.number(),
        winner: z.number(),
        seed_value: z.unknown().nullable(),
        event: z.number(),
        tiebreak: z.unknown().nullable(),
        is_bye: z.boolean(),
        knockout_name: z.string()
      })
    )
  },
  name: z.string(),
  name_change_blocked: z.boolean(),
  entered_events: z.array(z.number()),
  kit: z.unknown().nullable(),
  last_deadline_bank: z.number(),
  last_deadline_value: z.number(),
  last_deadline_total_transfers: z.number(),
  club_badge_src: z.unknown().nullable()
})
