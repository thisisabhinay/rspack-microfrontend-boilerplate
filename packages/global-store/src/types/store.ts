import { Store as ReduxStore } from "@reduxjs/toolkit"

export type Store = ReduxStore
export interface GlobalStoreState {
  count: number
}

export interface GlobalStoreContainer {
  store: ReduxStore | null
}
