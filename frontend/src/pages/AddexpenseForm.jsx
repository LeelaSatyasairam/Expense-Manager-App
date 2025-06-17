import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/ui/button";

export function AddExpenseForm() {
  const [categorytype, setCategorytype] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]); // full data: { categorytype, name }
  const [expensetype, setExpenseType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const personid = localStorage.getItem("personid");

  // Fetch categories & expense types on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(`${API_BASE_URL}/expensetypes-name-type?personid=${personid}`,);
        // Expecting: [{ categorytype: "...", name: "..." }, ...]
        setCategoryOptions(res.data.data);
      } catch (error) {
        console.error("Error fetching category types", error);
      }
    }

    fetchCategories();
  }, []);

  // Extract distinct category types for first dropdown
  const distinctCategories = [...new Set(categoryOptions.map((o) => o.categorytype))];

  // Filter expense types based on selected categorytype
  const filteredExpenseTypes = categoryOptions
    .filter((o) => o.categorytype === categorytype)
    .map((o) => o.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/expense-new`, { expensecategorytype: categorytype, expensetype, description, amount, personid });
      alert("successfully added expense")
      navigate("/expense");
    } catch (error) {
      console.error("Error creating expense:", error);
      alert("failed to add exepnse")
    }
  };

  const handleCancel = () => {
    navigate("/expense");
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div
        className="shadow-md border rounded-2xl p-6 w-full max-w-md"
        style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", borderColor: "var(--border)" }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Add New expense</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-1 font-medium">Category type</label>
          <select
            value={categorytype}
            onChange={(e) => {
              setCategorytype(e.target.value);
              setExpenseType(""); // Reset expense type on category change
            }}
            className={`w-full rounded-lg p-2 focus:outline-none focus:ring-2 appearance-none ${categorytype ? "bg-black text-white" : "bg-[var(--input)] text-[var(--foreground)]"
              }`}
            required
            style={{ border: "1px solid var(--border)", colorScheme: "dark" }}
          >
            <option value="">Select a category</option>
            {distinctCategories.map((cat, idx) => (
              <option key={idx} value={cat} style={{ backgroundColor: "black", color: "white" }}>
                {cat}
              </option>
            ))}
          </select>

          <label className="block mb-1 font-medium mt-4">Expense type</label>
          <select
            value={expensetype}
            onChange={(e) => setExpenseType(e.target.value)}
            className={`w-full rounded-lg p-2 focus:outline-none focus:ring-2 appearance-none ${expensetype ? "bg-black text-white" : "bg-[var(--input)] text-[var(--foreground)]"
              }`}
            required
            disabled={!categorytype}
            style={{ border: "1px solid var(--border)", colorScheme: "dark" }}
          >
            <option value="">Select an expense type</option>
            {filteredExpenseTypes.map((name, idx) => (
              <option key={idx} value={name} style={{ backgroundColor: "black", color: "white" }}>
                {name}
              </option>
            ))}
          </select>

          <div className="mb-4 mt-4">
            <label className="block mb-1 font-medium">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg p-2 focus:outline-none focus:ring-2"
              required
              style={{ backgroundColor: "var(--input)", color: "var(--foreground)", border: "1px solid var(--border)" }}
            />

            <label className="block mb-1 font-medium mt-4">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg p-2 focus:outline-none focus:ring-2"
              required
              style={{ backgroundColor: "var(--input)", color: "var(--foreground)", border: "1px solid var(--border)" }}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", cursor: "pointer" }}
            >
              Submit
            </Button>
            <Button
              type="button"
              className="flex-1 border"
              style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)", borderColor: "var(--border)", cursor: "pointer" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
