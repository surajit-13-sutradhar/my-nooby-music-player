import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
// import { axiosInstance } from "./lib/axios.ts"
import AuthCallBackPage from "./pages/auth-callback/AuthCallBackPage.tsx"
import HomePage from "./pages/home/HomePage.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./Layout/MainLayout.tsx"

function App() {
    

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"auth-callback"}/>} />
                <Route path="/auth-callback" element={<AuthCallBackPage />} />
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
