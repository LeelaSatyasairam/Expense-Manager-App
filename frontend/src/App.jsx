import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

import { DataTableDemo } from "./pages/categorytable";
import { AddCategoryForm } from "./pages/AddCategoryForm";
import { ExpenseDataTable } from "./pages/expensetypetable";
import { AddExpenseTypeForm } from "./pages/AddexpenseTypeForm";
import { ExpenseTable } from "./pages/expensetable";
import { AddExpenseForm } from "./pages/AddexpenseForm";

export default function App() {
  return (
   <SidebarProvider>
  <div className="flex h-screen w-full">
    <AppSidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-auto p-6">
        <BrowserRouter>
              <Routes>
              <Route path="/" element={<DataTableDemo />} />
              <Route path="/add-category" element={<AddCategoryForm />} />
              <Route path="/type" element={<ExpenseDataTable />} />
              <Route path="/add-expensetype" element={<AddExpenseTypeForm />} />
              <Route path="/expense" element={<ExpenseTable />} />
              <Route path="/add-expense" element={<AddExpenseForm />} />
            </Routes>
        </BrowserRouter>
      </main>
    </div>
  </div>
</SidebarProvider>

  );
}
