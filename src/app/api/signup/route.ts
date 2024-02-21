import { ENV } from '@/conf'
import connectDB from '@/db'
import { User } from '@/model/user.model'
import { cookies } from 'next/headers'
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

    // Check if user already exists
    const user = await User.findOne({ username })
    if (user) {
      return NextResponse.json({ error: 'User already exists' })
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      password: hashedPassword,
    })
    const savedUser = await newUser.save()

    const tokenData = {
      id: savedUser._id,
    }
    const token = await jwt.sign(tokenData, ENV.JWT_TOKEN_SECRET, {
      expiresIn: '1d',
    })

    const cookieStore = cookies()

    cookieStore.set('token', token)

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      user: savedUser,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
