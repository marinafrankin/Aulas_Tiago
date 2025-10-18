# Lookup: relaciona duas relações no aggregate
```js

// Um único estágio
db.clientes.aggregate([
    {
        $lookup: {
            from: "pedidos",
            localField: "pedido_id",
            foreignField: "_id",
            as: "pedidos_cliente"
        }
    }
])

// Mais de um estágio
db.produtos.aggregate([
  {   // Início do estágio 1
    $lookup: {
      from: "vendas",
      localField: "_id",
      foreignField: "produto_id",
      as: "vendas_produto"
    }
  },   // Fim do estágio 1
  {    // Início do estágio 2
    $match: {
        vendas_produto: { $eq: [] }
    }
  },    // Fim do estágio 2
  {     // Início do estágio 3
    $project: {
        nome: 1,
        vendas_produto: 1
    }
  }     // Fim do estágio 3
])
```

# Match: filtra os documentos de acordo com os critérios especificados (semelhante a WHERE no SQL)
```js
db.clientes.aggregate([
    { $match: { genero: "Masculino" } }
])
```

# Group: agrupa documentos com base em um ou mais campos e permite calcular agregados como soma, média, contagem, etc
```js
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
    }
])
```

# Project: permite selecionar, incluir ou excluir campos específicos nos documentos resultantes, além de ser criado para criar novos campos ou transformar dados
```js
db.clientes.aggregate([
    {
        $project: {
            _id: 0, // oculta
            nome: 1, // exibe
            dobro_idade: { $multiply: ["$idade", 2] } // novo campo
        }
    }
])
```

# Sort: ordena os documentos com base em um ou mais campos, sendo decrescente (-1) ou crescente (1)
```js
db.clientes.aggregate([
    {
        $sort: {
            idade: -1
        }
    }
])
```

# Limit: restringe o número de documentos que passam para os estágios seguintes
```js
db.clientes.aggregate([
    {
        $sort: {
            idade: -1
        }
    },
    { $limit: 2 }
])
```

# Skip: ignora um número especificado de documentos
```js
db.clientes.aggregate([
    { 
        $sort: { idade: 1 } 
    },
    { 
        $skip: 2 
    }
])
```

# Unwind: desestrutura um array, criando um documento para cada elemento do array
```js
db.clientes.aggregate([
    { $unwind: "$pedidos" } // $pedidos é o array a ser desestruturado
])
```

# AddFields: adiciona novos campos aos documentos
```js
db.produtos.aggregate([
    {
        $addFields: {
            total: { $multiply: ["$quantidade", "$preco"] }
        }
    }
])
```

# Set: similar ao AddFields, mas também pode modificar campos existentes
```js
db.produtos.aggregate([
    {
        $set: {
            preco_com_desconto: { $multiply: ["$preco", 0.9] }
        }
    }
])
```

# Facet: permite executar múltiplas pipelines de agregação em paralelo e combinar os resultados
```js
db.vendas.aggregate([
    {
        $facet: {
            por_cliente: [
                { $group: { _id: "$cliente_id", total: { $sum: "$valor" } } }
            ],
            por_ano: [
                { $group: { _id: "$ano", total: { $sum: "$valor" } } }
            ]
        }
    }
])
```

# Not: nega expressões
```js
// $not com $match
db.clientes.aggregate([
    {
        $match: {
            idade: { $not: { $eq: 18 } } // possível usar $ne (not equal)
        }
    }
])

// $not como expressão de agregação em $project
db.clientes.aggregate([
  {
    $project: {
      nome: 1,
      nao_ativo: { $not: [ { $eq: ["$ativo", true] } ] } // true se ativo != true
    }
  }
])
```

# Nor: passa documentos que NÃO satisfazem nenhuma das condições (OR)
```js
db.clientes.aggregate([
  {
    $match: {
      $nor: [ { genero: "Feminino" }, { idade: { $lt: 18 } } ]
    }
  }
])
```

# ElemMatch: filtra documentos que possuem elementos no array que satisfaçam a condição
```js
// Valor específico
db.clientes.aggregate([
    {
        $match: {
            pedidos: { $elemMatch: { valor: 150 } } // é possível trocar $elemMatch por "pedidos.valor" aqui
        }
    }
])

// Mais de um valor
db.clientes.aggregate([
    {
        $match: {
            pedidos: { $elemMatch: { valor: { $gt: 100 } } }
        }
    }
])
```

# Bucket: agrupa documentos em intervalos predefinidos
```js
db.clientes.aggregate([
    {
        $bucket: {
            groupBy: "$idade",
            boundaries: [0, 18, 30, 50, 100],
            default: "Outros",
            output: { total: { $sum: 1 } }
        }
    }
])
```

# BucketAuto: agrupa documentos em um número especificado de buckets automaticamente
```js
db.clientes.aggregate([
    {
        $bucketAuto: {
            groupBy: "$idade",
            buckets: 4
        }
    }
])
```

<!-- Matemática -->

# Count: adiciona  um campo com o número total de documentos que passaram pelo estágio anterior.
```js
db.pedidos.aggregate([
    { $count: "total_pedidos" }
])
```

# Multiply: 
```js
db.clientes.aggregate([
    {
        $project: {
            _id: 0,
            nome: 1,
            dobro_idade: { $multiply: ["$idade", 2] } // dobra a idade
        }
    }
])
```

# Avg: calcula a média
```js
db.vendas.aggregate([
    {
        $group: {
            _id: null,
            media_valor: { $avg: "$valor" }
        }
    }
])
```

# Min: encontra o valor mínimo
```js
db.vendas.aggregate([
    {
        $group: {
            _id: null,
            menor_valor: { $min: "$valor" }
        }
    }
])
```

# Max: encontra o valor máximo
```js
db.vendas.aggregate([
    {
        $group: {
            _id: null,
            maior_valor: { $max: "$valor" }
        }
    }
])
```

# First: retorna o primeiro valor
```js
db.vendas.aggregate([
    {
        $group: {
            _id: "$cliente_id",
            primeiro_pedido: { $first: "$valor" }
        }
    }
])
```

# Last: retorna o último valor
```js
db.vendas.aggregate([
    {
        $group: {
            _id: "$cliente_id",
            ultimo_pedido: { $last: "$valor" }
        }
    }
])
```

<!-- Condicionais -->

# Cond: estrutura condicional
```js
db.clientes.aggregate([
    {
        $project: {
            nome: 1,
            maior_idade: {
                $cond: { if: { $gte: ["$idade", 18] }, then: "Adulto", else: "Menor" }
            }
        }
    }
])
```

# IfNull: retorna um valor se o campo for null ou indefinido
```js
db.clientes.aggregate([
    {
        $project: {
            nome: 1,
            telefone: { $ifNull: ["$telefone", "Não informado"] }
        }
    }
])
```

# Switch: implementa uma série de condições
```js
db.clientes.aggregate([
    {
        $project: {
            nome: 1,
            faixa: {
                $switch: {
                    branches: [
                        { case: { $lt: ["$idade", 18] }, then: "Menor" },
                        { case: { $lt: ["$idade", 60] }, then: "Adulto" }
                    ],
                    default: "Idoso"
                }
            }
        }
    }
])
```

<!-- Array -->

# Filter: filtra elementos dentro de um array
```js
db.clientes.aggregate([
    {
        $project: {
            nome: 1,
            pedidos_altos: {
                $filter: {
                    input: "$pedidos",
                    as: "p",
                    cond: { $gt: ["$$p.valor", 100] }
                }
            }
        }
    }
])
```

# Map: aplica uma expressão a cada elemento de um array
```js
db.clientes.aggregate([
    {
        $project: {
            nome: 1,
            valores_dobrados: {
                $map: {
                    input: "$pedidos",
                    as: "p",
                    in: { $multiply: ["$$p.valor", 2] }
                }
            }
        }
    }
])
```

# Reduce: reduz um array a um único valor
```js
db.clientes.aggregate([
    {
        $project: {
            nome: 1,
            total_pedidos: {
                $reduce: {
                    input: "$pedidos",
                    initialValue: 0,
                    in: { $add: ["$$value", "$$this.valor"] }
                }
            }
        }
    }
])
```