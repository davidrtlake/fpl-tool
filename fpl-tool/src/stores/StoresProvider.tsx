import React, { createContext, useContext } from "react"
import { rootStore, type RootStore } from "./rootStore"

const StoresContext = createContext<RootStore>(rootStore)

export function StoresProvider({ children }: { children: React.ReactNode }) {
  return <StoresContext.Provider value={rootStore}>{children}</StoresContext.Provider>
}

export function useStores() {
  return useContext(StoresContext)
}
