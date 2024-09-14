


const WebSocket = require('ws');
const axios = require('axios');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', async message => {
        try {
            // Convert  to string
            const userMessage = message.toString();

            // Send request 
            const response = await axios.post('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
                inputs: userMessage,  
            }, {
                headers: {
                    'Authorization': `Bearer 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`, 
                    'Content-Type': 'application/json'
                }
            });

            console.log('API response:', response.data);
            const botMessage = response.data[0].generated_text;  

            // Send 
            ws.send(botMessage);

        } catch (error) {
            console.error('Error details:', error.response ? error.response.data : error.message);
            ws.send('Error: Unable to fetch response from the AI model.');
        }
    });
});

console.log('WebSocket server started on ws://localhost:8080');
