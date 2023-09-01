import {createContext, useContext, useState} from "react";
import {localStorageGetUser, localStorageSetUser, removeTokens, setToken} from "./index";

const AuthContext = createContext(null);

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState(localStorageGetUser());

    const login = (tokens: any, user: any) => {
        setUser(user);
        setToken(tokens);
        localStorageSetUser(user);
    }

    const logout = () => {
        setUser(null);
        removeTokens();
    }


    return (
        // @ts-ignore
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext);
}