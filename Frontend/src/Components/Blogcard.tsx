import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    // publishedDate: string,
    createdAt: Date,
    id: number
}

export default function Blogcard({
    authorName,
    title,
    content,
    // publishedDate,
    createdAt,
    id
}: BlogCardProps) {
    const dateString = new Date(createdAt).toDateString();
    return <Link to={`/blog/${id}`} >
        <div className="flex flex-col border-b-2 p-4 w-screen max-w-screen-md mt-3 cursor-pointer" >
            <div className="flex items-center ">
                <div className="flex justify-center flex-col">
                    <User name={authorName}/> 
                </div>
                
                <div className="font-extralight pl-2 text-sm">
                    {authorName}
                </div>
                <div className="text-slate-400 pl-2">
                    &bull;
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm">
                    {dateString}
                </div>
            </div>
            
            <div className="font-bold text-2xl pt-4">
                {title}
            </div>
            <div>
                {content.slice(0,100) + " ..."}
            </div>
            <div className="text-gray-500">
                {`${Math.ceil(content.length / 100)} min read`}
            </div>
        </div>
    </Link>
}


export function User( { name }: {name: string} ) {
    return <div className="flex items-center justify-center w-6 h-6  bg-gray-100 rounded-full dark:bg-gray-600 min-w-6">
        <span className="text-xs text-gray-600 dark:text-gray-300">
            {name[0]}
        </span>
    </div>
}