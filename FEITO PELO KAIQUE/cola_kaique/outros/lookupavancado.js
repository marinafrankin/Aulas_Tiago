// Qual o ticket médio por cliente (valor total gasto)?
db.vendas.aggregate([
  {
    $lookup: {
      from: "produtos",
      localField: "produto_id", 
      foreignField: "_id",
      as: "dados_produto"
    }
  },
  {
    $lookup: {
      from: "clientes",
      localField: "cliente_id",
      foreignField: "_id", 
      as: "dados_cliente"
    }
  },
  {
    $unwind: "$dados_produto"  
  },
  {
    $unwind: "$dados_cliente"  
  },
  {
    $group: {
      _id: { _id:"$dados_cliente._id",nome:"$dados_cliente.nome"},
      valor_total: { 
        $sum: { 
          $multiply: ["$quantidade", "$dados_produto.preco"] 
        }
      },
      total_compras: { $sum: 1 }  
    }
  },
  {
      $project:{
          _id:0,
          nome:"$_id.nome",
          valor_total:1,
          total_compras:1
      }
  }
])