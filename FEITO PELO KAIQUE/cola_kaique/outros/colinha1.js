/* ----------------------------------------------------------------------------------------------------------------------- */


db.vendas.aggregate([
  // 1. Primeiro faz o JOIN com a coleção de produtos
  {
    $lookup: {
      from: "produtos",           // coleção de onde virão os preços
      localField: "produto_id",   // campo na coleção vendas
      foreignField: "_id",        // campo na coleção produtos  
      as: "dados_produto"         // nome do novo array com os dados
    }
  },
  
  // 2. Opcional: "desembrulha" o array (se for one-to-one)
  {
    $unwind: "$dados_produto"
  },
  
  // 3. AGORA usa o $project com os dados das duas coleções
  {
    $project: {
      produto: "$dados_produto.nome",
      categoria: "$dados_produto.categoria",
      quantidade: 1,
      preco_unitario: "$dados_produto.preco",
      total: { 
        $multiply: ["$dados_produto.preco", "$quantidade"] 
      },
      imposto: { 
        $multiply: ["$dados_produto.preco", "$quantidade", 0.1] 
      }
    }
  }
])

/* ----------------------------------------------------------------------------------------------------------------------- */

// mostrar os maiores
db.produtos.aggregate([
  { 
    $sort: { 
      preco: -1  
    } 
  },
  { 
    $limit: 10 
  },
  { 
    $project: {
      nome: 1,
      preco: 1,
      categoria: 1,
      marca: 1,
      _id: 0
    }
  }
])

db.produtos.find(
  {},
).sort({ preco: -1 }).limit(10)
/* ----------------------------------------------------------------------------------------------------------------------- */
// buscar quantos cliente por estado:

db.clientes.aggregate([
  {
    $group: {
      _id: "$estado",
      total_clientes: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,                   // 👈 Remove o _id
      estado: "$_id",           // 👈 Cria novo campo "estado" com valor do _id
      total_clientes: 1         // 👈 Mantém o contador
    }
  }
])
/* ----------------------------------------------------------------------------------------------------------------------- */
// busca vendas do primeiro trimestre de 2024
db.vendas.aggregate([
    
  {
    $match: {
      $expr: {
        $and: [
          { $eq: [{ $year: "$data_venda" }, 2024] },
          {
            $or: [
              { $eq: [{ $month: "$data_venda" }, 1] }, 
              { $eq: [{ $month: "$data_venda" }, 2] },  
              { $eq: [{ $month: "$data_venda" }, 3] }   
            ]
          }
        ]
      }
    }
  },

  {
      $sort:{data_venda:1}
  }
])

//busca todos produtos da categoria eletronicos

db.produtos.aggregate([{$match:{categoria:"Eletrônicos"}}])

/* ----------------------------------------------------------------------------------------------------------------------- */
//pega os produtos e agrupa por categoria e verifica quantos produtos por categoria

db.produtos.aggregate([
  {
    $group: {
      _id: "$categoria",
      total: { $sum: 1 }
    }
  },

  {
    $project: {
      _id: 0,
      categoria: "$_id",
      total: 1
    }
  },

  {
      $sort:{total:-1}
  }
])



/* ----------------------------------------------------------------------------------------------------------------------- */

//Qual o total vendido por mês em 2024?

db.vendas.aggregate([
 {
    $match: {
      $expr: {
        $eq: [{ $year: "$data_venda" }, 2024]
      }
    }
  },
  {
    $lookup: {
      from: "produtos",
      localField: "produto_id",
      foreignField: "_id",
      as: "produto"
    }
  },
  {
    $unwind: "$produto"  // Para acessar os campos do produto
  },
  {
    $group: {
      _id: { $month: "$data_venda" },  // Extrai o mês da data
      totalVendido: { $sum:{$multiply:["$produto.preco","$quantidade"]}},  // Soma os preços
      totalVendas: { $sum: 1 }  // Conta quantas vendas
    }
  },
  {
    $sort: { _id: 1 }  
  },
  {$project:{
      _id:0,
      mes:"$_id",
      totalVendido:1,
      totalVendas:1
  }}


])

/* ----------------------------------------------------------------------------------------------------------------------- */
//Quais são os 5 vendedores com mais vendas?
db.vendas.aggregate([
{
    $group:{
        _id:"$vendedor",
        total:{$sum:1}
    },

},
{
        $project:{
        _id:0,
        vendedor:"$_id",
        total:1
    }
},
{
    $sort:{total:-1}
}

])
