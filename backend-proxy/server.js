// our sever is live in 3000 port

import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors"
import env from "dotenv";

// import  from 'cors'

env.config()
const app = express();
const port = process.env.PORT ||3000;
const API_URL = process.env.API_URL;

app.use(cors({
  origin: process.env.ORIGIN  // Allow your Vite/React frontend
}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// login to website
app.post("/login",async(req,res)=>{

  try {
    const response = await axios.post(`${API_URL}/login`,req.body);
    console.log(response);
    res.status(200).json(response.data );
  } catch (error) {
    res.status(500).json({ message: "Invaild password or login" })
  }});


// register to website
app.post("/register",async(req,res)=>{

try {
  const response = await axios.post(`${API_URL}/register`,req.body);
  console.log(response);
  res.status(201).json(response.data);
} catch (err) {
  console.log(err);
  res.status(500).json({message:"please select the unique password"})
}})

// Get all expense categories
app.get("/categories", async (req, res) => {
  try {
    const{ personid } = req.query
    const response = await axios.get(`${API_URL}/categories?personid=${personid}`);
    console.log(response);
    res.status(200).json(response.data );
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});


// Get single categories
app.get("/singlecategory", async (req, res) => {
  try {
     const { id } = req.query;
    const response = await axios.get(`${API_URL}/singlecategory?id=${id}`);
    console.log(response);
    res.status(200).json(response.data );
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Get name colummn from expense categories
app.get("/name", async (req, res) => {

  try {
    const{ personid } = req.query
    const response = await axios.get(`${API_URL}/name?personid=${personid}`);
    console.log(response);
    res.status(200).json(response.data );
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Create a new expense category
app.post("/new", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/new`, req.body);
    console.log(response.data);
    res.redirect("/categories");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// edit expense category
app.put("/editcategory",async(req,res) => {
try {
  const response = await axios.put(`${API_URL}/editcategory`,req.body);
  console.log(response.data);
  res.redirect("/categories");
} catch (err) {
  console.log(err);
  res.status(500).json({message:"Error editing post"});
}
})

// // Delete expense category
app.delete("/data", async (req, res) => {
  try {
    const { id } = req.query;
    const response = await axios.delete(`${API_URL}/data?id=${id}`);
    res.json({ status: "success", data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error: cannot delete" });
  }
});



// Get all expense type
app.get("/type", async (req, res) => {
  try {
    const{ personid } = req.query
    const response = await axios.get(`${API_URL}/type?personid=${personid}`);
    console.log(response);
    res.status(200).json(response.data );
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Get  expense type
app.get("/singletype", async (req, res) => {
  try {
     const { id } = req.query;
    const response = await axios.get(`${API_URL}/singletype?id=${id}`);
    console.log(response);
    res.status(200).json(response.data );
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Get name colummn from expense type
app.get("/expensename", async (req, res) => {
  try {
    const{ personid } = req.query
    const response = await axios.get(`${API_URL}/expensename?personid=${personid}`);
    console.log(response);
    res.status(200).json(response.data );
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Create a new expense type
app.post("/newtype", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/newtype`, req.body);
    console.log(response.data);
    res.redirect("/type");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// edit expense type
app.put("/editexpensetype",async(req,res) => {
try {
  const response = await axios.put(`${API_URL}/editexpensetype`,req.body);
  console.log(response.data);
  res.redirect("/type");
} catch (err) {
  console.log(err);
  res.status(500).json({message:"Error editing post"}); 
}
})

// // Delete expense type
app.delete("/type", async (req, res) => {
  const Id = req.query.id;

  if (!Id) {
    return res.status(400).json({ message: "Missing 'id' query parameter" });
  }

  try {
    await axios.delete(`${API_URL}/type?id=${Id}`);
    res.status(200).json({ message: "Deleted successfully" });

  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ message: "Error deleting post" });
  }
});



// Get all expenses

app.get("/expense", async (req, res) => {
  try {
    const{ personid } = req.query
    const response = await axios.get(`${API_URL}/expense?personid=${personid}`);
    console.log(response);
    res.status(200).json(response.data );
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Get single expense 
app.get("/singleexpense",async(req,res)=>{

try {
  const {id} = req.query;
  const response = await axios.get(`${API_URL}/singleexpense?id=${id}`)
  console.log(response);
  res.status(200).json(response.data );
} catch (err) {
  res.status(500).json({ message: "Error fetching posts" });
}
})

// Create a new expense 
app.post("/newexpense", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/newexpense`, req.body);
    console.log(response.data);
    res.redirect("/expense");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});


//edit expenses
app.put("/editexpenses",async(req,res)=>{
  try {
  const response = await axios.put(`${API_URL}/editexpenses`,req.body);
   console.log(response.data);  
  res.redirect("/expense");
  } catch (err) {
      console.log(err);
  res.status(500).json({message:"Error editing post"}); 
  }
  
})

// // Delete expense
app.delete("/expense", async (req, res) => {
  const Id = req.query.id;

  if (!Id) {
    return res.status(400).json({ message: "Missing 'id' query parameter" });
  }

  try {
    await axios.delete(`${API_URL}/expense?id=${Id}`);
    res.status(200).json({ message: "Deleted successfully" });
    res.redirect("/expense");
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ message: "Error deleting post" });
  }
});


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
