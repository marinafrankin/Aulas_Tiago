/* 
    1) Encontrar clientes que não realizaram nenhuma compra no ano de 2023
*/

/* 
    Resposta:  
Nesse caso o exercício um demonstrou que todos os clientes
    realizaram uma compra, mas esse é o código se houvesse
    um cliente que não realizou a compra em 2023:

    
Inserindo um cliente se necessário não houver um cliente
    que não realizou a compra:

db.clientes.insertOne({
    nome: 'Marina',
    email: 'mari@email.com',
    regiao: 'Sudeste'
});


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
]);
*/