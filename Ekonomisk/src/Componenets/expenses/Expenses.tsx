import React from 'react'
import Expensestables from './Expensestable';
import sharedData from '../hooks/data';



const Expenses = () => {
    interface Props {
  sum: number;
  payments: pay[];
  totalSpent: number;
  remaining: number; 
  saveGaol: number
}

interface pay {
  category: string;
  amount: number
}

console.log(sharedData);
  return (
    <Expensestables
      sum={sharedData.sum}
      payments={sharedData.payment}
      remaining={sharedData.remaining}
    />
  );
}

export default Expenses