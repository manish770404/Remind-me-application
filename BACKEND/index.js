import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/mykeeperAppDB")
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));

// Schema and Model
const keeperSchema = mongoose.Schema({
  title: String,
  description: String,
});

const Keeper = mongoose.model("Keeper", keeperSchema);

// Routes
// Get all keepers
app.get("/api/getAll", async (req, res) => {
  try {
    const keeperList = await Keeper.find();
    res.status(200).send(keeperList);
  } catch (err) {
    console.error("Error fetching keepers:", err);
    res.status(500).send("Error fetching keepers");
  }
});

// Add a new keeper
app.post("/api/addNew", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newKeeper = new Keeper({ title, description });
    await newKeeper.save();
    res.status(201).send("Keeper added successfully");
  } catch (err) {
    console.error("Error adding keeper:", err);
    res.status(500).send("Error adding keeper");
  }
});

// Delete a keeper
app.delete("/api/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Keeper.findByIdAndDelete(id);
    res.status(200).send("Keeper deleted successfully");
  } catch (err) {
    console.error("Error deleting keeper:", err);
    res.status(500).send("Error deleting keeper");
  }
});

// Start Server
app.listen(3001, () => {
  console.log("Backend created at port 3001");
});
