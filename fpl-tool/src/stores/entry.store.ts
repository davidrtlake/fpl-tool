import { makeAutoObservable, runInAction } from "mobx"

import { fetchEntry } from "../api/fpl.api"
import type { EntryResponse } from "../models"

// Make store a dictionary of players IDs to their team?
export class EntryStore {
  data: EntryResponse | null = null
  loading = false
  error: Error | null = null

  private controller: AbortController | null = null
  private currententryId: number | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  async load(entryId: number) {
    // Avoid refetching if already loaded for this entry.
    if (this.currententryId == entryId && this.data) return

    this.abort()
    this.currententryId = entryId
    this.loading = true
    this.error = null

    this.controller = new AbortController()

    try {
      const data = await fetchEntry(entryId, this.controller.signal)
      runInAction(() => {
        this.data = data
        this.loading = false
      })
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return

      runInAction(() => {
        this.data = null
        this.error = e instanceof Error ? e : new Error(String(e))
        this.loading = false
      })
    }
  }

  abort() {
    this.controller?.abort()
    this.controller = null
  }
}
