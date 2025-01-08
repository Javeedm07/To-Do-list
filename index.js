import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// Database configuration
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Database operations
const dbOps = {
  async getAllItems() {
    const result = await db.query("SELECT * FROM items ORDER BY id");
    return result.rows;
  },

  async addItem(title) {
    const result = await db.query(
      "INSERT INTO items(title) VALUES($1) RETURNING *",
      [title]
    );
    return result.rows[0];
  },

  async updateItem(id, title) {
    const result = await db.query(
      "UPDATE items SET title = $1 WHERE id = $2 RETURNING *",
      [title, id]
    );
    return result.rows[0];
  },

  async deleteItem(id) {
    const result = await db.query(
      "DELETE FROM items WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
};

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", asyncHandler(async (req, res) => {
  const items = await dbOps.getAllItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
    error: ""
  });
}));

app.post("/add", asyncHandler(async (req, res) => {
  const { newItem } = req.body;
  
  if (!newItem || newItem.trim() === "") {
    const items = await dbOps.getAllItems();
    return res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
      error: "Task cannot be empty."
    });
  }

  await dbOps.addItem(newItem.trim());
  res.redirect("/");
}));

app.post("/edit", asyncHandler(async (req, res) => {
  const { updatedItemId, updatedItemTitle } = req.body;

  if (!updatedItemId || !updatedItemTitle || updatedItemTitle.trim() === "") {
    const items = await dbOps.getAllItems();
    return res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
      error: "Updated task cannot be empty."
    });
  }

  await dbOps.updateItem(updatedItemId, updatedItemTitle.trim());
  res.redirect("/");
}));

app.post("/delete", asyncHandler(async (req, res) => {
  const { deleteItemId } = req.body;
  
  if (!deleteItemId) {
    const items = await dbOps.getAllItems();
    return res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
      error: "Invalid task deletion request."
    });
  }

  await dbOps.deleteItem(deleteItemId);
  res.redirect("/");
}));

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  dbOps.getAllItems()
    .then(items => {
      res.status(500).render("index.ejs", {
        listTitle: "Today",
        listItems: items,
        error: "An unexpected error occurred. Please try again."
      });
    })
    .catch(error => {
      console.error("Error fetching items for error page:", error);
      res.status(500).render("index.ejs", {
        listTitle: "Today",
        listItems: [],
        error: "An unexpected error occurred. Please try again."
      });
    });
});

// Initialize database and start server
const init = async () => {
  try {
    await db.connect();
    console.log("Database connected successfully");
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await db.end();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (err) {
    console.error("Error during database disconnect:", err);
    process.exit(1);
  }
});

init();