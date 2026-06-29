import {useContext} from "react";
import { AuthContext} from "../aut.context";
import {login , register , logout , getMe} from "../services/auth.api";


export const useAuth = () => {
    
    const context = useContext(AuthContext)
    const { user , setUser , loading , setLoading} = context;

    const handleLogin = async ({email , password}) => {
        setLoading(true);
        try{
            const res = await login({email , password});
            setUser(res.user);
            setLoading(false);
            return true;
        }catch(error){
            setLoading(false);
            throw error;
        }
    }

    const handleRegister = async({email , password , username}) => {
        setLoading(true);
        try{
            const res = await register({email , password , username});
            setUser(res.user);
            setLoading(false);
            return true;
        }catch(error){
            setLoading(false);
            throw error;
        }
    }


    const handleLogout = async () => {
        setLoading(true);
        try{
            await logout();
            setUser(null);
            setLoading(false);
            return true;
        }catch(error){
            setLoading(false);
            throw error;
        }
    }
    
    return {user , setUser , loading , setLoading , handleLogin , handleRegister , handleLogout}
}