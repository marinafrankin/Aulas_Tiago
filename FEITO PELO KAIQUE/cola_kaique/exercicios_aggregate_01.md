<!-- --------------------------------------------------------------------------- -->
<!--                  EXERCÍCIOS DA LISTA DE AGGREGATION                         -->
<!-- --------------------------------------------------------------------------- -->



# 1. Encontrar clientes que não realizaram nenhuma compra no ano de 2023
```js
// Adicionando um novo cliente
db.clientes.insertOne({
    nome: 'Marina',
    email: 'mari@email.com',
    regiao: 'Sudeste'
})

// Verificando clientes que não fizeram compras - se fizesse a partir da coleção vendas, o $match viria no início
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
```



# 2. Calcular a taxa de crescimento percentual das vendas de um mês para o outro no ano de 2023
```js
db.vendas.aggregate([
  { 
    $match: { ano: 2023 } 
  },
  {
    $group: {
      _id: "$mes",
      total: { $sum: "$valor" }
    }
  },
  { 
    $sort: { _id: 1 } 
  },
  {
    $setWindowFields: {
      partitionBy: null,
      sortBy: { _id: 1 },
      output: {
        prevTotal: {
          $shift: {
            output: "$total",
            by: -1
          }
        }
      }
    }
  },
  {
    $project: {
      mes: "$_id",
      total: 1,
      taxaCrescimento: {
        $cond: [
          { $eq: ["$prevTotal", 0] },
          null,
          {
            $round: [
              {
                $multiply: [
                  { $divide: [{ $subtract: ["$total", "$prevTotal"] }, "$prevTotal"] },
                  100
                ]
              },
              2
            ]
          }
        ]
      }
    }
  }
])
```



# 3. Identificar produtos que nunca foram vendidos
```js
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
```



# 4. Encontrar o cliente que mais gastou no ano de 2023
```js
// Forma 1
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

// Forma 2
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
```



# 5. Calcular o total de pedidos por produto e por região dos clientes no ano de 2023
```js
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