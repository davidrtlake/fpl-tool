import { EntriesPicksStore } from "./entriesPicks.store"
import { LeagueStandingsStore } from "./leagueStandings.store"

export class RootStore {
  leagueStandingsStore = new LeagueStandingsStore()
  entriesPicksStore = new EntriesPicksStore()
}

export const rootStore = new RootStore()
