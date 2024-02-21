import { ENV } from '@/conf'
import { User } from '@/model/user.model'
// @ts-ignore
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export const checkAuth = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_TOKEN_SECRET)
    const user = await User.findById(decoded.id)

    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
