# Exemplo de Embedded (documentos incorporados)
```js
db.compra.insertOne(
    {
        cliente_id: ObjectId("68cab6bac1990073e75b8c8c"),
        data: new Date(),
        itens: [
            {
                produto_id: ObjectId("68cab6c8c1990073e75b8c8d"),
                preco: 99.99,
                quantidade: 1,
                total_unitario: 99.99
            }
        ]
    }
);
```

# Exemplo de referência
```js
// Exemplo 1
db.compra.insertOne(
    {
        cliente_id: ObjectId("68cab6bac1990073e75b8c8c"),
        data: ISODate("2025-09-27T00:00:00Z"),
        itens: [
            ObjectId("68cab6c8c1990073e75b8c8d")
        ]
    }
);

// Exemplo 2
db.clientes.aggregate([
    {
        
        $lookup: {
            from: "vendas",
            localField: "_id",
            foreignField: "cliente_id",
            as: "vendas_cliente"
        }
    },
    {
        $match: { 
            "vendas_cliente.ano": { $ne: 2023 } // Not Equal
        }
    },
    {
        $project: {
            nome: 1,
            email: 1,
            regiao: 1
        }
    }
])
```

# Aggregate
```js
db.compra.aggregate([
    {
        $lookup: {
            from: "cliente",
            localField: "cliente_id",
            foreignField: "_id",
            as: "cliente_info"
        }
    }
]);
```

# InsertOne - com Embedded
```js
db.compra.insertOne(
    {
        cliente_id: ObjectId("68cabd5ec1990073e75b8c91"),
        data: new Date(),
        itens: [
            {
                produto_id: ObjectId("68cabdb0c1990073e75b8c92"),
                preco: 250,
                quantidade: 2,
                total_unitario: 500
            },
            {
                produto_id: ObjectId("68cabdb0c1990073e75b8c93"),
                preco: 150,
                quantidade: 1,
                total_unitario: 150
            }
        ]
    }
);
```