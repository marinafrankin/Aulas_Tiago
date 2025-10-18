# Mostrar os bancos
show dbs 

# Criar o banco 
use estudos

# Mostrar coleções
show collections

# Criar coleções
db.createCollection("clientes")
db.createCollection("produtos")
db.createCollection("pedidos")

# Inserir um documento (InsertOne)
```js
db.clientes.insertOne(
    {
        nome: "Kaique",
        idade: 21,
        email: "kaiq@hotmail.com"
    }
)

db.clientes.insertOne(
    {
        nome: "Marina",
        idade: 20,
        pedidos: [
            { id_pedido: 101, produto: "Robux", quantidade: 1, preco: 50, total: 50 },
            { id_pedido: 109, produto: "Minecraft", quantidade: 1, preco: 100, total: 100 }
        ]
    }
)

db.pedidos.insertOne(
    {
        id_pedido: 105, 
        produto: "Pacote de cartas de Pokémon",
        quantidade: 3,
        preco: 10,
        total: 30
    }
)
```

# Inserir vários documentos (InsertMany)
```js
db.clientes.insertMany([
    {
        nome: "Bernardo",
        idade: 8
        genero: "Masculino"
    },
    {
        nome: "Yasmim",
        idade: 20
        genero: "Feminino"  
    },
    {
        nome: "Gabriel",
        idade: 26
        genero: "Masculino"
    }
])

db.produtos.insertMany([
    {
        nome: "Robux",
        categoria: "Jogos",
        quantidade: 200
        preco: 50
    },
    {
        nome: "Minecraft",
        categoria: "Jogos",
        quantidade: 5125
        preco: 100
    }
    {
        nome: "Pacote de cartas de Pokémon",
        categoria: "Cartas",
        quantidade: 215
        preco: 10
    }
])
```
# Encontrar todos os documentos de uma coleção (Find)
```js
db.clientes.find(
    {
        idade: 20
    }
)
```

# Encontrar um documento (FindOne)
```js
// Exibindo todas as informações do documento
db.clientes.findOne(
    {
        nome: "Kaique"
    }
)

// Exibindo todas as informações, menos o _id
db.clientes.findOne(
    {
        nome: "Kaique"
    },
    {
        _id: 0,
        nome: 1,
        idade: 1
    }
)
```

# Atualizar um documento (UpdateOne)
```js
db.clientes.updateOne(
    {
        nome: "Gabriel"
    },
    {
        $set: { idade: 27 }
    }
)
```

# Atualizar um documento (UpdateMany)
```js
db.clientes.updateMany(
    {
        genero: "Masculino"
    },
    {
        $set: { idade: 19 }
    }
)
```

# Substituir um documento (ReplaceOne)
```js
db.produtos.replaceOne(
    {
        nome: "Minecraft"
    },
    {
        nome: "Minecraft",
        categoria: "Jogos de computador",
        criadores: [],
        quantidade: 100,
        preco: 150
    }
)
```

# Remover um documento (DeleteOne)
```js
db.clientes.deleteOne(
    {
        nome: "Kaique"
    }
)
```

# Remover um documento (DeleteMany)
```js
db.clientes.deleteMany(
    {
        idade: { $lt: 20 }
    }
)
```

# Remover a coleção
```js
db.clientes.drop()
```

# Remover o banco de dados
```js
db.dropDatabase()
```
