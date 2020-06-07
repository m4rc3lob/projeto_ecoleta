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

// pegar o banco de dados
const db = require("./database/db.js")

//configurar public
server.use(express.static("public"))    //config para visualizar as pastas dentro do public como se tivesse fora

//habilitar o uso da req.body na aplicação
server.use(express.urlencoded({ extended: true}))


// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,                    // aqui fazemos uma conexão entre o nosso express e o motor do nunjucks para rodar nossas páginas
    noCache: true                       // aqui não permitimos salvar caches, para evitar futuros erros
})


//configurar caminhos da minha aplicação (pagina inicial)
// req: requisição      res: resposta

server.get("/", (req, res) => {
    
    
    return res.render("index.html", { title: "Título"}) 
    //nossa res puxa o arquivo index.html e passa pelo motor do nunjucks
})

server.get("/create-point", (req, res) => {
        
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    
    //rec.body: corpo do formulário
    //console.log(req.body)

    //inserir dados no banco de dados
     const query = `
            INSERT INT places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES ( ?, ?, ?, ?, ?, ?, ? );
        `
     const values = [
         req.body.image,
         req.body.name,
         req.body.address,
         req.body.address2,
         req.body.state,
         req.body.city,
         req.body.items
        
        ]
    
    function afterInsertData(err){
        if (err) { 
            console.log(err)
            //return res.render("create-point.html", {saved: true})
            return res.send("Erro no cadastro")
         
        }
            
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})   
         
    }
    
    db.run(query, values, afterInsertData)
    
})





server.get("/search", (req, res) => {
    
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) { 
            return console.log(err) 
        }

        const total = rows.length
        
        
        return res.render("search-results.html", { places: rows, total: total })
    })

      
})

//ligar o servidor
server.listen(3000)