export const dynamic = 'force-dynamic'

import connectDB from '@/db'
import { Task } from '@/model/task.model'
import { checkAuth } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    connectDB()
    const user = await checkAuth(req)

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' })
    }
    // @ts-ignore
    const tasks = await Task.find({ user: user.id })

    return NextResponse.json({
      success: true,
      tasks,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
