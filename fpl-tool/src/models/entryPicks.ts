import { z } from "zod"
import { PicksResponseSchema } from "./responses/picksResponse"

export type EntriesPicks = z.infer<typeof EntriesPicksSchema>
export const EntriesPicksSchema = z.record(z.number(), z.record(z.number(), PicksResponseSchema))
