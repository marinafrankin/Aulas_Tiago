/* 
    3) Identificar produtos que nunca foram vendidos
*/

/* 
    RESULTOS:

 No lookup agente pega o produto_id se relaciona com as vendas

    db.produtos.aggregate([
        {
            $lookup: {
                from: "vendas", // A tabela principal da relação
                localField: "_id", // Chave primaria da tabela principal
                foreignField: "produto_id", // FK (chave primária da tabela produtos, chave estrangeira da tabela vendas)
                as: "vendas_produtos"
            }
        },
        {
            $match: { // É tipo um return, ou seja, tudo que estiver dentro do match será retornado
                vendas_produtos: { $eq: []} // vendas_produtos é o resultado do $lookup, e o resultado é 
                                                // filtrado com $equal, que busca dentro do array vendas_produto 
                                                // um array vazio [], ou seja, o que vê o resultado que não foi 
                                                // encontrado em vendas_produtos
            }
        },
        {
            $project: { // ele exibi a informação, o 1 exibe e o 0 não exibe.
                nome: 1,
                vendas_produtos: 1
            }
        }
    ]);



    RESPOSTA DO TIAGO:

    db.produtos.find({
 _id: {
 $nin: db.vendas.find({}, { produto_id: 1 }).map(v =>
v.produto_id)
 }
});

*/