import z from "zod";

export const userSchema = z.object({
    email: z.string(),
    name: z.string().optional(),
    password: z.string()

})

export const postSchema = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional(),
})