export interface Post {
  
  category: string;
  amount: number;
  description: string[];
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
  username: string;
  mail: string;
  password: string;
  pastSavings: number;
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
  token : string;
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
  expenseId:number;
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

export interface ChangeValueProps {
  id: number;
  amount: number;
}
