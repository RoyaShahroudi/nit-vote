import {useAuth} from "./auth";
import {Navigate} from "react-router-dom";
import {getTokens, localStorageGetUser} from "./index";

export const RequireAuth = ({children}: any) => {
    const auth = useAuth();

    // @ts-ignore
    if (!localStorageGetUser()) {
        return <Navigate to='/login'/>
    }
    return children
}