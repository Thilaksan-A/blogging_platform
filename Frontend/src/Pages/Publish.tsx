import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "../Components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Spinner from "../Components/Spinner";
import { useAuth } from "../hooks";

export default function Publish () {
    useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(false)

    useEffect(()=> {
        if (error === true) {
            setLoad(false);
        }

        const timer = setTimeout(()=> {
            setError(false);
        }, 5000)

        return () => {
            clearTimeout(timer);
        } 
    }, [error])

    async function sendRequst() {
        setLoad(true);
        if (title === "" || description === "") {
            setError(true);
            return;
        }
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
            title: title,
            content: description,
        }, {
            headers:{
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        });
        if (response.status === 200) {
            const id = response.data.postId;
            navigate(`/blog/${id}`)
        } else {
            setError(true);
        }
    }

    return <div>

        <Appbar />
        <div className="flex justify-center flex-col items-center">
                {error && 
                    <div className="text-red-600 font-light text-sm flex justify-center pt-4">
                        Unable to create new post, missing or incorrect inputs
                    </div>
                }
            <div className="max-w-screen-lg w-full pt-4">
                
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
                <textarea onChange={(e) => {
                    setDescription(e.target.value)
                }} className="mt-5 h-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Blog Content" />
            
                
                <div className="flex items-center gap-5 mt-8">
                    <div className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <button onClick={sendRequst}>Submit</button>   
                    </div>
                    {load && <Spinner/>}
                </div>
                
                
            </div>
            
        </div>
    </div>
}

