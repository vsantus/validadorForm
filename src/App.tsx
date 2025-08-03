import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import RegisterPage from "./components/Register"
import UserProfile from "./components/UserProfile"

function App() {


  return (
    <BrowserRouter> <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
