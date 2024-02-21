import connectDB from '@/db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()

    const cookieStore = cookies()

    cookieStore.set('token', '', { maxAge: 0 })

    return NextResponse.json({
      message: 'Logout successfully',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
