import express from "express";
import yahooFinance from "yahoo-finance2";
import cors from "cors";

const app = express();
app.use(cors());
const yahooFinance = require("yahoo-finance2").default;

app.get("/", (req, res) => {
  res.send("✅ Yahoo Finance API is live!");
});

// Get stock quote
app.get("/quote/:symbol", async (req, res) => {
  try {
    const quote = await yahooFinance.quote(req.params.symbol);
    res.json(quote);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Search companies
app.get("/search/:term", async (req, res) => {
  try {
    const results = await yahooFinance.search(req.params.term);
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get chart data (historical)
app.get("/chart/:symbol", async (req, res) => {
  try {
    const chart = await yahooFinance.chart(req.params.symbol, {
      range: "1mo", // 1 month
      interval: "1d"         // daily data
    });
    res.json(chart);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


app.listen(3000, () => console.log("✅ Yahoo Finance API running on port 3000"));
