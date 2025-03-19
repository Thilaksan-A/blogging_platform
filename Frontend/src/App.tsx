import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Blogs from './Pages/Blogs'
import Signin from './Pages/Signin'
import Blog from './Pages/Blog'
import Publish from './Pages/Publish'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/blogs" element={<Blogs />}/>
        <Route path="/blog/:id" element={<Blog />}/>
        <Route path="/publish" element={<Publish/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
