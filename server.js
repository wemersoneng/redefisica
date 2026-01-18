// server.js
// Node.js + Express backend para proteger a chave da OpenRouteService

const express = require("express");
const fetch = require("node-fetch"); // npm install node-fetch
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const ORS_API_KEY = "SUA_CHAVE_AQUI"; // coloque aqui sua chave ORS

// Endpoint para gerar rotas
app.post("/gerar-rotas", async (req, res) => {
  try {
    const payload = req.body;

    // Profile correto da ORS
    payload.profile = "driving-car";
    payload.options = { g: true }; // para rotas geográficas

    const response = await fetch("https://api.openrouteservice.org/optimization", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ORS_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro na comunicação com a API" });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
