import React, { useEffect, useState } from 'react'
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import Expense from '../components/Expense/Expense';
import { useAuth } from '../store/auth-context';
import axios from 'axios';


const Expenses = () => {
  const authCtx=useAuth();
  useEffect(()=>{
    const fetch=async ()=>{
      const userPath=authCtx.email.split('@')[0];
      const response=await axios.get(`https://expense-tracker-cfb73-default-rtdb.firebaseio.com/${userPath}.json`);
      console.log(response);
      for (const key in response.data){
        authCtx.addExpense({...response.data[key],id:key})
      }
    }
    fetch();

  },[])
  return (<>
  {authCtx.isLogin &&   <div className="bg-green-200 h-screen p-2">
      <ExpenseForm />
      <Expense  />
    </div>}
  </>
  );
}

export default Expenses