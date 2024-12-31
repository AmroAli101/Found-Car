import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { data: null, error: null });
});

app.post("/", async (req, res) => {
  const carNumber = req.body.carNumber;

  try {
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=851ecab1-0622-4dbe-a6c7-f950cf82abf9&q=${carNumber}`
    );
    const result = response.data.result.records;

    if (result.length > 0) {
      res.render("index.ejs", { data: result[0], error: null });
    } else {
      res.render("index.ejs", { data: null, error: "Car not found." });
    }
  } catch (error) {
    res.render("index.ejs", { data: null, error: "An error occurred." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
