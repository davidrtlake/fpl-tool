import React from "react"

import { StoresContext } from "../contexts/StoresContext"
import { rootStore } from "./rootStore"

export function StoresProvider({ children }: { children: React.ReactNode }) {
  return <StoresContext.Provider value={rootStore}>{children}</StoresContext.Provider>
}
