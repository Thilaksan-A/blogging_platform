import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import Spinner from "./Spinner";
export default function Register() {
    const [registration, setRegistration] = useState({
        username: "",
        email:"",
        password:""
    })
    const[disable, setDisable] = useState(false)
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(registration);
    }, [registration])
    async function sendRequest() {
        if (registration.username.trim() === "" || registration.email.trim() === "" || registration.password.trim() === "" ) {
            setErrorMsg("Error creating account please check inputs.")
            setError(true);
            return;
        }
        try {
            setDisable(true);
            setLoading(true);
            const response = await axios.post(BACKEND_URL + '/api/v1/user/signup', {
                email: registration.email,
                name: registration.username,
                password: registration.password
            })
            const jwt: string = response.data.token;
            localStorage.setItem("token", jwt);
            setError(false);
            navigate("/blogs")
       } catch(e) {
            if (e.response.status === 409) {
                setErrorMsg("Email already exists");
                setError(true);
            } else {
                setErrorMsg("Error creating account please check inputs.")
                setError(true);
            }
       } finally {
            setDisable(false);
            setRegistration({
                username: "",
                email:"",
                password:""
            })
            setLoading(false);
       }
    }
    return <>        
        <div className="flex flex-col justify-center items-center h-screen">
            {loading && <Spinner />}
            {!loading && <div className="flex flex-col items-center">
                <p className="font-extrabold text-4xl">Create an account</p>
                <p>Already have an account? <Link to="/signin"><u>Login</u></Link></p>
            </div>}
            {error && !loading &&  <div className="text-sm text-red-500">
                {errorMsg}
            </div>}
            
            {!loading && <div className="w-full max-w-sm space-y-6">
                <div className="flex flex-col pt-5" >
                    <label className="" htmlFor="Username"><b>Username</b></label>
                    <input className="border border-gray-500 rounded-md focus:ring-black focus:border-black p-2.5" type="text" placeholder="Enter your username" id="username" required onChange={(e) => setRegistration({
                        ...registration,
                        username: e.target.value
                    })}></input>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email"><b>Email</b></label>
                    <input className="border border-gray-500 rounded-md focus:ring-black focus:border-black p-2.5" type="text" placeholder="example@example.com" id="email" required onChange={(e) => setRegistration({
                        ...registration,
                        email: e.target.value

                    })}></input> 
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="password"><b>Password</b></label>
                    <input className="border border-gray-500 rounded-md focus:ring-black focus:border-black p-2.5" type="password" placeholder="Please enter a password" id="password" required onChange={(e) => setRegistration({
                        ...registration,
                        password: e.target.value

                    })}></input>
                </div>

                <button onClick={sendRequest} disabled={disable} className="w-96 h-12 bg-slate-800 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded">
                    Register
                </button>
            </div>}
            
        </div>
    </>
}