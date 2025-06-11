import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios"
import { Button } from "../../components/ui/button"

export function EditCategoryForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



 // Fetch category data by ID

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log("Fetching category for id:", id);
      const res = await axios.get(`${API_BASE_URL}/singlecategory?id=${id}`);
      console.log("Category API response:", res.data);
      const category = res.data.data[0];
      setName(category.name ?? "");
      setDescription(category.description ?? "");
    } catch (err) {
      console.error("Failed to load category", err);
      alert("Failed to load category details");
    }
  };
  if (id) fetchData();
}, [id]);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Making PUT request to:");
      await axios.put(`${API_BASE_URL}/editcategory`, {
        id,
        name,
        description,
      });
      navigate("/categories")
    } catch (error) {
      console.error("Error updating category:", error);
      navigate("/categories")
    }
  };

  const handleCancel = () => {
    navigate("/categories")
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <div
        className="shadow-md border rounded-2xl p-6 w-full max-w-md"
        style={{
          backgroundColor: "var(--card)",
          color: "var(--card-foreground)",
          borderColor: "var(--border)",
        }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Category</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg p-2 focus:outline-none focus:ring-2"
              required
              style={{
                backgroundColor: "var(--input)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
             <input
              type="text"
               value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg p-2 focus:outline-none focus:ring-2"
              required
              style={{
                backgroundColor: "var(--input)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Submit
            </Button>
            <Button
              type="button"
              className="flex-1 border"
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--secondary-foreground)",
                borderColor: "var(--border)",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
