const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

// Parse application/json
app.use(bodyParser.json());

// Endpoint para recibir mensajes del cliente
app.post('/message', async (req, res) => {
  const { message } = req.body;

  try {
    // Configura tu API de OpenAI
    const openaiApiKey = 'tu_api_key_de_openai';
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: message,
      max_tokens: 50, // Longitud máxima de la respuesta generada
      stop: ['\n'],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
    });

    // Envía la respuesta generada por OpenAI al cliente
    res.json({ message: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor API iniciado en http://localhost:${port}`);
});
