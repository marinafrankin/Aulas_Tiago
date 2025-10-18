# And: exige que todas as condições especificadas sejam verdadeiras
```js
db.produtos.find({
    "$and": [
        { "categoria": "Jogos" },
        { "preco": { "lte": 100 } }
    ]
})
```

# Or: retorna documentos que satisfaçam pelo menos uma das condições especificadas
```js
db.produtos.find({
    "$or": [
        { "categoria": "Jogos" },
        { "quantidade": 1 }
    ]
})
```

# Not: nega uma condição específica.
```js
db.produtos.find(
    {
        "preco": {
            "$not": { "$gt": 100 }
        }
    }
)
```

# Nor: é o oposto de $or, excluindo documentos que satisfaçam qualquer uma das condições listadas.
```js
db.produtos.find({
    "$nor": [
        { "categoria": "Cartas" },
        { "quantidade": { "$gt": 1000 } }
    ]
})
```