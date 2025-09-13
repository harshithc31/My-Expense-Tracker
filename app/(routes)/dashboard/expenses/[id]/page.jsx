"use client";
import { eq, getTableColumns, sql, desc } from "drizzle-orm";
import React, { useEffect, useState, use } from "react"; // ✅ Import use
import { Budgets, Expenses } from "../../../../../utils/schema";
import { db } from "../../../../../utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpensesListTable from "../_components/ExpensesListTable";
import { Trash } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

function ExpensesScreen({ params }) {
  const { user } = useUser();
  const unwrappedParams = use(params); // ✅ Unwrap params before accessing properties
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter();

  useEffect(() => {
    if (user) {
      getBudgetInfo();
    }
    //    getExpensesList();
  }, [user]);

  /**
   * Get Budget Information
   */
  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, unwrappedParams.id)) // ✅ Use unwrappedParams instead of params
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpensesList();
    //    console.log(result);
  };

  /**
   * Get Latest Expenses
   */
  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, unwrappedParams.id))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
    console.log(result);
  };

  /**
   * Used to Delete Budget
   */
  const deleteBudget = async() => {

    const deleteExpenseResult = await db.delete(Expenses)
    .where(eq(Expenses.budgetId, unwrappedParams.id))
    .returning();;

    if(deleteExpenseResult) {
        const result = await db.delete(Budgets)
        .where(eq(Budgets.id, unwrappedParams.id))
        .returning();
    }
    toast("Budget Deleted Successfully!");
    route.replace('/dashboard/budgets');
    //console.log(result);
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold flex justify-between items-center">
        My Expenses

        <div className="flex gap-2 items-center">
          <EditBudget budgetInfo={budgetInfo} 
            refreshData={() => getBudgetInfo()}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2" variant="destructive">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  current budget along with expenses and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-teal-700" onClick={() => deleteBudget()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>

      {/* ✅ Ensure budgetInfo is defined before rendering */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] bg-slate-200 rounded-lg animate-pulse"></div> // ✅ Show a loading message while data is being fetched
        )}

        <AddExpense
          budgetId={unwrappedParams.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>

      <div className="mt-4">
        
        <ExpensesListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;

// "use client"
// import { eq, getTableColumns, sql } from 'drizzle-orm';
// import React, { useEffect } from 'react'
// import { Budgets, Expenses } from '../../../../../utils/schema';
// import { db } from '../../../../../utils/dbConfig';
// import { useUser } from '@clerk/nextjs';

// function ExpensesScreen({params}) {
//     const {user} = useUser();

//     useEffect(() => {
//         user&&getBudgetInfo();
//     }, [user]);

//     const getBudgetInfo = async() => {
//         const result = await db.select({
//           ...getTableColumns(Budgets),
//           totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
//           totalItem: sql `count(${Expenses.id})`.mapWith(Number)
//         }).from(Budgets)
//         .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
//         .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
//         .where(eq(Budgets.id,params.id))
//         .groupBy(Budgets.id);

//         console.log(result);
//     }

//   return (
//     <div className='p-10'>
//         <h2 className='text-3xl font-bold'>My Expenses</h2>
//     </div>
//   )
// }

// export default ExpensesScreen
