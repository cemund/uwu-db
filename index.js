import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_url = "https://api.jikan.moe/v4";

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  const q = req.body.search;
  const type = req.body.type;

  try {
    const response = await axios.get(API_url + "/anime", {
      params: {
        q,
        type,
        order_by: req.body.order_by,
        sort: "desc",
      },
    });
    const result = await response.data;
    res.render("home.ejs", { ...result, q });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.get("/top/anime", async (req, res) => {
  try {
    const response = await axios.get(API_url + "/top/anime");
    const data = response.data;
    res.render("home.ejs", data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.get("/top/manga", async (req, res) => {
  try {
    const response = await axios.get(API_url + "/top/manga");
    const data = response.data;
    console.log(data);
    res.render("home.ejs", data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
app.get("/anime/:id", async (req, res) => {
  const malId = req.params.id;
  try {
    const response = await axios.get(API_url + "/anime/" + malId);
    const data = response.data;
    res.render("detail.ejs", data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
