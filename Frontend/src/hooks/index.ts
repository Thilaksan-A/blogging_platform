import { useEffect } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Blog {
    title: string,
    content: string,
    author: {
        "name":string
    },
    id: number,
    createdAt: Date,
}
export function useBlogs() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data);
                setLoading(false)
                setBlogs((currValue) => {
                    return currValue.sort((x,y) => {
                        return new Date(x.createdAt) < new Date( y.createdAt) ? 1 : -1
                    })
                })
            })
    }, [blogs]);

    return {
        loading,
        blogs
    }
}

export function useBlog(id: string) {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>({
        title: '',
        content: '',
        author: { name: '' },
        id: 0,
        createdAt: new Date(),
    });

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.post);
                setLoading(false)
            })
    }, [id]);

    return {
        loading,
        blog
    }
}

export function useAuth() {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token") ==="") {
            navigate("/signin");
        }
    }, [navigate])
    
}