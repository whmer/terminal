const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

let activeConnections = 0;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Caminho completo para o arquivo index.html dentro da pasta chan
        const filePath = path.join(__dirname, '../chan', 'index.html');

        // Lê o arquivo index.html
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro ao carregar o arquivo index.html');
                return;
            }

            // Define o cabeçalho para HTML e responde com o conteúdo do index.html
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada');
    }
});

const wss = new WebSocket.Server({ server });


wss.on('connection', (ws) => {
    console.log(`[-] usuário  conectado !`);

    activeConnections++;

    ws.on('close', () => {
        activeConnections--;
    });

    ws.on("message", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()));
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(data);
            }
          });
    });

    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
                //client.send(name);
                //console.log(name);
            }
        });
    });
});


server.listen(3000, () => {
    console.log('\nServidor WebSocket está ouvindo em: ws://localhost:3000\n');
});
