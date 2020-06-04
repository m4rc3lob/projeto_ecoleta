//iniciamos com a utilização do npm no terminal
//npm - node package manage (gerenciador de pacotes do node)
//comando npm init -y
// esse comando vai trasnformar a pasta em um projeto "package.json"

// depois instalamos o express: npm install express
//vai ser criado uma pasta node_modules, com o express e suas dependencias

//devemos instalar o "nodemon" para realizar o monitoramento das atividades, e sempre que tiver alteração o servidor vai reiniciar sozinho
// comando: npm install nodemon -D
// OBS: o "-D" é um arguumento p/ instalar como dependencia de desenvolvimento.

// depois de criar e configurar as rotas do servidor, vamos instalar o nunjucks, que vai trasnformar meu HTML de um modelo estático p/ dinâmico
// comando: npm install nunjucks

const express = require("express")  //vai utilizar o express pra começar o servidor
const server = express()            // server recebe e inicializa o servidor 

//configurar public
server.use(express.static("public"))    //config para visualizar as pastas dentro do public como se tivesse fora


// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,                    // aqui fazemos uma conexão entre o nosso express e o motor do nunjucks para rodar nossas páginas
    noCache: true                       // aqui não permitimos salvar caches, para evitar futuros erros
})


//configurar caminhos da minha aplicação (pagina inicial)
// req: requisição      res: resposta

server.get("/", (req, res) => {
    return res.render("index.html", { title: "Título"}) //nossa res puxa o arquivo index.html e passa pelo motor do nunjucks
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000)