import path from 'path'
import express from 'express'
import cors from 'cors'
import routes from './routes'
import loadOrm from './middlewares/loadOrm.handler'
import auth from './middlewares/auth.handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.join(process.cwd(), 'public')))
app.use(loadOrm())
app.use(auth)
routes(app)

export default app
