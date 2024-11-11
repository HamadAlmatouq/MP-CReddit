const express = require("express");
const accountsRouter = require("./api/accounts/routers");

const app = express();
app.use(express.json());

app.use("/", accountsRouter);

//http://localhost:8000
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`the application is running on ${PORT}`);
});
