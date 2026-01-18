// server.js
import express from "express";
import fetch from "node-fetch"; // Node 18+ já tem fetch, mas garante compatibilidade
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint para gerar rotas
app.post("/rotas", async (req, res) => {
  try {
    const ORS_API_KEY = process.env.ORS_API_KEY;
    if (!ORS_API_KEY) return res.status(500).json({ error: "ORS_API_KEY não configurada" });

    const { jobs, vehicles } = req.body;

    if (!jobs || !vehicles) return res.status(400).json({ error: "jobs ou vehicles ausentes" });

    // Monta payload para ORS Optimization API
    const payload = {
      jobs,
      vehicles,
      options: {
        g: true // retorna geometria para highlight no mapa
      }
    };

    const resp = await fetch("https://api.openrouteservice.org/optimization", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ORS_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();

    // ORS às vezes retorna sucesso sem rotas
    if (data.error) return res.status(500).json({ error: data.error });

    res.json(data); // envia todo o JSON de volta para o front-end
  } catch (err) {
    console.error("Erro na comunicação com ORS:", err);
    res.status(500).json({ error: "Erro na comunicação com a API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
