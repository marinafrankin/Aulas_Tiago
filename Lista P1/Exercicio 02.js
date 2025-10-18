/* 
    2) Calcular a taxa de crescimento percentual das vendas de um mês para o outro no
ano de 2023

db.pedidos.aggregate([
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
]);


  RESPOSTA DO TIAGO:

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
    $cond: [{ 
      $eq: ["$prevTotal", 0] },
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
]);

*/