import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import Spinner from "./Spinner";

export default function Login() {
    const [login, setLogin] = useState({
            email:"",
            password:""
    })
    const[disable, setDisable] = useState(false)
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    async function sendRequest() {
        if (login.email === "" || login.password === "") {
            setErrorMsg("Invalid inputs.");
            setError(true);
            return;
        }
        try {
            setDisable(true);
            setLoading(true);
            const response = await axios.post(BACKEND_URL + '/api/v1/user/signin', {
                email: login.email,
                password: login.password
            })
            const jwt: string = response.data.token;
            localStorage.setItem("token", jwt);
            setError(false);
            navigate("/blogs")
        } catch(e) {
            // setError(true);
            // console.error("unable to register: " + e.response.data.msg);
            const error = e as AxiosError;
            if (error.response?.status === 400) {
                setErrorMsg("Invalid Input");
                setError(true);
            } else {
                setErrorMsg("Incorrect email or password")
                setError(true);
            }
        } finally {
            setDisable(false);
            setLogin({
                email: "",
                password:""
            })
            setLoading(false);
        }
    }
    return <>    
        <div className="flex flex-col justify-center items-center h-screen">
            {loading && <Spinner />}
            {!loading && <div className="flex flex-col items-center">
                <p className="font-extrabold text-4xl">Login</p>
                <p>Dont have an account? <Link to="/signup"><u>Register</u></Link></p>
            </div>}
            {error && !loading && <div className="text-sm text-red-500">
                {errorMsg}
            </div>}
            {!loading && <div className="w-full max-w-sm space-y-6">
                <div className="flex flex-col pt-5">
                    <label htmlFor="email"><b>Email</b></label>
                    <input className="border border-gray-500 rounded-md focus:ring-black focus:border-black p-2.5" type="text" placeholder="example@example.com" id="email" required onChange={(e) => setLogin({
                        ...login,
                        email: e.target.value

                    })}></input> 
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="password"><b>Password</b></label>
                    <input className="border border-gray-500 rounded-md focus:ring-black focus:border-black p-2.5" type="password" placeholder="Please enter a password" id="password" required onChange={(e) => setLogin({
                        ...login,
                        password: e.target.value

                    })}></input>
                </div>

                <button onClick={sendRequest} disabled={disable} className="w-96 h-12 bg-slate-800 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            </div>}
            
        </div>
    </>
}