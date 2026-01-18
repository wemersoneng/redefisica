// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImMwNzA3NmE4OGU1ZjQwNTRhNTI4M2ZkNzlmMTY4Y2Y2IiwiaCI6Im11cm11cjY0In0='; // substitua com sua API key

app.post('/rotas', async (req,res)=>{
  try{
    const response = await fetch('https://api.openrouteservice.org/optimization', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': API_KEY
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch(err){
    console.error(err);
    res.status(500).json({error:'Erro ao chamar ORS'});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Backend rodando na porta ${PORT}`));
