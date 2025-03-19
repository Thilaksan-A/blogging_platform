import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
export default function Appbar() {
    // let location = useLocation().pathname;
    const [location] = useState("/publish");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/userDetail`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setName(response.data.name);
            })
    }, []);
    
    const handleLogout = () => {
        
        localStorage.setItem("token", "");
        navigate("/signin")

    }

    const currlocation =  useLocation().pathname;
    return <div className="border-b flex justify-between px-10 py-4">
        
        <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer text-lg">
            Blogger
        </Link>
        <div>
            <Link to={location === currlocation ? "/blogs" : "/publish"}>
                <button type="button" 
                    className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
                    // onClick={() => navigate("/blogs")}
                >
                    New Blog
                </button>
            </Link>
            <button type="button" 
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={handleLogout}
            > 
                Logout
            </button>

            <Profile name={name} />
        </div>
    </div>
}

export function Profile( { name }: {name: string} ) {
    if (name === undefined) name = "";
    return <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        
        <span className="text-md text-gray-600 dark:text-gray-300">
            {name !== "" ? name[0] : "A"}
        </span>
    </div>
}

