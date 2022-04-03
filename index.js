const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const allRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

db.then(() => console.log("berhasil konek ke mongoose")).catch((err) =>
  console.log("gagal konek ke mongo")
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use(allRouter);

app.get("/", (req, res) => {
  res.json("Welcome to API Flowers");
});

app.listen(PORT, () => {
  console.log("server online on PORT", PORT);
});
