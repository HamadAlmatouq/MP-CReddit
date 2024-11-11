const express = require("express");
const postsRouter = require("./api/posts/routers");

const app = express();
app.use(express.json());

app.use("/", postsRouter);

//http://localhost:8000
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`the application is running on ${PORT}`);
});
