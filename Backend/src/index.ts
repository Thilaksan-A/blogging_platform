import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userSchema } from './types'
import { decode, sign, verify, jwt } from 'hono/jwt'
import { SignatureKey } from 'hono/utils/jwt/jws'
import { userRouter } from './Routes/user'
import { blogRouter } from './Routes/blog'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId: string,
    lmao: string,
  }
}>()

app.use('/api/*', cors())
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter)





export default app

