# Equal: retorna documentos cujo valor de um campo específico seja igual ao valor informado
```js
db.produtos.find(
    { 
        "preco": { "$eq": 100 } 
    }
)
```

# NotEqual: retorna documentos cujo valor de um campo específico seja diferente do valor informado
```js
db.produtos.find(
    { 
        "preco": { "$ne": 100 } 
    }
)
```

# GreaterThan: retorna documentos cujo valor de um campo seja maior que o especificado
```js
db.produtos.find(
    { 
        "preco": { "$gt": 10 } 
    }
)
```

# LowerThan: retorna documentos cujo valor de um campo seja menor que o especificado
```js
db.produtos.find(
    { 
        "preco": { "$lt": 100 } 
    }
)
```

# GreaterThanOrEqual e LowerThanOrEqual: variações dos operadores anteriores, incluindo valores iguais ao limite definido
```js
db.pedidos.find(
    {
        preco: { "$gte": 50 },
        quantidade: { "$lte": 215 }
    }
)
```

