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

# InsertOne: Inserir um documento
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

# InsertMany: Inserir vários documentos
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
# Find: Encontrar todos os documentos de uma coleção
```js
db.clientes.find(
    {
        idade: 20
    }
)
```

# FindOne: Encontrar um documento
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

# UpdateOne: Atualizar um documento
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

# UpdateMany: Atualizar um documento
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

# ReplaceOne: Substituir um documento
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

# DeleteOne: Remover um documento
```js
db.clientes.deleteOne(
    {
        nome: "Kaique"
    }
)
```

# DeleteMany: Remover vários documentos
```js
db.clientes.deleteMany(
    {
        idade: { $lt: 20 }
    }
)
```

# Drop: Remover a coleção
```js
db.clientes.drop()
```

# DropDatabase: Remover o banco de dados
```js
db.dropDatabase()
```
