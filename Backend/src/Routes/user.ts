import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userSchema } from '../types'
import { decode, sign, verify, jwt } from 'hono/jwt'


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
      },
      Variables: {
        userId: string,
        lmao: string,
      }
}>()

type JWTUserPayload =  {
    id: string;
}
  
userRouter.post('/signup', async (c) => {
    const dbUrl: string = c.env.DATABASE_URL
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        // datasourceUrl: dbUrl.DATABASE_URL,
    }).$extends(withAccelerate())
    const reqData = await c.req.json();
    const results = userSchema.safeParse(reqData);
    if(!results.success) {
        return c.json({
            msg: "invalid inputs"
        }, 400)
    }

    try {
        let user = await prisma.user.findUnique({
        where: {
            email: reqData.email as string
        }
        })

        if (user !== null ) {
        return c.json({
            msg: "user with that email exists already try logging in ?"
        }, 409);
        }
        user = await prisma.user.create({
        data: {
            email: reqData.email as string,
            name: reqData.name ? reqData.name as string : undefined,
            password: reqData.password as string
        }
        })
        const payload = {
            id: user.id,
            name: user.name || ""
        }
        const token = await sign(payload, c.env.JWT_SECRET);
        return c.json({
        token: token
        }, 200)

    } catch (e) {
        console.error(e);
        c.status(500);
        return c.json({
        msg: "Unable to make new user + " + e 
        }, 500)
    }

})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const data = await c.req.json();
    const result = userSchema.safeParse(data);
    if (!result) {
        return c.json({
        msg: "invalid inputs"
        }, 400);
    }

    const user = await prisma.user.findUnique({
        where: {
        email: data.email,
        password: data.password,
        }
    })
    if (!user) {
        return c.json({
        msg: "Incorrect login details try again"
        }, 403);
    }

    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return  c.json({
        token: token
    }, 200);
})



