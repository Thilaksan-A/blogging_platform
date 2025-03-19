import Login from "../Components/Login";
import Quotes from "../Components/Quotes";

export default function Signin() {
    return <div className="grid grid-cols-1 md:grid-cols-2">
        <Login />
        <Quotes />
    </div>
}