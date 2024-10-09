export interface Post {
  userId: number;
  category:string;
  amount:number;
  description:string[]
}

export interface IncomeData {
  userId: number;
  income: number;
  saveGoal?: number;
  limits: limit[];
}

export interface BaseTableProps {
  userId: number;
  id: number;
  income: number;
  payments: Expense[];
  remaining: number;
}

export interface CreateAccountData {
  name: string;
  email: string;
  password: string;
  pastSavings: number;
}

export interface CreateAccountResponse {
  success: boolean;
}

export interface SavingsData {
  savings: {
    totalSaved: number;
    saveGoal: number;
    prevsave: number;
  };
  expense: Expense[];
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  guid: string;
}

export interface limit {
  userId: number;
  category: string;
  spendLimit: number;
}

export interface IncomeProps {
  income: number;
  limits: limit[];
  saveGoal: number;
}

export interface Expense {
  category: string;
  amount: number;
  description: string[];
}

export interface ExpensesProps {
  income: {
    income: number;
  };
  expenses: Expense[];
}



