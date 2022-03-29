const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extend: true }));

app.listen(PORT, () => {
  console.log("server online on PORT", PORT);
});
