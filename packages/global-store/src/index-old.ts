export type StorageType = "local" | "session"

export const STORAGE_EVENT = "internal-storage-change"
export const STORAGE_STRATEGY = "session"
export const storageMap = {
  local: window.localStorage,
  session: window.sessionStorage
}

class StorageCore {
  private static instance: StorageCore | null = null
  private readonly INTERNAL_EVENT: string
  private readonly storage: Storage

  private constructor() {
    this.INTERNAL_EVENT = STORAGE_EVENT
    this.storage = storageMap[STORAGE_STRATEGY]
    this.handleStorageEvent = this.handleStorageEvent.bind(this)

    if (typeof window !== "undefined") {
      window.addEventListener("storage", this.handleStorageEvent)
    }
  }

  public static getInstance(): StorageCore {
    if (!StorageCore.instance) {
      StorageCore.instance = new StorageCore()
      console.log("StorageCore instance created: ", new Date())
    }
    return StorageCore.instance
  }

  public get(key: string, defaultValue: any = null) {
    if (typeof window === "undefined") return defaultValue

    try {
      const item = this.storage.getItem(key)
      return item === null ? defaultValue : JSON.parse(item)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.warn(`Error reading from storage: ${errorMessage}`)
      return defaultValue
    }
  }

  public set(key: string, value: any) {
    if (typeof window === "undefined") return false

    try {
      const oldValue = this.get(key)

      if (oldValue === value) return

      debugger
      this.storage.setItem(key, JSON.stringify(value))

      window.dispatchEvent(
        new CustomEvent(this.INTERNAL_EVENT, {
          detail: {
            key,
            oldValue,
            newValue: value
          }
        })
      )

      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.warn(`Error writing to storage: ${errorMessage}`)
      return false
    }
  }

  public remove(key: string) {
    if (typeof window === "undefined") return false

    try {
      const oldValue = this.get(key)

      this.storage.removeItem(key)

      window.dispatchEvent(
        new CustomEvent(this.INTERNAL_EVENT, {
          detail: {
            key,
            oldValue,
            newValue: undefined
          }
        })
      )

      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.warn(`Error removing from storage: ${errorMessage}`)
      return false
    }
  }

  private handleStorageEvent(event: StorageEvent) {
    if (!event.key) return

    console.log({ handleStorageEvent: event })
    window.dispatchEvent(
      new CustomEvent(this.INTERNAL_EVENT, {
        detail: {
          key: event.key,
          oldValue: event.oldValue ? JSON.parse(event.oldValue) : undefined,
          newValue: event.newValue ? JSON.parse(event.newValue) : undefined,
          isExternal: true
        }
      })
    )
  }

  public destroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", this.handleStorageEvent)
    }
    StorageCore.instance = null
  }
}

export const storageCore = StorageCore.getInstance()
export default storageCore
