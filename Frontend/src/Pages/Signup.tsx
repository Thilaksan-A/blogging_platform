import Quotes from "../Components/Quotes";
import Register from "../Components/Registration";

export default function Signup() {
    return <div className="grid grid-cols-1 md:grid-cols-2">
        <Register />
        <Quotes  />
    </div>
}