import type { EntryResponse, EventStatusResponse, LeagueStandingsResponse, PicksResponse } from "../models"
import { request } from "./http"

export function fetchLeagueStandings(leagueId: number, signal?: AbortSignal) {
  return request<LeagueStandingsResponse>(`/leagues-classic/${leagueId}/standings/`, { signal })
}

export function fetchEntry(entryId: number, signal?: AbortSignal) {
  return request<EntryResponse>(`/entry/${entryId}/`, { signal })
}

export function fetchPicks(entryId: number, eventId: number, signal?: AbortSignal) {
  return request<PicksResponse>(`/entry/${entryId}/event/${eventId}/picks/`, { signal })
}

export function fetchEventStatus(signal?: AbortSignal) {
  return request<EventStatusResponse>(`/event-status/`, { signal })
}
