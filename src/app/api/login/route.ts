import { ENV } from '@/conf'
import connectDB from '@/db'
import { User } from '@/model/user.model'
import { NextRequest, NextResponse } from 'next/server'
// @ts-ignore
import bcryptjs from 'bcryptjs'
// @ts-ignore
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const reqBody = await req.json()
    const { username, password } = reqBody
    // Check if user not exists
    // @ts-ignore
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

    // Create response and set cookie
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    })
    response.cookies.set('token', token)
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
