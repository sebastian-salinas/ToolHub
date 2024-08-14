import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors"; // Importar cors

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Usar cors

app.get("/api/currencies", async (req, res) => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/latest/USD`
    );
    const data = await response.json();
    res.json(data.conversion_rates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch currencies" });
  }
});

app.get("/api/convert", async (req, res) => {
  const { from, to, amount } = req.query;
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/pair/${from}/${to}`
    );
    const data = await response.json();
    const rate = data.conversion_rate;
    const result = amount * rate;
    res.json({ result: result.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: "Failed to convert currency" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
