import { z } from "zod"

const Chip = {
  Wildcard: "wildcard",
  FreeHit: "freehit",
  BenchBoost: "bboost",
  TripleCaptain: "3xc"
} as const

export type Chip = z.infer<typeof ChipSchema>
export const ChipSchema = z.enum(Object.values(Chip) as [string, ...string[]])

export type PlayerPick = z.infer<typeof PlayerPickSchema>
export const PlayerPickSchema = z.object({
  element: z.number(), // PLayer ID?
  position: z.number(), // Counting up from 1 to 15
  multiplier: z.number(), // Captained or trip captained. 1, 2, 3
  is_captain: z.boolean(),
  is_vice_captain: z.boolean(),
  element_type: z.number() // Goalkeeper 1, Def 2, Mid 3, Fwd 4
})

export type PicksResponse = z.infer<typeof PicksResponseSchema>
export const PicksResponseSchema = z.object({
  active_chip: ChipSchema.nullable(),
  automatic_subs: z.array(
    z.object({
      entry: z.number(),
      element_in: z.number(),
      element_out: z.number(),
      event: z.number()
    })
  ),
  entry_history: z.object({
    event: z.number(),
    points: z.number(),
    total_points: z.number(),
    rank: z.number(),
    rank_sort: z.number(),
    overall_rank: z.number(),
    percentile_rank: z.number(),
    bank: z.number(),
    value: z.number(),
    event_transfers: z.number(),
    event_transfers_cost: z.number(),
    points_on_bench: z.number()
  }),
  picks: z.array(PlayerPickSchema)
})
