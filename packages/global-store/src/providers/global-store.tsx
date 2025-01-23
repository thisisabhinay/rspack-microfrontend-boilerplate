import { memo, useRef, ReactNode } from "react"
import { Provider } from "react-redux"
import { getStore } from "@/store"
import { Store } from "@reduxjs/toolkit"

export interface GlobalStoreProviderProps {
  children: ReactNode
  onStoreInit?: (store: Store) => void
}

export interface MemoizedProviderProps {
  store: ReturnType<typeof getStore>
  children: React.ReactNode
}

const MemoizedProvider = memo(
  ({ store, children }: MemoizedProviderProps) => <Provider store={store}>{children}</Provider>,
  // Custom comparison function to ensure deep equality check of children if needed
  (prevProps, nextProps) => {
    return prevProps.store === nextProps.store && prevProps.children === nextProps.children
  }
)

export function GlobalStoreProvider({ children, onStoreInit }: GlobalStoreProviderProps) {
  // Callback ref pattern to handle initialization
  const storeRef = useRef<ReturnType<typeof getStore> | null>(null)

  if (!storeRef.current) {
    storeRef.current = getStore()
    onStoreInit?.(storeRef.current)
  }

  return <MemoizedProvider store={storeRef.current}>{children}</MemoizedProvider>
}
