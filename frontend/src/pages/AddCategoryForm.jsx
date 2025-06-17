import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "../../components/ui/button"

export function AddCategoryForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const personid = localStorage.getItem("personid");

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_BASE_URL}/category-new`, { name, description, personid })
      navigate("/categories")
      alert("category is added Successful")
    } catch (error) {
      console.error("Error creating category:", error)
      alert("failed to add category")
    }
  }


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
        <h1 className="text-2xl font-bold mb-4 text-center">Add New Category</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
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
              value={description}
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
                cursor: "pointer"
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
                 cursor: "pointer",
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
