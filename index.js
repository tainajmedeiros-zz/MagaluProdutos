const express = require("express");
const app = express();

// configuração
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Escutando a porta
app.listen(3000, () => {
  console.log("Servidor rodando!!!");
});

var bancoDeDados = {
  produtos: [
    {
      id: 1,
      nome: "DELL",
      categoria: "computador",
      preco: 2000,
    },
    {
      id: 2,
      nome: "Iphone",
      categoria: "celular",
      preco: 10500,
    },
    {
      id: 3,
      nome: "HP",
      categoria: "computador",
      preco: 3000,
    },
  ],
};

let qtde = ++bancoDeDados.produtos.length;
app.get("/produtos", (req, res) => {
  res.statusCode = 200;
  res.json(bancoDeDados);
});

app.get("/produto/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var produto = bancoDeDados.produtos.find((prod) => prod.id == id);

    if (produto == undefined) {
      res.sendStatus(404);
    } else {
      res.json(produto);
      res.sendStatus(200);
    }
  }
});

app.post("/produto", (req, res) => {
  var { nome, categoria, preco } = req.body;

  if (nome == null && preco == null) {
    res.sendStatus(400);
  } else {
    bancoDeDados.produtos.push({
      id: qtde,
      nome,
      categoria,
      preco,
    });
    //res.json(req.body);
    res.sendStatus(201);
    qtde++;
  }
});

app.delete("/produto/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var produtoID = bancoDeDados.produtos.findIndex((prod) => prod.id == id);

    if (produtoID == -1) {
      res.sendStatus(404);
    } else {
      bancoDeDados.produtos.splice(produtoID, 1);
      res.sendStatus(200);
    }
  }
});

app.put("/produto/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    var id = parseInt(req.params.id);
    var produto = bancoDeDados.produtos.find((prod) => prod.id == id);

    if (produto == undefined) {
      res.sendStatus(404);
    } else {
      var { nome, categoria, preco } = req.body;

      if (nome != undefined) {
        produto.nome = nome;
      }

      if (categoria != undefined) {
        produto.categoria = categoria;
      }

      if (preco != undefined) {
        produto.preco = preco;
      }

      res.sendStatus(200);
    }
  }
});
