import express from "express";
import bodyParser from "body-parser";
import routes from "./Routes/Routes";

const app = express();
const PORT = 5000;

// parse application/json
app.use(bodyParser.json());

routes(app);

app.use("/", (req, res) => {
  res.send(`app running on port : ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`app running on port : ${PORT}`);
});
