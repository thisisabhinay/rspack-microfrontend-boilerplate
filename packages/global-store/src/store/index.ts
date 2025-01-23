import { configureStore } from "@reduxjs/toolkit"
import exampleReducer from "@/slices/example.slice"
import { initSharedStore } from "./security"
import { STORE_KEY } from "@/constants/symbols"

initSharedStore()

export function getStore() {
  if (!window[STORE_KEY]!.store) {
    const sharedStore = configureStore({
      reducer: {
        example: exampleReducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          immutableCheck: true,
          serializableCheck: true
        })
    })

    window[STORE_KEY]!.store = sharedStore
  }

  return window[STORE_KEY]!.store!
}

export type GlobalState = ReturnType<ReturnType<typeof getStore>["getState"]>
export type AppDispatch = ReturnType<typeof getStore>["dispatch"]
