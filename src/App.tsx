import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import {useAppSelector} from "./redux/hooks"
import Spinner from "./components/Spinner"

function App() {
    const {loading} = useAppSelector(state => state.alerts)
    return (
        <div className="App">
            {loading && <div className="loader-parent"><Spinner/></div>}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                    <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
                    <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App
