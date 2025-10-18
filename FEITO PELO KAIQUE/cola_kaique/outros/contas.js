//14. Crie um ranking de produtos por lucro total

db.vendas.aggregate([
{
    $lookup:{
        from:"produtos",
         localField: "produto_id",
          foreignField: "_id",
          as: "produto_info"
        
    }
},
{
    $unwind:"$produto_info"
},
 {
    $addFields: {
      lucro_venda: {
        $multiply: [
          { $subtract: ["$produto_info.preco", "$produto_info.custo"] },
          "$quantidade"
        ]
      }
    }
  },
  {
      $group:{
          _id:{_id:"$produto_info._id",nome:"$produto_info.nome"},
          lucro_total: { $sum: "$lucro_venda" },
      }
  },
  {
      $project:{
          _id:0,
          produto:"$_id.nome",
          lucro_total:1
      }
  },
  {
      $sort:{
          lucro_total:-1
      }
  },
  {
      $limit:10
  }


])