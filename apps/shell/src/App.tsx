import React from "react"
import ReactDOM from "react-dom/client"
import Counter from "remotereact/counter"
import CounterVue from "remotevue/counter"
import "./index.scss"

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: shell</div>
    <Counter />
    <CounterVue />
  </div>
)
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
