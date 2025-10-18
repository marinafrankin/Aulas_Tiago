# Set: define ou altera um campo específico
```js
db.clientes.updateOne(
    {
        nome: "Kaique"
    },
    {
        $set: { idade: 21 }
    }
)
```

# Unset: remove um campo de um documento
```js
db.clientes.updateOne(
    {
        nome: "Kaique"
    },
    {
        $unset: { idade: "" } // removido
    }
)
```

# Rename: renomeia um campo de um documento
```js
db.clientes.updateOne(
    {
        nome: "Kaique"
    },
    {
        $rename: { "idade": "age" }
    }
)
```