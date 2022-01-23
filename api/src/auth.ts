import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signToken = (sub: string) => {
  const secret = process.env.JWT_SECRET || 'secret'
  return jwt.sign({ sub }, secret, { expiresIn: '15m' })
}

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET || 'secret'
  const payload = jwt.verify(token, secret)
  if (!payload) return null
  return payload
}

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword)
}
