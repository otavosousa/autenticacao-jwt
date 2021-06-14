//index.js
const http = require('http'); 
const express = require('express'); 
const app = express(); 
 
app.use(express.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})

app.get('/clientes', (req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'Otavio'}]);
}) 

const server = http.createServer(app); 
server.listen(3333);
console.log("Servidor escutando na porta 3333...")