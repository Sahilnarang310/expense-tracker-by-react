import  React, { useContext } from 'react'

const AuthContext=React.createContext({
    isLogin:false,
    email:'',
    token:'',
    username:'',
    profile_url:'',
    fillProfile:(username,picUrl)=>{},
    login:(email,token)=>{},
});
export default AuthContext;

export const useAuth=()=>useContext(AuthContext);
