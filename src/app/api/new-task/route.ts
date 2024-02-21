import { ENV } from '@/conf'
import connectDB from '@/db'
import { Task } from '@/model/task.model'
import { User } from '@/model/user.model'
// @ts-ignore
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const cookieFromClient = req.cookies.get('token')?.value
  try {
    connectDB()
    const reqBody = await req.json()
    const { title } = reqBody

    // Verify the token
    const decoded = jwt.verify(cookieFromClient, ENV.JWT_TOKEN_SECRET)
    // @ts-ignore
    const user = await User.findById(decoded.id)

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication is required.' },
        { status: 401 }
      )
    }

    const createdTask = new Task({
      title,
      user: user._id,
    })
    const savedTask = await createdTask.save()

    return NextResponse.json({
      message: 'Task created successfully.',
      success: true,
      task: savedTask,
    })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      {
        error: error.message || 'An error occurred.',
      },
      { status: 500 }
    )
  }
}
