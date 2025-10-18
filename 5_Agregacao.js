/* 
    COMO JUNTAR DUAS COLEÇÕES?
   (Estratégias de Junção de Documentos)

   • No MongoDB, podemos relacionar duas coleções usando referências entre documentos ou 
    incorporando (embed) documentos dentro de outros.
    • A escolha entre essas abordagens depende do caso de uso e da necessidade de normalização dos dados:
        – Referências (references)
        – Documentos Incorporados (embedding)

    UMA COLEÇÃO DENTRO DA OUTRA
  (Guardar dados usando conceito de Embeding)

    - EMBEDDING:
    • Nesta abordagem, você pode armazenar o documento relacionado diretamente dentro do
        documento principal. Isso é útil quando os dados relacionados são acessados 
        frequentemente juntos e você deseja evitar consultas separadas.
    • Exemplo:
    – Aqui, em vez de armazenar o ObjectId do usuário em orders, você pode incorporar as informações
    do usuário diretamente no pedido.



    - $LOOKUP: uma das ferramentas principais para relacionar duas coleções, mas existem muitos outros operadores
    que permitem realizar transformações complexas.

    {
        $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user_info"
        }
    }


    - $GRUOP
    {
        $group: {
            _id: "$produto_id",     agrupa pelos IDs de produtos
            total_orders: { $sum: 1 },  conta o número de pedidos
            total_quantity: { $sum: "$quantity" }   soma a quantidade de cada pedido
        }
    }


    PIPELINE: • A pipeline de agregação é a sequência de estágios que os documentos percorrem durante 
    o processo de agregação. Cada estágio aplica uma operação específica aos documentos e passa
    o resultado para o próximo estágio.

    db.collection.aggregate([
        { estagio1 },
        { estagio2 },
        { estagio3 },
         ...
    ]);

    EXEMPLO:
    db.vendas.aggregate([
        {$match: { ano: 2023 }},    fltra documentos
        {$ group: {_id: "$mes", total: { $sum: "$valor "}}},     agrupa e soma
        {$sort: {total: -1}}    ordena os resultados
    ]);


    - $MATCH: filtra os documentos de acordo com os critérios especificados, 
    semelhante à cláusula WHERE em SQL:

    db.vendas.aggregate([
        {$match: {ano: 2023}}
    ]);


    - $GROUP: agrupa documentos com base em um ou mais
campos e permite calcular agregados como soma, média,
contagem, etc:

    db.vendas.aggregate([
        {$group: {_id: "$mes", total_vendas: {$sum: "$valor"}}}
    ]);



    - $PROJECT: permite selecionar, incluir ou excluir
campos específicos nos documentos resultantes. Também pode
ser usado para criar novos campos ou transformar dados.

    db.vendas.aggregate([
        {$project: {nome: 1, valor: 1, _id: 0}}
    ]);


    - $SORT: ordena os documentos com base em um ou
mais campos.

    db.vendas.aggregate([
        {$sort: {valor: -1}}
    ]);


    - $LIMIT: Restringe o número de documentos que passam para os
estágios seguintes.

    - $SKIP: Ignora um número especificado de documentos.

    db.vendas.aggregate([
        {$sort: {valor: -1 }},
        {$limit: 5}
    ]);


    - $UNWIND: Desestrutura um array, criando um
documento para cada elemento do array.

    db.pedidos.aggregate([
        {$unwind: "$itens"}
    ]);


    - $FACET: permite executar múltiplas pipelines de
agregação em paralelo e combinar os resultados:

    db.vendas.aggregate([
        {
            $facet: {
                total_vendas: [{$count: "count"}],
                soma_total: [{$group: {_id: null, total: {$sum: "$valor"} } }]
            }
        }
    ]);


    - $BUCKET: Agrupa documentos em intervalos predefinidos.
    - $BUCKETAUTO: Agrupa documentos em um número especificado
de buckets automaticamente.

    db.vendas.aggregate([
        {
            $bucket: {
                groupBy: "$valor",
                boundaries: [0, 100, 200, 300],
                default: "Mais de 300",
                output: { total_vendas: {$sum: 1}, soma_valores: {$sum: "$valor"} }
            }
        }
    ]);


    • $addFields: Adiciona novos campos aos documentos.
    • $set: Similar ao $addFields, mas também pode modificar
    campos existentes.

    db.vendas.aggregate([
        {
            $addFields: {
                total: {$multiply: ["$quantidade", "$preco_unitario"]}
            }
        }
    ]);



    • $count adiciona um campo com o número total de
documentos que passaram pelo estágio anterior.

    db.vendas.aggregate([
        {$count: "total_vendas"}
    ]);


    db.vendas.aggregate([
        {$match: {ano: 2023}},
        {$group: {_id:"$mes", total_vendas: {$sum: "$valor"}}},
        {$sort: {total_vendas: -1}}
    ]).explain("executionStats");



    OPERADORES DE AGREGAÇÃO:
    • $sum: Soma os valores.
    • $avg: Calcula a média.
    • $min: Encontra o valor mínimo.
    • $max: Encontra o valor máximo.
    • $first: Retorna o primeiro valor.
    • $last: Retorna o último valor.

    • Média de vendas do mês:
    db.vendas.aggregate([
        {$group: {_id: "$mes", media_vendas: {$avg: "$valor"}}}
    ]);



    OPERADORES CONDICIONAIS:
    – $cond: Estrutura condicional.
    – $ifNull: Retorna um valor se o campo for nulo ou indefinido.
    – $switch: Implementa uma série de condições.

    db.vendas.aggregate([
        {
            $addFields: {
                acima_da_media: {
                    $cond: { if: {$gt: ["$valor", 1000]}, then: true, else: false}
                }
            }
        }
    ]);


    OPERADORES DE ARRAY:
    • $push: Adiciona elementos a um array.
    • $addToSet: Adiciona elementos únicos a um array.
    • $filter: Filtra elementos de um array.
    • $map: Aplica uma expressão a cada elemento de um array.
    • $reduce: Reduz um array a um único valor.

    db.pedidos.aggregate([
        {
            $project: {
                itens_filtrado: {
                    $filter: {
                        input: "$itens",
                        as: "item",
                        cond: {$gt: ["$$item.quantidade", 2]}
                    }
                }
            }
        }
    ]);
*/