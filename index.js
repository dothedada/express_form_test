import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("on lain bitch");
});

app.listen(PORT, () => {
  console.log(`al aire en puerto ${PORT}`);
});
