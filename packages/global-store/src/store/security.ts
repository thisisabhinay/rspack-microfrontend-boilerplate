import { Store } from "@reduxjs/toolkit"
import { STORE_KEY } from "../constants/symbols"
import { GlobalStoreContainer } from "@/types/store"

declare global {
  interface Window {
    [STORE_KEY]?: GlobalStoreContainer
  }
}

export function createImmutableStore(): GlobalStoreContainer {
  let storeInstance: Store | null = null

  return Object.freeze({
    get store() {
      return storeInstance
    },

    set store(newStore: Store | null) {
      if (storeInstance === null) {
        storeInstance = newStore
      }
    }
  })
}

export function initSharedStore() {
  if (!window[STORE_KEY]) {
    window[STORE_KEY] = createImmutableStore()
    Object.preventExtensions(window[STORE_KEY])
  }
}
