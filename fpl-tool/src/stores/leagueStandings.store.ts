import { makeAutoObservable, runInAction } from "mobx"
import { fetchLeagueStandings } from "../api/fetch.api"
import type { LeagueStandingsResponse } from "../models"

export class LeagueStandingsStore {
  data: LeagueStandingsResponse | null = null
  loading = false
  error: Error | null = null

  private controller: AbortController | null = null
  private currentLeagueId: number | null = null

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  async load(leagueId: number) {
    // Avoid refetching if already loaded for this league.
    if (this.currentLeagueId == leagueId && this.data) return

    this.abort()
    this.currentLeagueId = leagueId
    this.loading = true
    this.error = null

    this.controller = new AbortController()

    try {
      const data = await fetchLeagueStandings(leagueId, this.controller.signal)
      runInAction(() => {
        this.data = data
        this.loading = false
      })
    } catch (e) {
      const err = e as any

      if (err?.name == "AbortError") return

      runInAction(() => {
        this.data = null
        this.error = err instanceof Error ? err : new Error(String(err))
        this.loading = false
      })
    }
  }

  abort() {
    this.controller?.abort()
    this.controller = null
  }

  get managers() {
    return this.data?.standings.results ?? []
  }
}
