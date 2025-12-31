import { z } from "zod"

const EventStatusDayPoints = {
  Live: "l",
  Provisional: "p",
  Confirmed: "r"
} as const

export type EventStatusDayPoints = z.infer<typeof EventStatusDayPointsSchema>
export const EventStatusDayPointsSchema = z.enum(Object.values(EventStatusDayPoints) as [string, ...string[]])

export type EventStatusResponse = z.infer<typeof EventStatusResponseSchema>
export const EventStatusResponseSchema = z.object({
  status: z.array(
    z.object({
      bonus_added: z.boolean(),
      date: z.coerce.date(), // Coerce to date?
      event: z.number(),
      points: EventStatusDayPointsSchema
    })
  ),
  leagues: z.string()
})
