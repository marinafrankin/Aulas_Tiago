# Lookup: relaciona duas relações no aggregate
```js
db.clientes.aggregate([
    {
        $lookup: {
            from: "pedidos",
            localField: "pedido_id",
            foreignKey: "_id",
            as: "pedidos_cliente"
        }
    }
])
```

# Group: 

# Project: 

