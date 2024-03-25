import  React, { useContext } from 'react'

const AuthContext = React.createContext({
  isLogin: false,
  email: "",
  token: "",
  isFillProfile: false,
  isShowProfile: false,
  username: "",
  picUrl: "",
  isEmailVerified: false,
  fillProfile: (username, picUrl, isEmailVerified) => {},
  login: (email, token) => {},
  showProfile: () => {},
  logout: () => {},
});
export default AuthContext;

export const useAuth=()=>useContext(AuthContext);
