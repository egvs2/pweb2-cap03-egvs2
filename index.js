// Atividade Cap. 3 — Servidor HTTP com a biblioteca padrão (node:http).
//
// Implemente aqui um servidor que atenda às 10 rotas descritas no README.md.
//
// Regras essenciais:
//   - Use o módulo nativo `node:http` (NÃO use Express — o objetivo é sentir "na mão").
//   - O servidor deve ouvir em `process.env.PORT || 3000`.
//   - Resolva UMA rota por commit, seguindo o padrão de mensagens em COMMITS.md.
//   - A cada push, o autograder roda sozinho e mostra o resultado na aba "Actions".
//
// Ponto de partida (descomente e desenvolva):
//

import http from 'node:http'

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {

    const path =  req.url.split('?')[0]

    const metodo = req.method

    if(metodo === 'GET' && path === '/'){
        res.writeHead(200, {'Content-Type': 'text/plain'})
        return res.end('Olá, Mundo!')
    }

    if(metodo === 'GET' && path === '/sobre'){
        res.writeHead(200, {'Content-Type': 'text/html'})
        return res.end('<h1>Sobre</h1>')
    }

    if(metodo === 'GET' && path.startsWith('/saudacao')){
        const nome = path.slice(10)
        res.writeHead(200, {'Content-Type':'Text/plain; charset=utf-8'})
        return res.end(`Olá, ${nome}!`)
    }

    if(metodo === 'POST' && path === '/echo'){
        let corpo = ''
        req.on('data', (chunk) => {
            corpo += chunk
        })

        return req.on('end', ()=>{
            res.writeHead(200, {'Content-Type':'Text/plain; charset=utf-8'})
            res.end(corpo)
        })
    }

    if(metodo === 'PUT' && path.startsWith('/itens/')){
        const id = path.slice(7)
        res.writeHead(200, {'Content-Type':'Text/plain; charset=utf-8'})
        return res.end(`Item ${id} atualizado`)
    }

    if(metodo === 'DELETE' && path.startsWith('/itens/')){
        res.writeHead(204)
        return res.end()
    }

    if(metodo === 'PATCH' && path === '/config'){
        res.writeHead(200, {'Content-Type':'Text/plain; charset=utf-8'})
        return res.end('Configuração atualizada')
    }

    
    res.writeHead(404,{'Content-Type' : 'Text / plain:charset=utf-8'})
    res.end('Não encotrado')
})

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}; Ctrl-C para terminar....`)
})