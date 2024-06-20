import { useContext } from "react"
import { AuthContext } from "../contexts/Auth/AuthContext"
import { Navigate } from "react-router-dom"

export const AdminRoutes = ({ children }) => {

    const { logged, user } = useContext(AuthContext)

    return (logged && user.rol === 'admin')
        ? children
        : <Navigate to={'/'} />
}