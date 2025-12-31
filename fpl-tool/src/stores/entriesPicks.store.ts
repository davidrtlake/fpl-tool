import { makeAutoObservable, runInAction } from "mobx"
import { fetchPicks } from "../api/fetch.api"
import type { EntriesPicks } from "../models"

// Make store a dictionary of players IDs to their team?
export class EntriesPicksStore {
  data: EntriesPicks = {}
  loading = false
  error: Error | null = null

  private controller: AbortController | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  async load(entryIds: number[], eventId: number) {
    this.abort()
    this.loading = true
    this.error = null

    this.controller = new AbortController()

    for (const entryId of entryIds) {
      try {
        const data = await fetchPicks(entryId, eventId, this.controller.signal)
        runInAction(() => {
          this.data[entryId] = {}
          this.data[entryId][eventId] = data
          this.loading = false
        })
      } catch (e) {
        const err = e as any

        if (err?.name == "AbortError") return

        runInAction(() => {
          this.data = {}
          this.error = err instanceof Error ? err : new Error(String(err))
          this.loading = false
        })
      }
    }
  }

  async loadEntryPicks(entryId: number, eventId: number) {
    if (!Object.hasOwn(this.data, entryId) || !Object.hasOwn(this.data[entryId], eventId)) {
      await this.load([entryId], eventId)
    }
  }

  getEntryPicks(entryId: number, eventId: number) {
    if (Object.hasOwn(this.data, entryId) && Object.hasOwn(this.data[entryId], eventId)) {
      return this.data[entryId][eventId]
    } else {
      return null
    }
  }

  abort() {
    this.controller?.abort()
    this.controller = null
  }
}
