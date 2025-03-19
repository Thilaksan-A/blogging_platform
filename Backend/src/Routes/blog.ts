import { Hono } from "hono";
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { postSchema, userSchema } from '../types'
import { decode, sign, verify, jwt } from 'hono/jwt'
import { Post } from "@prisma/client/edge";
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
      },
      Variables: {
        userId: string,
        lmao: string,
        userName: string,
      }
}>()

type JWTUserPayload =  {
    id: string
    name: string
}
  
blogRouter.use('/*', async (c, next) => {
    const header = c.req.header('Authorization') || "";
    const token = header.split(" ")[1];
    if (!token) {
      return c.json({
        msg: "invalid token"
  
      }, 401)
    }
    try {
      const user = await verify(token, c.env.JWT_SECRET) as JWTUserPayload;
      if (user) {
        c.set("userId", user.id);
        c.set("userName", user.name);
        await next();
      } else {
        return c.json({
          msg: "invalid token"
    
        }, 401)
      }
    } catch (e) {
      console.log("error in middleware route " + e);
      return c.status(500);
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    let reqData = await c.req.json()
    let result = postSchema.safeParse(reqData);
    if (!result.success) {
        return c.json({
            msg: "invalid blog inputs"
      
        }, 400)
    }
    try {
        const userId = c.get('userId');
        const user = await prisma.user.findUnique ({
            where: {
                id: userId
            }
        })
        const post = await prisma.post.create({
            data: {
                title: reqData.title,
                content: reqData.content,
                published: reqData.published ?? undefined,
                authorId: userId
            }
        })
        return c.json({
            postId: post.id,
        })
    } catch (e) {
        return c.json({
            msg: "Unable to make new post+ " + e
      
        }, 500)
    }
  })
  
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    let reqData = await c.req.json()
    if (!reqData.postId) {
        return c.json({
            msg: "invalid postId"
      
        }, 400)
    }
    try {
        const post = await prisma.post.update({
            where: {
                authorId: c.get("userId"),
                id: reqData.postId
            },
            data: {
                title: reqData.title ?? undefined,
                content: reqData.content ?? undefined,
                published: reqData.published ?? undefined,
                authorId: c.get("userId"),
            }
        });
        return c.json({
            postId: post.id,
        })
    } catch (e) {
        return c.json({
            msg: "Unable to update post"
      
        }, 500)
    }

})

// todo: paginate results
// if this handler is below /:id it will hit that route first and not reach this
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    let posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            },
            createdAt: true,
        }
    });
    return c.json(posts, 200);
})

// if this handler is below /:id it will hit that route first and not reach this
blogRouter.get('/userDetail', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    return c.json({
        name: c.get("userName")
    })
    
})


blogRouter.get('/:id', async  (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const postId = c.req.param('id');
    try {   
        let post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            select: {
                title: true,
                id: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({
            post: post
        })

    } catch (e) {
        return c.json({
            msg: "Unable to fetch blog post"
        }, 500)
    }
})


