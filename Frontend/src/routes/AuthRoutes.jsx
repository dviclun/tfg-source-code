import { useContext } from "react"
import { AuthContext } from "../contexts/Auth/AuthContext"
import { Navigate } from "react-router-dom"

export const AuthRoutes = ({ children }) => {

    const { logged } = useContext(AuthContext)

    return (logged)
        ? <Navigate to={'/'} />
        : children
}
