//index.js
const http = require('http'); 
const express = require('express'); 
const app = express(); 
const jwt = require('jsonwebtoken');
require('dotenv').config()
 
app.use(express.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})

app.get('/clientes', (req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'Otavio'}]);
}) 

// AUTENTICACAO
app.post('/login', (req, res) => {
    console.log('lalau')

    const {user, password} = req.body

    // verifica no banco se o user existe e se as informacoes batem
    if (user === 'otavio' && password === '123') {

        const id = 1 // pega o id lá do user do banco

        // criar token
        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: '300' // expira em 5min
        })
        
        res.json({auth: true, token})
    }

    res.status(500).json({message: 'Usuario inválido'})

})

app.post(('/logout', (req, res) => {

    res.json({auth: false, token: null})
    
}))



const server = http.createServer(app); 
server.listen(3333);
console.log("Servidor escutando na porta 3333...")