import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/ui/button";

export function AddExpenseTypeForm() {
  const [categorytype, setCategorytype] = useState(""); // selected value
  const [name, setName] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]); // NEW: list of categories
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const personid = localStorage.getItem("personid");

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(`${API_BASE_URL}/name?personid=${personid}`,);
        setCategoryOptions(res.data.data); // assuming it's an array of { name: "..." }
      } catch (error) {
        console.error("Error fetching category types", error);
      }
    }

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/newtype`, { categorytype, name,personid });
      navigate("/type");
    } catch (error) {
      console.error("Error creating category:", error);
      navigate("/type");
    }
  };

  const handleCancel = () => {
    navigate("/type");
  };

  return (
    <div className="flex justify-center items-center min-h-screen"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <div className="shadow-md border rounded-2xl p-6 w-full max-w-md"
        style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)", borderColor: "var(--border)" }}>
        <h1 className="text-2xl font-bold mb-4 text-center">Add New expense type</h1>
        <form onSubmit={handleSubmit}>
           <label className="block mb-1 font-medium">Category type</label>
          <select
            value={categorytype}
            onChange={(e) => setCategorytype(e.target.value)}
            className={`w-full rounded-lg p-2 focus:outline-none focus:ring-2 appearance-none ${categorytype ? 'bg-black text-white' : 'bg-[var(--input)] text-[var(--foreground)]'}`}
            required
            style={{
              border: '1px solid var(--border)',
              colorScheme: 'dark', // Improves visibility on some systems
            }}
          >
            <option value="">Select a category</option>
            {categoryOptions.map((option, idx) => (
              <option
                key={idx}
                value={option.name}
                style={{ backgroundColor: 'black', color: 'white' }} // Styling <option>
              >
                {option.name}
              </option>
            ))}
          </select>


          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg p-2 focus:outline-none focus:ring-2"
              required
              style={{ backgroundColor: "var(--input)", color: "var(--foreground)", border: "1px solid var(--border)" }}
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Submit
            </Button>
            <Button
              type="button"
              className="flex-1 border"
              style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)", borderColor: "var(--border)" }}
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
