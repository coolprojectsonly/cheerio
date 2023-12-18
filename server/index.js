import cheerio from "cheerio";
import axios from "axios";
import cors from "cors";
import express from "express";

const app = express();
const port = 5000;
app.use(cors());

app.get("/scrape", async (req, res) => {
  try {
    const response = await axios.get("http://example.com");
    const $ = cheerio.load(response.data);

    const scraped = [];

    scraped.push($("p").text().split(" "));

    res.send(scraped);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
