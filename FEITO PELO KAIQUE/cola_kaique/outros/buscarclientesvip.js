db.vendas.aggregate([
  // 1. Junta com produtos para pegar o preço
  {
    $lookup: {
      from: "produtos",
      localField: "produto_id",
      foreignField: "_id",
      as: "produto_info"
    }
  },
  {
    $unwind: "$produto_info"
  },
  
  // 2. Junta com clientes para verificar VIP
  {
    $lookup: {
      from: "clientes",
      localField: "cliente_id",
      foreignField: "_id", 
      as: "cliente_info"
    }
  },
  {
    $unwind: "$cliente_info"
  },
  
   // 3. Calcula o valor total da venda
  {
    $addFields: {
      valor_total: {
        $multiply: ["$quantidade", "$produto_info.preco"]
      }
    }
  },
  
  // 4. Filtra: clientes VIP + valor > 300
  {
    $match: {
      "cliente_info.segmento": "VIP",
      valor_total: { $gt: 300 }
    }
  },
  
   {
    $project: {
      _id: 0,
      cliente: "$cliente_info.nome",
      produto: "$produto_info.nome",
      quantidade: 1,
      valor_total: 1,
      data_venda: 1
    }
  },
  {
      $sort:{valor_total:-1}
  }
])