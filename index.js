const express = require('express');
const axios = require('axios');
const app = express();

// Obtenha o BEARER_TOKEN das variáveis de ambiente
const BEARER_TOKEN = process.env.BEARER_TOKEN;

// Função para buscar tweets contendo hashtags específicas
app.get('/search-tweets', async (req, res) => {
    try {
        const hashtags = ['Roblox', 'RDC24', 'DEVChurras'];
        const query = hashtags.map(tag => `#${tag}`).join(' OR ');

        const response = await axios.get('https://api.twitter.com/2/tweets/search/recent', {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`
            },
            params: {
                'query': query,
                'max_results': 100,
                'tweet.fields': 'created_at'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('Erro ao buscar tweets:', error.message);
        res.status(500).send('Erro ao buscar tweets do Twitter');
    }
});

app.listen(3000, () => {
    console.log('Servidor intermediário rodando na porta 3000');
});

module.exports = app; // Exporta o app para ser usado pelo Vercel
