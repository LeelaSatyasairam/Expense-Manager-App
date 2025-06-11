import { PrivateRoute } from "./pages/PrivateRoute"; // <-- import this
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

import { DataTableDemo } from "./pages/categorytable";
import { AddCategoryForm } from "./pages/AddCategoryForm";
import { EditCategoryForm } from "./pages/EditCategoryForm";
import { ExpenseDataTable } from "./pages/expensetypetable";
import { AddExpenseTypeForm } from "./pages/AddexpenseTypeForm";
import { EditExpenseTypeForm } from "./pages/EditexpenseTypeForm";
import { ExpenseTable } from "./pages/expensetable";
import { AddExpenseForm } from "./pages/AddexpenseForm";
import { EditExpenseForm } from "./pages/EditexpenseForm";
import { LoginPage } from "./pages/login"; // Add your login page here
import { RegisterForm } from "./pages/register"; // Add your register page here

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Protected routes wrapped in PrivateRoute */}
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route path="/categories" element={<DataTableDemo />} />
          <Route path="/add-category" element={<AddCategoryForm />} />
          <Route path="/edit-category" element={<EditCategoryForm />} />
          <Route path="/type" element={<ExpenseDataTable />} />
          <Route path="/edit-categorytype" element={<EditExpenseTypeForm />} />
          <Route path="/add-expensetype" element={<AddExpenseTypeForm />} />
          <Route path="/expense" element={<ExpenseTable />} />
          <Route path="/add-expense" element={<AddExpenseForm />} />
          <Route path="/edit-expense" element={<EditExpenseForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
