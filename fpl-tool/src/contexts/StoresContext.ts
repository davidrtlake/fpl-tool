import { createContext, useContext } from "react"

import { type RootStore, rootStore } from "../stores/rootStore"

export const StoresContext = createContext<RootStore>(rootStore)

export function useStores(): RootStore {
  return useContext(StoresContext)
}
