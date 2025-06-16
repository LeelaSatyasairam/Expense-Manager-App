import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "../../components/ui/button"
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function LoginPage() {
    const [username, setName] = useState("")
    const [password, setDescription] = useState("")
    const [note, setNote] = useState(""); // ✅ Fix: Add a state variable
    const [showPassword, setShowPassword] = useState(false);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    const token = response.data.data[0].token;
    const name = response.data.data[0].username;
    const personid = response.data.data[0].personid;
    
    if (token) {                                   // ✅ Store in localStorage instead of cookie
      localStorage.setItem("token", token);       // ✅ Store token
      localStorage.setItem("name", name);         // ✅ Store name
      localStorage.setItem("personid",personid)   // ✅ Store personid
      navigate("/categories");
    } else {
      alert("Login failed: Token not found");
    }
  } catch (error) {
    console.error("Login failed:", error);
    setNote("username or password is invalid ")
  }
};
    const handleRegister = () => {
        navigate("/register")
    }

    return (

        <div
            className="flex justify-center items-center min-h-screen "
            style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
        >
            <div
                className="shadow-md border rounded-2xl p-6 w-full  max-w-md"
                style={{
                    backgroundColor: "var(--card)",
                    color: "var(--card-foreground)",
                    borderColor: "var(--border)"
                }}
            >
                <h1 className="text-3xl font-bold mb-8 text-center">Login  <br /> To Expense manger</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            type="text"
                            value={username}
                            placeholder="Enter username"
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
                    <div className="mb-6 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-lg p-2 pr-10 focus:outline-none focus:ring-2"
                            required
                            style={{
                                backgroundColor: "var(--input)",
                                color: "var(--foreground)",
                                border: "1px solid var(--border)",
                            }}
                        />
                        <span
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
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
                            Login
                        </Button>
                        <Button
                            type="button"
                            className="flex-1 border"
                            style={{
                                backgroundColor: "var(--secondary)",
                                color: "var(--secondary-foreground)",
                                borderColor: "var(--border)",
                            }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </div>
                </form>
                <h3 className="text-center mt-3 text-white-300/100">for new users, register first</h3>
                <h3 className="text-center mt-3 text-white-300/100 text-red-500" >{note}</h3>
            </div>
        </div>
    )
}
