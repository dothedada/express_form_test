import express from "express";
const app = express();
import { usersRouter } from "./routes/usersRouter.js";
import { searchRouter } from "./routes/searchRouter.js";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);
app.use("/search", searchRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`al aire en puerto ${PORT}`);
});
