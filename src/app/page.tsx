'use client'

import { todoAdded, todoRemoved, todoToggled } from '@/lib/features/todoSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import type { TaskType } from '@/types'
import { useState } from 'react'
import Button from './components/Button'
import Input from './components/Input'
export const dynamic = 'force-dynamic'

export default function Home() {
  const [input, setInput] = useState('')
  const state = useAppSelector((state) => state.todo)
  const dispatch = useAppDispatch()

  const handleAdd = (e: any) => {
    e.preventDefault()
    if (!input) return
    dispatch(todoAdded({ text: input }))
    setInput('')
  }

  return (
    <div className='flex justify-center items-center flex-col max-w-[600px] m-auto mt-5'>
      <h1 className='text-3xl m-5'>Todo</h1>
      <form onSubmit={handleAdd}>
        <Input
          value={input}
          placeholder='Task name'
          onChange={(evt) => setInput(evt.target.value)}
          className='m-3'
        />
        <Button className='w-20 h-10'>Add</Button>
      </form>
      {/* {state?.map((todo: TaskType) => (
        <div
          key={todo.id}
          className='flex text-center gap-2 justify-between w-full text-lg p-2 px-4 bg-slate-600 mb-2 rounded-md'
        >
          <p
            onClick={() => dispatch(todoToggled(todo.id))}
            style={{ textDecoration: todo.completed ? 'line-through' : '' }}
          >
            {todo.text}
          </p>

          <Button onClick={() => dispatch(todoRemoved(todo.id))}>Del</Button>
        </div>
      ))} */}
    </div>
  )
}
