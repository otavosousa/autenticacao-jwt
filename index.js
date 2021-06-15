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


// AUTENTICACAO
app.post('/login', (req, res) => {

    const {user, password} = req.body

    // verifica no banco se o user existe e se as informacoes batem
    if (user === 'otavio' && password === '123') {

        const id = 1 // pega o id lá do user do banco

        // criar token
        const token = jwt.sign({id}, process.env.SECRET)
        
        return res.json({auth: true, token})
    }

    res.status(500).json({message: 'Usuario inválido'})

})

// AUTORIZAÇÃO
function verifyJWT(req, res, next){
    
    // verifica token mandado pelo cliente
    const token = req.headers['x-access-token']

    console.log('meu token: ' + token)

    if(!token) return res.status(400).json({message: 'Sem autorização'})

    jwt.verify(token, process.env.SECRET, function(err, decode){

        if(err) return res.status(500).json({message: 'Sem autorização'})

        // tudo OK: salva no request para o acesso dele às rotas
        req.userId = decode.id
        next()
    })
}

app.get('/app', verifyJWT, (req, res, next) => { 

    console.log("Entrou no app");
    res.json([{id:1,nome:'Otavio'}]);
}) 

app.post(('/logout', (req, res) => {

    res.json({auth: false, token: null})
    
}))



const server = http.createServer(app); 
server.listen(3333);
console.log("Servidor escutando na porta 3333...")