import { Blog } from "../hooks";
import { User } from "./Blogcard";

export default function Blogpage({ blog} : {blog: Blog}) {
    return <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-40">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold">
                    {blog.title}
                </div>
                <div className="text-slate-500 mt-2">
                    Posted on 2nd Feb 2025
                </div>
                <div className="pt-4">
                    {blog.content}
                </div>
            </div>
            <div className="hidden md:flex flex-col justify-start items-start cols-span-4 gap-2">
                <p>Author</p>
                <div className="flex gap-2 items-center">
                    <User name={blog.author.name || "Anonymous"} />
                    <div className="text-xl font-bold whitespace-nowrap">
                        {blog.author.name || "Anonymous"}
                    </div>
                </div>
                
                
            </div>
        </div>
    </div>
}
    