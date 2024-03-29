import  React, { useContext } from 'react'

const AuthContext = React.createContext({
  isLogin: false,
  email: "",
  token: "",
  isFillProfile: false,
  isShowProfile: false,
  username: "",
  picUrl: "",
  expenses: [],
  isEmailVerified: false,
  isEdit: false,
  editExpenseForm: {},
  isFormVisible:false,
  setIsFormVisible:()=>{},
  fillProfile: (username, picUrl, isEmailVerified) => {},
  login: (email, token) => {},
  showProfile: () => {},
  logout: () => {},
  addExpense:(expense)=>{},
  editExpense:(expense)=>{},
});
export default AuthContext;

export const useAuth=()=>useContext(AuthContext);
