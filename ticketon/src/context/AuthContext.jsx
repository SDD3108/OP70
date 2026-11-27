"use client";

import { createContext, useEffect, useState } from "react";
import { authService } from "@/src/services/authService";

export const AuthContext = createContext(null);

const AuthProvider = ({ children })=>{
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let active = true;

        authService.getMe().then((data) => {
            if(active){
                setUser(data);
            }
        }).catch(() => {
            if(active){
                setUser(null);
            }
        }).finally(() => {
            if(active){
                setIsLoading(false);
            }
        });

        return () => {
            active = false;
        };
    }, []);

    const request = async(action)=>{
        setIsLoading(true);
        setError(null);

        try{
            const data = await action();
            setUser(data);
            return data;
        }
        catch(error){
            setError(error.message);
            throw error;
        }
        finally{
            setIsLoading(false);
        }
    }

    const login = (values) => request(() => authService.login(values));
    const register = (values) => request(() => authService.register(values));
    const refresh = () => request(() => authService.getMe());
    const logout = () => request(async () => {
        await authService.logout();
        return null;
    });

    return (
        <AuthContext.Provider value={{user, isAuthenticated: Boolean(user),isLoading, error, login,   register, refresh, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider