import React, { useEffect, useState } from 'react'
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import Expense from '../components/Expense/Expense';
import { useAuth } from '../store/auth-context';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


const Expenses = () => {
  const authState=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const authCtx=useAuth();
  useEffect(()=>{
    const fetch=async ()=>{
      const userPath=authState.email.split('@')[0];
      const response=await axios.get(`https://expense-tracker-cfb73-default-rtdb.firebaseio.com/${userPath}.json`);
      console.log(response);
      for (const key in response.data){
        dispatch()
        authCtx.addExpense({...response.data[key],id:key})
      }
    }
    fetch();

  },[])
  return (<>
  {authState.isLogin &&   <div className="bg-green-200 h-screen p-2">
      <ExpenseForm />
      <Expense  />
    </div>}
  </>
  );
}

export default Expenses