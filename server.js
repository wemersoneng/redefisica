import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImMwNzA3NmE4OGU1ZjQwNTRhNTI4M2ZkNzlmMTY4Y2Y2IiwiaCI6Im11cm11cjY0In0="; // substitua pela sua

// Roteirização
app.post("/rotas", async (req, res) => {
  try {
    const { jobs, vehicles } = req.body;

    // Monta payload para a ORS Optimization API
    const payload = { jobs, vehicles };

    const resp = await fetch("https://api.openrouteservice.org/optimization", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": ORS_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (data.error) return res.status(400).json({ error: data.error });

    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro na comunicação com a API" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
