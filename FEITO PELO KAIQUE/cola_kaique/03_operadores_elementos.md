# Exists: verifica se um campo está presente ou não em um documento.
```js
db.produtos.find(
    {
        "categoria": { "$exists": true }
    }
)
```

# Type: filtra documentos com base no tipo de dado armazenado em um campo.
```js
db.produtos.find(
    {
        "preco": { "$type": "double" }
    }
)
```