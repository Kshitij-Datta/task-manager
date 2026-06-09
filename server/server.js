require("dotenv").config();
const app = require("./src/app");
const taskRoutes = require("./routes/task.route");

const connectDB = require("./config/db");

connectDB();
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
