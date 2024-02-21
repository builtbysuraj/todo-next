'use client'

import type { TaskType } from '@/types'
import { createSlice, nanoid } from '@reduxjs/toolkit'

// const initialState2 = JSON.parse(localStorage.getItem('todos') || '[]')

// const setToLocalStorage = (data: TaskType) => {
//   localStorage.setItem('todos', JSON.stringify(data))
// }

const initialState: TaskType[] = []

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: nanoid(),
        text: action.payload.text,
        completed: false,
      })
      // setToLocalStorage(state)
    },
    todoToggled(state, action) {
      const todo = state?.find((todo: TaskType) => todo.id === action.payload)
      todo.completed = !todo?.completed
      // setToLocalStorage(state)
    },
    todoRemoved(state, action) {
      const newState = state.filter(
        (todo: TaskType) => todo.id !== action.payload
      )
      // setToLocalStorage(newState)
      return newState
    },
    todoEdit(state, action) {
      const newState = state.filter(
        (todo: TaskType) => todo.id !== action.payload
      )
      // setToLocalStorage(newState)
      return newState
    },
  },
})

export const { todoAdded, todoToggled, todoRemoved, todoEdit } =
  todosSlice.actions
export default todosSlice.reducer
