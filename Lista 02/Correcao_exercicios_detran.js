// -----------------------------------------------------------------------------
// 1) Qual modelo de carro tem mais multas?
// -----------------------------------------------------------------------------

/*
  SQL Equivalente:
  SELECT
      v.modelo,
      COUNT(m.id) AS total_multas
  FROM
      multas m
  JOIN
      veiculos v ON m.veiculo_id = v.id
  GROUP BY
      v.modelo
  ORDER BY
      total_multas DESC
  LIMIT 1;
*/

db.multas.aggregate([
  {
    $lookup: {
      from: "veiculos",
      localField: "veiculo_id",
      foreignField: "_id",
      as: "veiculoInfo"
    }
  },
  { $unwind: "$veiculoInfo" },
  {
    $group: {
      _id: "$veiculoInfo.modelo",
      totalMultas: { $sum: 1 }
    }
  },
  { $sort: { totalMultas: -1 } },
  { $limit: 1 }
]);


// -----------------------------------------------------------------------------
// 2) Quantas multas por cidade?
// -----------------------------------------------------------------------------

/*
  SQL Equivalente:
  SELECT
      cidade,
      COUNT(id) AS total_multas
  FROM
      multas
  GROUP BY
      cidade
  ORDER BY
      cidade;
*/

db.multas.aggregate([
  {
    $group: {
      _id: "$local.cidade",
      totalMultas: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
]);


// -----------------------------------------------------------------------------
// 3) Qual é a infração mais aplicada?
// -----------------------------------------------------------------------------

/*
  SQL Equivalente:
  SELECT
      i.descricao,
      COUNT(m.id) AS total_aplicacoes
  FROM
      multas m
  JOIN
      infracoes i ON m.infracao_id = i.id
  GROUP BY
      i.descricao
  ORDER BY
      total_aplicacoes DESC
  LIMIT 1;
*/

db.multas.aggregate([
  {
    $group: {
      _id: "$infracao_id",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  {
    $lookup: {
      from: "infracoes",
      localField: "_id",
      foreignField: "_id",
      as: "infracaoInfo"
    }
  },
  { $unwind: "$infracaoInfo" },
  {
    $project: {
        _id: 0,
        descricao: "$infracaoInfo.descricao",
        total: "$total"
    }
  }
]);


// -----------------------------------------------------------------------------
// 4) Qual mês do ano tem mais multas?
// -----------------------------------------------------------------------------

/*
  SQL Equivalente:
  SELECT
      EXTRACT(MONTH FROM data_hora) AS mes,
      COUNT(id) AS total_multas
  FROM
      multas
  GROUP BY
      mes
  ORDER BY
      total_multas DESC
  LIMIT 1;
*/

db.multas.aggregate([
  {
    $group: {
      _id: { $month: "$data_hora" },
      totalMultas: { $sum: 1 }
    }
  },
  { $sort: { totalMultas: -1 } },
  { $limit: 1 },
  {
    $project: {
        _id: 0,
        mes: "$_id",
        totalMultas: "$totalMultas"
    }
  }
]);


// -----------------------------------------------------------------------------
// 5) Qual é a cor de veículo mais multada?
// -----------------------------------------------------------------------------

/*
  SQL Equivalente:
  SELECT
      v.cor,
      COUNT(m.id) AS total_multas
  FROM
      multas m
  JOIN
      veiculos v ON m.veiculo_id = v.id
  GROUP BY
      v.cor
  ORDER BY
      total_multas DESC
  LIMIT 1;
*/

db.multas.aggregate([
  {
    $lookup: {
      from: "veiculos",
      localField: "veiculo_id",
      foreignField: "_id",
      as: "veiculoInfo"
    }
  },
  { $unwind: "$veiculoInfo" },
  {
    $group: {
      _id: "$veiculoInfo.cor",
      totalMultas: { $sum: 1 }
    }
  },
  { $sort: { totalMultas: -1 } },
  { $limit: 1 }
]);


// -----------------------------------------------------------------------------
// 6) Qual agente aplica mais multas?
// -----------------------------------------------------------------------------

/*
  SQL Equivalente:
  SELECT
      agente_id,
      COUNT(id) AS total_multas
  FROM
      multas
  GROUP BY
      agente_id
  ORDER BY
      total_multas DESC
  LIMIT 1;
*/

db.multas.aggregate([
  {
    $group: {
      _id: "$agente_id",
      totalMultas: { $sum: 1 }
    }
  },
  { $sort: { totalMultas: -1 } },
  { $limit: 1 }
]);


// -----------------------------------------------------------------------------
// 7) Qual sexo é mais multado?
// -----------------------------------------------------------------------------

/*
  SQL Equivalente:
  SELECT
      p.sexo,
      COUNT(m.id) AS total_multas
  FROM
      multas m
  JOIN
      veiculos v ON m.veiculo_id = v.id
  JOIN
      proprietarios p ON v.proprietario_id = p.id
  GROUP BY
      p.sexo
  ORDER BY
      total_multas DESC;
*/

db.multas.aggregate([
  {
    $lookup: {
      from: "veiculos",
      localField: "veiculo_id",
      foreignField: "_id",
      as: "veiculo"
    }
  },
  { $unwind: "$veiculo" },
  {
    $lookup: {
      from: "proprietarios",
      localField: "veiculo.proprietario_id",
      foreignField: "_id",
      as: "proprietario"
    }
  },
  { $unwind: "$proprietario" },
  {
    $group: {
      _id: "$proprietario.sexo",
      totalMultas: { $sum: 1 }
    }
  },
  { $sort: { totalMultas: -1 } }
]);


// -----------------------------------------------------------------------------
// 8) Qual marca de carro os homens preferem?
// -----------------------------------------------------------------------------

/*
  SQL Equivalente:
  SELECT
      v.marca,
      COUNT(v.id) AS total_veiculos
  FROM
      veiculos v
  JOIN
      proprietarios p ON v.proprietario_id = p.id
  WHERE
      p.sexo = 'Masculino'
  GROUP BY
      v.marca
  ORDER BY
      total_veiculos DESC
  LIMIT 1;
*/

db.proprietarios.aggregate([
  {
    $match: { sexo: "Masculino" }
  },
  {
    $lookup: {
      from: "veiculos",
      localField: "_id",
      foreignField: "proprietario_id",
      as: "carros"
    }
  },
  { $unwind: "$carros" },
  {
    $group: {
      _id: "$carros.marca",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);


// -----------------------------------------------------------------------------
// 9) Qual cor de carro as mulheres mais preferem?
// -----------------------------------------------------------------------------

/*
  SQL Equivalente:
  SELECT
      v.cor,
      COUNT(v.id) AS total_veiculos
  FROM
      veiculos v
  JOIN
      proprietarios p ON v.proprietario_id = p.id
  WHERE
      p.sexo = 'Feminino'
  GROUP BY
      v.cor
  ORDER BY
      total_veiculos DESC
  LIMIT 1;
*/

db.proprietarios.aggregate([
  {
    $match: { sexo: "Feminino" }
  },
  {
    $lookup: {
      from: "veiculos",
      localField: "_id",
      foreignField: "proprietario_id",
      as: "carros"
    }
  },
  { $unwind: "$carros" },
  {
    $group: {
      _id: "$carros.cor",
      total: { $sum: 1 }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);


// -----------------------------------------------------------------------------
// 10) Faça um ranking dos veículos mais multados, decrescente.
// -----------------------------------------------------------------------------

/*
  SQL Equivalente:
  SELECT
      v.marca,
      v.modelo,
      COUNT(m.id) AS total_multas
  FROM
      multas m
  JOIN
      veiculos v ON m.veiculo_id = v.id
  GROUP BY
      v.marca, v.modelo
  ORDER BY
      total_multas DESC;
*/

db.multas.aggregate([
  {
    $lookup: {
      from: "veiculos",
      localField: "veiculo_id",
      foreignField: "_id",
      as: "veiculoInfo"
    }
  },
  { $unwind: "$veiculoInfo" },
  {
    $group: {
      _id: {
        marca: "$veiculoInfo.marca",
        modelo: "$veiculoInfo.modelo"
      },
      totalMultas: { $sum: 1 }
    }
  },
  { $sort: { totalMultas: -1 } },
  {
    $project: {
        _id: 0,
        marca: "$_id.marca",
        modelo: "$_id.modelo",
        totalMultas: "$totalMultas"
    }
  }
]);