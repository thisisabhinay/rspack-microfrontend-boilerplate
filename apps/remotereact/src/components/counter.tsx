import React, { useState } from "react"

function Counter() {
  const [count, setCount] = useState<number>(0)
  return (
    <button className="mt-1 border-2 p-3 border-black" onClick={() => setCount((prev) => prev + 1)}>
      React clicked {count} times
    </button>
  )
}

export default Counter
