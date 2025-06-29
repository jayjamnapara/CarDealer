import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [loggeduser, setLoggedUser] = useState(null)

    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem('users'))
        if(storedUser){
            setLoggedUser(storedUser)
        }
    },[])

    const login = (user) =>{
        localStorage.setItem('loggeduser', JSON.stringify(user))
        localStorage.setItem('role', user.role)
        setLoggedUser(user)
    }

    return(
        <AuthContext.Provider value={{ loggeduser, login}}>
            {children}
        </AuthContext.Provider>
    )
} 