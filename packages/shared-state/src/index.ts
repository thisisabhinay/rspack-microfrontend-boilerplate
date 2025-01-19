import { create } from "zustand"

export type State = {
  count: number
}

export type Action = {
  increment: () => void
  update: (amount: State["count"]) => void
}

export const useCounterStore = create<State & Action>((set) => ({
  count: 1,
  increment: () => null,
  update: () => null
}))

export const { getState, setState, subscribe } = useCounterStore
export default useCounterStore
