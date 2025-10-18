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
db.compra.insertOne(
    {
        cliente_id: ObjectId("68cab6bac1990073e75b8c8c"),
        data: ISODate("2025-09-27T00:00:00Z"),
        itens: [
            ObjectId("68cab6c8c1990073e75b8c8d")
        ]
    }
);
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

db.compra.aggregate([
    {
        $project: {
            cliente_id: 1,
            data: 1,
            itens: 1, // Remover essa linha caso não queira mostrar os itens
            valor_total_compra: {
                $sum: {
                    $map: {
                        input: "$itens",
                        as: "item",
                        in: "$$item.total_unitario"
                    }
                }
            }
        }
    }
])

db.compra.aggregate([
    {
        $lookup: {
            from: "cliente",
            localField: "cliente_id",
            foreignField: "_id",
            as: "cliente_info"
        }
    },
    {
        $project: {            
            data: 1,
            nome_cliente: {
                $reduce: {
                    input: "$cliente_info",
                    initialValue: "",
                    in: "$$this.nome" 
                }
            },
            valor_total_compra: {
                $sum: {
                    $map: {
                        input: "$itens",
                        as: "item",
                        in: "$$item.total_unitario"
                    }
                }
            }
        }
    }
])

// Reference
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
            "vendas_cliente.ano": { $ne: 2023 }
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
    $not: {
    $match: {
      ano: { $eq: 2023 }
    }}
  },
  {
    $project: {
      nome: 1,
      email: 1,
      regiao: 1
    }
  }
]);

db.produtos.find(
    {
        "avaliacao": {
            "$exists": true
            }
    }
);

// 1. Encontrar clientes que não realizaram nenhuma compra no ano de 2023
db.clientes.insertOne({
    nome: 'Marina',
    email: 'mari@email.com',
    regiao: 'Sudeste'
})

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
      vendas_cliente: { 
        $not: { $elemMatch: { ano: 2023 } } 
      }
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

// 2. Calcular a taxa de crescimento percentual das vendas de um mês para o outro no ano de 2023
db.pedidos.aggregate([
    {
        $match: {
            ano: 2023
        }
    },
    {
        $group: {
            _id: "$mes",
            total_vendas: { $sum: "$valor" }
        }
    }
])

// 3. Identificar produtos que nunca foram vendidos
db.produtos.aggregate([
  {
    $lookup: {
      from: "vendas",
      localField: "_id",
      foreignField: "produto_id",
      as: "vendas_produto"
    }
  },
  {
    $match: {
        vendas_produto: { $eq: [] }
    }
  },
  {
    $project: {
        nome: 1,
        vendas_produto: 1
    }
  }
])

// 4. Encontrar o cliente que mais gastou no ano de 2023
db.vendas.aggregate([
    {
        $match: {
            ano: 2023
        }
    },
    {
        $group: {
            _id: "$cliente_id",
            valor: { $sum: "$valor"} 
        }
    },
    {
        $sort: { valor: -1 }
    },
    {
        $limit: 1
    },
    {
        $lookup: {
            from: "clientes",
            localField: "_id",
            foreignField: "_id",
            as: "vendas_cliente"
        }
    },
    {
        $project: {
            vendas_cliente: 1,
            valor: 1
        }
    }
])

db.pedidos.aggregate([
    {
        $match: {
            ano: 2023
        }
    },
    {
        $group: {
            _id: "$cliente_id",
            total: { $sum: { $multiply: ["$preco_unitario", "$quantidade"] } } 
        }
    },
    {
        $sort: { total: -1 }
    },
    {
        $limit: 1
    },
    {
        $lookup: {
            from: "clientes",
            localField: "_id",
            foreignField: "_id",
            as: "pedidos_cliente"
        }
    },
    {
        $project: {
            pedidos_cliente: 1,
            total: 1
        }
    }
])

// 5. Calcular o total de pedidos por produto e por região dos clientes no ano de 2023
db.pedidos.aggregate([
    {
        $match: {
            ano: 2023
        }
    },
    {
        $lookup: {
            from: "clientes",
            localField: "cliente_id",
            foreignField: "_id",
            as: "cliente"
        }
    },
    {
        $unwind: "$cliente"
    },
    {
        $group: {
            _id: { produto: "$produto", regiao: "$cliente.regiao" },
            total: { $sum: "$quantidade" }
        }
    },
    {
        $sort: { total: -1 }
    },
    {
        $project: {
            _id: 0,
            produto: "$_id.produto",
            regiao: "$_id.regiao",
            total: 1
        }
    }
])


```