'use client'

import { TaskType } from '@/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

axios.defaults.withCredentials = true

export default function Register() {
  const [allTasks, setAllTasks] = useState([])
  const [refetch, setRefetch] = useState(false)

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const form = evt.target as HTMLFormElement
    const formData = new FormData(form)

    const data = Object.fromEntries(formData)
    const res = await axios.post('/api/signup', data)
    console.log(res)

    form.reset()
  }
  //
  const handleLogin = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const formData = new FormData(evt.target as HTMLFormElement)
    const username = formData.get('username')
    const password = formData.get('password')
    const res = await axios.post('/api/login', {
      username,
      password,
    })
    console.log(res)
  }
  //
  const handleAddTask = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const form = evt.target as HTMLFormElement
    const formData = new FormData(form)

    const data = Object.fromEntries(formData)
    if (!data.title) return
    try {
      const res = await axios.post('/api/new-task', data)
      console.log(res.data)
      setRefetch(!refetch)

      form.reset()
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get('/api/tasks')
      console.log(data)
      setAllTasks(data.tasks)
    })()
  }, [refetch])

  const handleLogout = async () => {
    const res = await fetch('/api/logout', {
      cache: 'no-cache',
      credentials: 'include'
    })
    const data = await res.json()
    console.log(data)
    setRefetch(!refetch)
  }

  return (
    <>
      <button onClick={handleLogout}> Logout</button>
      <h2>Sign Up</h2>
      <form className='text-black' onSubmit={handleSubmit}>
        <input type='text' placeholder='username' name='username' />
        <input type='text' placeholder='password' name='password' />
        <button className='border m-3 text-white' type='submit'>
          submit
        </button>
      </form>
      <br />

      <h2>Login</h2>
      <form className='text-black' onSubmit={handleLogin}>
        <input type='text' placeholder='username' name='username' />
        <input type='text' placeholder='password' name='password' />
        <button className='border m-3 text-white' type='submit'>
          submit
        </button>
      </form>

      <br />
      <h2>New Task</h2>
      <form className='text-black' onSubmit={handleAddTask}>
        <input type='text' placeholder='Title' name='title' />
        <button className='border m-3 text-white' type='submit'>
          submit
        </button>
        <ul>
          {allTasks?.map((task: TaskType) => (
            <li className='text-white' key={task._id}>
              {task.title}
            </li>
          ))}
        </ul>
      </form>
    </>
  )
}
