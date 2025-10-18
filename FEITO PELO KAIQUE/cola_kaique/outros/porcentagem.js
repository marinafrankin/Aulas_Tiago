db.vendas.aggregate([
  {
    $group: {
      _id: "$vendedor",
      total_vendas: { $sum: 1 },
      total_cancelado: {
        $sum: {
          $cond: [
            { $eq: ["$status", "Cancelado"] },
            1,
            0
          ]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      nome: "$_id",
      taxa_cancelado_porcentagem: {
        $round: [  // ⬅️ Adicionei o round aqui
          {
            $multiply: [
              { $divide: ["$total_cancelado", "$total_vendas"] },
              100
            ]
          },
          2  // 2 casas decimais
        ]
      },
      total_vendas: 1,  // Opcional: manter totais para referência
      total_cancelado: 1
    }
  },
  {
    $sort: { taxa_cancelado_porcentagem: -1 }  // Opcional: ordenar
  }
])