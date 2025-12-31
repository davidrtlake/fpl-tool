import { makeAutoObservable, runInAction } from "mobx"

import { fetchEventStatus, fetchLeagueStandings } from "../api/fpl.api"
import type { LeagueStandingsStoreData } from "../models"

export class LeagueStandingsStore {
  data: LeagueStandingsStoreData | null = null
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
      const leagueStandingsData = await fetchLeagueStandings(leagueId, this.controller.signal)
      const eventStatusData = await fetchEventStatus(this.controller.signal)
      runInAction(() => {
        this.data = {
          leagueStandings: leagueStandingsData,
          eventStatus: eventStatusData
        }
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

  get managers() {
    return this.data?.leagueStandings.standings.results ?? []
  }

  get currentWeek() {
    return (
      this.data?.eventStatus.status.reduce((acc, val) => {
        return Math.max(acc, val.event)
      }, 1) ?? 1
    )
  }
}
