"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import BudgetItem from './budgets/_components/BudgetItem';
import { db } from '../../../utils/dbConfig'; 
import { eq, getTableColumns, sql, desc } from 'drizzle-orm'
import { Budgets, Expenses } from '../../../utils/schema'
import CreateBudget from './budgets/_components/CreateBudget';
import BarChartDashboard from './_components/BarChartDashboard';
import ExpensesListTable from './expenses/_components/ExpensesListTable';
import { useRouter } from 'next/navigation';

function Dashboard() {
  const {user, isLoaded} = useUser();
  const router = useRouter();
  //console.log(user?.fullName)

  // 🛠️ ✅ Always define hooks at the top of the component
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-in"); // Redirect to sign-in if not logged in
    }

    user && getBudgetList();
  }, [user, isLoaded, router]);
  /*
   * used to get budget list
   */
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
    // console.log(result);
  };

  /**
   * Used to get all the expenses belongs to a user
   */
  const getAllExpenses = async() => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
    // console.log(result);
  }

  // ✅ Only use conditional rendering inside JSX, not before hooks
  if (!isLoaded || !user) {
    return <h2 className='p-5 text-xl'>Loading...</h2>;
  }
  return (
    <div className='p-8'>
      <h2 className='font-bold text-3xl'> Hi, {user?.fullName} ✌️ </h2>
      <p className='text-gray-500'>Here's what happening with your money!</p>

      <CardInfo budgetList={budgetList}/>

      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-3'>
        <div className='md:col-span-2'>
          {/* Normal text - Chart */}
          <BarChartDashboard 
            budgetList={budgetList}
          />

          <ExpensesListTable 
            expensesList={expensesList}
            refreshData = {() => getBudgetList()}
          />
        </div>

        <div className='grid gap-1'>
          {/* Other Content */}
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard