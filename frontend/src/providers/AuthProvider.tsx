import { axiosInstance } from "@/lib/axios"
import { useAuth } from "@clerk/clerk-react"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"

const updateApiToken = (token: string | null) => {
    if(token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axiosInstance.defaults.headers.common['Authorization']
    }
}

const AuthProvider = ({children}:{children: React.ReactNode}) => {
    const {getToken} = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initAuth = async() => {
            try {
                const token = await getToken()
                updateApiToken(token)
                // if(token) {
                //     // Do something with the user id
                // }
            } catch(error:any) {
                updateApiToken(null)
                console.log("Error in Auth Provider", error)
            } finally {
                setLoading(false)
            }
        }
        initAuth()

        // Cleanup
    }, [getToken])

    if(loading) return <div className="h-screen w-full flex items-center justify-center">
        <Loader  className="size-8 text-gray-300 animate-spin"/>
    </div>

    return <div>{children}</div>
}

export default AuthProvider