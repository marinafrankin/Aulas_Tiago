/* 
    4) Encontrar o cliente que mais gastou no ano de 2023
*/

/* 

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
            localField: "_id", // _id do cliente
            foreignField: "_id", // fk do cliente do _id da venda
            as: "vendas_cliente"
        }
    },
    {
        $project: {
            vendas_cliente: 1,
            valor: 1
        }
    }
]);

    OU 

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
]);



    RESPOSTA DO TIAGO:

db.vendas.aggregate([
    { 
        $match: { ano: 2023 } 
    },
    {
        $group: {
            _id: "$cliente_id",
            totalGasto: { $sum: "$valor" }
        }
    },
    { 
        $sort: { totalGasto: -1 } 
    },
    { $limit: 1 },
    {
        $lookup: {
            from: "clientes",
            localField: "_id",
            foreignField: "_id",
            as: "cliente"
        }
    },
    { $unwind: "$cliente" },
    {
        $project: {
            nome: "$cliente.nome",
            email: "$cliente.email",
            totalGasto: 1
        }
    }
]);

*/