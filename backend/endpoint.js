import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";


env.config()

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect();

// Get all expense categories
app.get("/", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM expensecategeries`);
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Database error",
    });
  }
});

// Get name colummn from expense categories
app.get("/name", async (req, res) => {
  try {
    const result = await db.query(`SELECT name FROM expensecategeries`);
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Database error",
    });
  }
});

// create new expense categories
app.post("/new", async (req, res) => {
  const {name,description} = req.body
  try {
    const result = await db.query(`INSERT INTO expensecategeries(name, description) VALUES ($1, $2) RETURNING *`,[name,description]);
    res.status(201).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Database error",
    });
  }
});



// Delete expense category
app.delete("/data", async (req, res) => {
    const Id = req.query.id;

    try {
        const result = await db.query(
            `DELETE FROM expensecategeries WHERE id = $1 RETURNING *`, 
            [Id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.status(200).json({
            status: "success",
            data: result.rows[0]  // Returning deleted record
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: "failure", 
            error: 'Database error' 
        });
    }
});


// Get all expensetype
app.get("/type", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM expensetype`);
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Database error",
    });
  }
});

// Get name colummn from expensetype
app.get("/expensename", async (req, res) => {
  try {
    const result = await db.query(`SELECT categorytype,name FROM expensetype`);
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Database error",
    });
  }
});

// create new expensetype
app.post("/newtype", async (req, res) => {
  const {categorytype,name} = req.body
  try {
    const result = await db.query(`INSERT INTO expensetype(categorytype,name) VALUES ($1, $2) RETURNING *`,[categorytype,name]);
    res.status(201).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Database error",
    });
  }
});



// Delete expensetype
app.delete("/type", async (req, res) => {
    const Id = req.query.id;

    try {
        const result = await db.query(
            `DELETE FROM expensetype WHERE id = $1 RETURNING *`, 
            [Id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.status(200).json({
            status: "success",
            data: result.rows[0]  // Returning deleted record
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: "failure", 
            error: 'Database error' 
        });
    }
});


// Get all expenses
app.get("/expense", async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM expenses`);
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Database error",
    });
  }
});



// create new expense
app.post("/newexpense", async (req, res) => {
  const {expensecategorytype,expensetype,description,amount} = req.body
  try {
    const result = await db.query(`INSERT INTO expenses (expensecategorytype,expensetype,description,amount) VALUES ($1, $2,$3,$4) RETURNING *`,[expensecategorytype,expensetype,description,amount]);
    res.status(201).json({
      status: "success",
      data: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      message: "Database error",
    });
  }
});



// Delete expenses

app.delete("/expense", async (req, res) => {
    const Id = req.query.id;

    try {
        const result = await db.query(
            `DELETE FROM expenses WHERE id = $1 RETURNING *`, 
            [Id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.status(200).json({
            status: "success",
            data: result.rows[0]  // Returning deleted record
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            status: "failure", 
            error: 'Database error' 
        });
    }
});


app.listen(port, () =>
  console.log(`REST API running at http://localhost:${port}`)
);
