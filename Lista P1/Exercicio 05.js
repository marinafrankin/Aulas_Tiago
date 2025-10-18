/* 
    5) Calcular o total de pedidos por produto e por região dos clientes no ano de 2023.

    db.pedidos.aggregate([
    {
        $match: {
            ano: 2023
        }
    },
    {
        $lookup: {
            from: "clientes",
            localField: "cliente_id",
            foreignField: "_id",
            as: "cliente"
        }
    },
    {
        $unwind: "$cliente"
    },
    {
        $group: {
            _id: { produto: "$produto", regiao: "$cliente.regiao" },
            total: { $sum: "$quantidade" }
        }
    },
    {
        $sort: { total: -1 }
    },
    {
        $project: {
            _id: 0,
            produto: "$_id.produto",
            regiao: "$_id.regiao",
            total: 1
        }
    }
]);

    OU 

    (PELO CHAT)

    db.pedidos.aggregate([
  //1. Filtrar os Pedidos para o ano de 2023
  {
    $match: {
      "ano": 2023
    }
  },
  //Explicação: O comando $match filtra os documentos na coleção 'pedidos' que
  //satisfazem a condição 'ano' ser igual a 2023[cite: 223, 241, 247, 253, 259, 265, 279, 285, 291, 297].

  //2. Juntar (Lookup) com a coleção 'clientes'
  {
    $lookup: {
      from: "clientes", // A coleção externa a ser unida [cite: 7]
      localField: "cliente_id", // O campo na coleção 'pedidos' [cite: 219]
      foreignField: "_id", // O campo correspondente na coleção 'clientes' [cite: 8]
      as: "pedidos_cliente" // Nome do novo array onde os documentos correspondentes serão armazenados
    }
  },
   // Explicação: O comando $lookup realiza uma junção com a coleção 'clientes'.
   // Ele usa o 'cliente_id' do pedido para encontrar o cliente correspondente pelo seu '_id'.
   // O resultado é colocado no array 'pedidos_cliente'.

   //3. Desanexar (Unwind) o array 'pedidos_cliente'
  {
    $unwind: "$pedidos_cliente"
  },
   // Explicação: O comando $unwind 'desempacota' o array 'pedidos_cliente'. Como cada pedido
   // se refere a exatamente um cliente, isso transforma o array em um objeto, tornando
   // os campos do cliente acessíveis diretamente (e duplicando o pedido se houvesse múltiplos matches,
   // mas aqui só há um).

   //4. Agrupar por Produto e Região e Contar
  {
    $group: {
      "_id": {
        "produto": "$produto", // Agrupa pelo nome do produto [cite: 220]
        "regiao": "$pedidos_cliente.regiao" // Agrupa pela região do cliente [cite: 11]
      },
      "total_pedidos": {
        $sum: "$quantidade"
      } // Conta o número de documentos (pedidos) em cada grupo
    }
  },
   //Explicação: O comando $group é o principal para sumarização. Ele cria grupos
   //únicos baseados na combinação dos campos 'produto' e 'regiao'. Para cada grupo,
   //ele calcula o 'total_pedidos' somando 1 para cada pedido encontrado.

   //5. Projetar o Resultado Final (Formatação)
  {
    $project: {
      "_id": 0, // Remove o campo _id padrão do resultado
      "produto": "$_id.produto",
      "regiao": "$_id.regiao",
      "total_pedidos": 1
    }
  }
   //Explicação: O comando $project renomeia e formata os campos do resultado,
   //tornando-o mais legível. Ele move os campos agrupados de '_id.produto' e
   //'_id.regiao' para 'produto' e 'regiao' e mantém 'total_pedidos'.




  RESPOSTA DO TIAGO:

db.pedidos.aggregate([
  {
    $match: { ano: 2023 }
  },
  {
    $lookup: {
      from: "clientes",
      localField: "cliente_id",
      foreignField: "_id",
      as: "cliente"
    }
  },
  { $unwind: "$cliente" },
  {
    $group: {
      _id: {
      produto: "$produto",
      regiao: "$cliente.regiao"
      },
      totalPedidos: { $sum: "$quantidade" }
    }
  },
  {
    $project: {
      produto: "$_id.produto",
      regiao: "$_id.regiao",
      totalPedidos: 1,
      _id: 0
    }
  },
  { $sort: { produto: 1, regiao: 1 } }
]);
*/