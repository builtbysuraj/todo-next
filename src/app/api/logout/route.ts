// import connectDB from '@/db'
import { NextResponse } from 'next/server'

export function GET() {
  try {
    // await connectDB()

    const response = NextResponse.json({
      message: 'Logout successfully',
      success: true,
    })

    response.cookies.set('token', '', { maxAge: 0 })

    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
