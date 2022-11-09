import express from 'express';
import path, { join } from 'path';
import {fileURLToPath} from 'url';
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const httpserver = http.createServer(app)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const io = new Server(httpserver);

app.use(express.static(join(__dirname, 'public')))

io.on('connection', (socket) => {
  console.log("New websocket connection")
})

const PORT = 3000 || process.env.PORT;

httpserver.listen(PORT, () => console.log(`Server runnning on sport port ${PORT}`));