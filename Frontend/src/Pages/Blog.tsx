import { useParams } from "react-router-dom"
import { useAuth, useBlog } from "../hooks";
import Appbar from "../Components/Appbar";
import Blogpage from "../Components/Blogpage";
import Spinner from "../Components/Spinner";

export default function Blog() {
    useAuth();
    const {id} = useParams();
    const {loading, blog} = useBlog(id || "");
    return <div>
        <Appbar />
        {!loading && <div className="mt-4">
            <Blogpage blog={blog}/>
        </div>}
        {loading && <div className="flex flex-col justify-center items-center h-dvh">
            {/* <div>loading...</div> */}
            <Spinner />

        </div>}
    </div>
}