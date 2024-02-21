import { ENV } from '@/conf'
import connectDB from '@/db'
import { User } from '@/model/user.model'
import { NextRequest, NextResponse } from 'next/server'
// @ts-ignore
import bcryptjs from 'bcryptjs'
// @ts-ignore
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const reqBody = await req.json()
    const { username, password } = reqBody
    // Check if user not exists
    const user = await User.findOne({ username })
    if (!user) {
      return NextResponse.json(
        {
          error: 'User does not exists',
        },
        { status: 400 }
      )
    }
    // Check password
    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json(
        {
          error: 'Invalid password',
        },
        { status: 400 }
      )
    }

    // Create token data for JWT
    const tokenData = {
      id: user._id,
    }

    // Create toke with JWT
    const token = await jwt.sign(tokenData, ENV.JWT_TOKEN_SECRET, {
      expiresIn: '1d',
    })

    // update cookieStore
    const cookieStore = cookies()
    cookieStore.set('token', token)

    return NextResponse.json({
      message: 'Login successful',
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
