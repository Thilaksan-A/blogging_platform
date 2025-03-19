# Blogger
Blogger is a fullstack blogging platform with responsive UI where users can register, log in, create and view blog posts.

Tech Stack:
FrontEnd: React, Typescript, TailwindCSS, Vercel(deployment)
Backend: TS, Prisma, PostGres, Cloudflare Workers
Authentication; JWT

Checkout the live version of the blogging platform:
https://blogging-platform-nu-three.vercel.app/

Cold Start Warning
Please note that due to the use of Cloudflare Workers for the backend, you might experience slightly slower loading times during the initial request (for both registration and fetching blog posts). This is due to the cold start problem inherent in serverless functions, where the backend may take a bit longer to respond when it hasn't been accessed recently. The system will perform faster once the worker has "warmed up" after the first few requests.
