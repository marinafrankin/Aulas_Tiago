# Inc: incrementa o valor de um campo numérico
```js
db.clientes.updateOne(
    {
        nome: "Kaique"
    },
    {
        $inc: { idade: 1 } // aumenta em 1
    }
)
```

# Mul: multiplica o valor de um campo
```js
db.clientes.updateOne(
    {
        nome: "Kaique"
    },
    {
        $mul: { idade: 2 } // dobra o valor
    }
)
```

# Min: atualiza o campo apenas se o novo valor for menor que o atual
```js
db.clientes.updateOne(
    {
        nome: "Kaique"
    },
    {
        $min: { idade: 21 } // se for maior que 21, reduz pra 21
    }
)
```

# Max: atualiza o campo apenas se o novo valor for maior que o atual
```js
db.clientes.updateOne(
    {
        nome: "Kaique"
    },
    {
        $max: { idade: 21 } // se for menor que 21, aumenta pra 21
    }
)
```