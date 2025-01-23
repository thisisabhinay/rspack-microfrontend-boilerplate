import React from "react"
import ReactDOM from "react-dom/client"

import "./index.scss"
import Counter from "./components/counter"
import { GlobalStoreProvider, type Store } from "@repo/global-store"

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: apps/remote-react</div>
    <Counter />
  </div>
)
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
  <GlobalStoreProvider onStoreInit={(store: Store) => console.log(store)}>
    <App />
  </GlobalStoreProvider>
)
