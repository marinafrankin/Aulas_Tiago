# CreateIndex: cria um índice em um único campo
```js
// único
db.clientes.createIndex({ email: 1})
db.clientes.find({ email: "kaiq@hotmail.com" })

// composto
db.clientes.createIndex({ nome: 1, email: -1})
db.clientes.find({ nome: "Kaique" }).sort({ idade: -1}).explain("executionStats") // 'explain' analisa como a consulta está sendo processada, se um índice foi usado e o custo da operação

// campos textuais
db.produtos.createIndex({ produto: "text"})
db.produtos.find({ $text: { $search: "cartas" } })
```

# IndexSize: verifica o espaço total ocupado pelos índices de uma coleção
```js
db.clientes.totalIndexSize()
```

# Hint: permite forçar um índice na consulta que sabemos ser melhor
```js
// Criando os índices
db.produtos.createIndex({ produto: 1 })
db.produtos.createIndex({ produto: 1, categoria: 1 })

// Consulta
db.produtos.find({ produto: "cartas" }).explain("executionStats")

// Forçando o uso do índice
db.produtos.find({ produto: "cartas" }).hint({ produto: 1, categoria: 1 }).explain("executionStats")
```

# GetIndexes: lista os índices existentes de uma coleção
```js
db.clientes.getIndexes()
```

# DropIndex: permite remover um índice para economizar espaço
```js
db.clientes.dropIndex("email_1")
```

