// Qual a média de valor por venda por forma de pagamento?

db.vendas.aggregate([
{
    //junta duas collections
    $lookup:{
        
      from: "produtos",           // coleção de onde virão os preços
      localField: "produto_id",   // campo na coleção vendas
      foreignField: "_id",        // campo na coleção produtos  
      as: "dados_produto"         // nome do novo array com os dados     
    }
},

    //caso seja um array ele vira um objeto
  {
    $unwind: "$dados_produto"
  },



{
      //agrupa é necessario _id
    $group: {
      _id: "$forma_pagamento",
      media: { $avg: "$dados_produto.preco" }  // Use $avg com o campo valor
    }
},
{
    //project tira ou acrescenta campos
    $project:{
        _id:0,
        forma_de_pagamento:"$_id",
        valor_medio:"$media",

    }
},

{
    $sort:{valor_medio:-1}
}
])




/* ------------------------------------------------------------------------------------------------------------------- */

//Quantos produtos temos por categoria e marca?

db.produtos.aggregate([
{
    $group:{
        _id:{categoria:"$categoria",marca:"$marca"},
        total:{$sum:1}
    }
},
{
    $project:{
        _id:0,
        categoria: "$_id.categoria",
        marca: "$_id.marca", 
        total:1
    }
},
{
    $sort:{marca:1 , total:-1}
}
])