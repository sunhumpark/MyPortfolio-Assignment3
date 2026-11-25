import {createContext,useContext,useEffect,useState} from 'react';
import {api} from './api.js';
const AuthContext=createContext(null);
export function AuthProvider({children}) {
 const [user,setUser]=useState(null);
 useEffect(()=>{api('/auth/me').then(setUser).catch(()=>setUser(null));},[]);
 async function signin(values){const result=await api('/auth/signin','POST',values);setUser(result.user);}
 async function signout(){await api('/auth/signout');setUser(null);}
 return <AuthContext.Provider value={{user,signin,signout}}>{children}</AuthContext.Provider>;
}
export const useAuth=()=>useContext(AuthContext);
