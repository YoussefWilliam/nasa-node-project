const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const { loadPlanetsData } = require("./models/planets.model");

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:62BC1Kq6EWVDAbu5@nasacluster.acndd0v.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.once("open", () => console.log("connection is on!!"));
mongoose.connection.on("error", (err) => console.error(err));
async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
}

server.listen(PORT, () => console.log(`🚀 Listening to port ${PORT} 🚀`));

startServer();
