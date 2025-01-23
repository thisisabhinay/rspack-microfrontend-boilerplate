import { getStore, GlobalState } from "@/store/index"

export type SubscribeCallback = (state: GlobalState) => void
export type ListenerCallback = () => void

export class GlobalStateCommonFacade {
  private readonly store = getStore()

  get count() {
    return this.store.getState().example.count
  }

  increment(): void {
    this.store.dispatch({ type: "example/increment" })
  }

  decrement(): void {
    this.store.dispatch({ type: "example/decrement" })
  }

  updateCount(value: number): void {
    this.store.dispatch({ type: "example/updateCount", payload: value })
  }

  reset(): void {
    this.store.dispatch({ type: "example/reset" })
  }

  subscribe(callback: SubscribeCallback): ListenerCallback {
    return this.store.subscribe(() => callback(this.store.getState()))
  }
}
