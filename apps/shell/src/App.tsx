import "./index.scss"
import React, { useEffect, useRef } from "react"
import ReactDOM from "react-dom/client"
import Counter from "remotereact/counter"
import CounterVue from "remotevue/counter"
import vueMounter from "remotevue/vue-mounter"

const App = () => {
  const ref = useRef(null)

  useEffect(() => {
    vueMounter(CounterVue, ref.current)
  }, [])
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: shell</div>
      <Counter />
      <div data-comp="vue-comp" ref={ref} />
    </div>
  )
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
