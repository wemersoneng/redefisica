// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint que o front-end chama
app.post("/rotas", async (req, res) => {
  const payload = req.body;

  try {
    const response = await fetch("https://api.openrouteservice.org/optimization", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.ORS_API_KEY // <--- coloque a chave no Render Environment
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send({ error: text });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro na comunicação com a API" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
