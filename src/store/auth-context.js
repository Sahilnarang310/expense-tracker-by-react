import  React, { useContext } from 'react'

const AuthContext = React.createContext({
  isLogin: false,
  email: "",
  token: "",
  isFillProfile: false,
  isShowProfile: false,
  username: "",
  picUrl: "",
  fillProfile: (username, picUrl) => {},
  login: (email, token) => {},
  showProfile: () => {},
});
export default AuthContext;

export const useAuth=()=>useContext(AuthContext);
