import { Router } from 'express'
import { verifyPassword, signToken } from '../auth'
import { RequestOrm, RequestUser } from '../types/Express.types'

const router = Router()

router.get('/im-auth', (req, res) => {
  const { user } = req as RequestUser
  res.json({ message: '🌞', body: Boolean(user) })
})

router.post('/login', async (req, res) => {
  try {
    const { body, orm } = req as RequestOrm
    if (!orm) return res.json({ message: '🌞', body: null })
    const user = await orm.user.findUnique({
      where: { username: body.username },
    })
    if (user) {
      const passwordMatch = await verifyPassword(
        body.password as string,
        user.password
      )
      if (passwordMatch) {
        return res.json({
          message: 'hello 🌞',
          body: {
            token: signToken(user.id.toString()),
            username: user.username,
          },
        })
      } else {
        return res.json({ message: 'Bad user or password 🔐', body: null })
      }
    } else {
      return res.json({ message: 'Bad user or password 🔐', body: null })
    }
  } catch (error) {}
})

export default router
