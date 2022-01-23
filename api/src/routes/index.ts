import { Application } from 'express'
import authRoutes from './auth.routes'

function routes(app: Application) {
  app.use('/api/auth', authRoutes)
}

export default routes
