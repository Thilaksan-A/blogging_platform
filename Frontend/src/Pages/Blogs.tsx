import Appbar from "../Components/Appbar";
import Blogcard from "../Components/Blogcard";
import Spinner from "../Components/Spinner";
import { useAuth, useBlogs } from "../hooks";

export default function Blogs() {
    useAuth();
    const {loading, blogs} = useBlogs();
    return <div className="">

        <Appbar />
        <div className="flex justify-center">
            {!loading && <div className="flex flex-col justify-center max-w-xl mt-3">
                {blogs.map((blog, index) => <Blogcard
                    authorName={blog.author.name || "anon"}
                    title={blog.title}
                    content={blog.content}
                    createdAt={blog.createdAt}
                    id={blog.id}
                    key={index}
                />)}
            </div>}
        </div>
        {loading && <div className="flex flex-col justify-center items-center h-dvh">
            <Spinner />
        </div>}
        
        
    </div>
}