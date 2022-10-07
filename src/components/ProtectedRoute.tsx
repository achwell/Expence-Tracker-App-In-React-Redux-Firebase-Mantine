import React, {FC} from 'react'
import {Navigate} from "react-router-dom"
import {useAppSelector} from "../redux/hooks"

type Props = {
    children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({children}) => {
    const {user} = useAppSelector((state) => state.user)
    if (user) {
        return children
    }
    return <Navigate to="/login"/>
};

export default ProtectedRoute
