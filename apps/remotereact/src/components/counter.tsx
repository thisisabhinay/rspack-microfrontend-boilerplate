import React from "react"
import { useAppDispatch, useAppSelector, increment, decrement, reset } from "@repo/global-store"

function Counter() {
  const count = useAppSelector((state) => state.example.count)
  const dispatch = useAppDispatch()

  return (
    <div
      data-comp="Counter"
      data-stack="react"
      className="p-10 border-2 border-sky-400 shadow-sky-100 shadow-lg rounded-2xl flex items-center justify-between"
    >
      <h2 className="text-xl font-semibold">React Counter: {count}</h2>
      <div className="flex items-center gap-4 font-normal text-base">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  )
}

export default Counter
