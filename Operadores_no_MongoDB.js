/* 
    ANOTAÇÕES:

    -> Operadores de Comparação: eq, ne, gt, lt, gte, lte;
    -> Operadores Lógicos: and, or, nor e not;
    -> Operadores de Elemento: type e exists;


    OPERADORES:
    -> Os operadores no MongoBD são instruções especiais 
    utilizadas para manipular e consultar documentos dentro
    de uma coleção.

    -> Permitem realizar comparações, operações lógicas, atualizações
    e agregações, tornando as consultas mais poderosas e
    eficientes. Os operadores são amplamente utilizados para filtrar
    dados, modificar registros e realizar cálculos dentro do banco de
    dados.


    1°) OPERADORES DE COMPARAÇÃO:
    -> Usados realizar filtros em consultas,
    comparando valores dentro dos documentos.
    Permitem encontrar documentos que atendam a
    critérios como igualdade, diferença, maior ou
    menor que um determinado valor

        . $eq (igual a)
        – Este operador retorna documentos cujo valor de um campo específico
        seja igual ao valor informado;

        . $ne (diferente de)
        – Retorna documentos cujo valor de um campo seja diferente do valor
        especificado;

        • $gt (maior que)
        – Retorna documentos cujo valor de um campo seja maior que o
        especificado;

        • $lt (menor que)
        – Retorna documentos cujo valor de um campo seja menor que o
        especificado;

        • $gte e $lte (maior ou igual / menor ou igual)
        – São variações dos operadores anteriores, incluindo valores iguais ao
        limite definido;


    2°) OPERADORES LÓGICOS:
    -> Os operadores lógicos combinam múltiplas
    condições dentro de uma única consulta.

        • $and
        – O operador $and exige que todas as condições 
        especificadas sejam verdadeiras.

        • $or
        – O operador $or retorna documentos que 
        satisfaçam pelo menos uma das condições
        especificadas;

        • $not
        – Este operador nega uma condição específica;

        • $nor
        – O operador $nor é o oposto de $or, 
        excluindo documentos que satisfaçam 
        qualquer uma das condições listadas;

    3°) OPERADORES DE ELEMENTO:
    -> Permitem verificar a existência de campos
    em um documento ou o tipo de dado armazenado neles;

        • $exists
        – Verifica se um campo está presente ou não 
        em um documento;

        • $type
        – Filtra documentos com base no tipo de dado 
        armazenado em um campo;
        
*/


// BASE DE DADOS:

db.produtos.insertMany([
    {
        "_id": 1,
        "nome": "Notebook Dell",
        "categoria": "Eletrônicos",
        "preco": 4500,
        "estoque": 15,
        "avaliacao": 4.7
    },
    {
        "_id": 2,
        "nome": "Smartphone Samsung",
        "categoria": "Eletrônicos",
        "preco": 2500,
        "estoque": 30,
        "avaliacao": 4.5
    },
    {
        "_id": 3,
        "nome": "Cadeira Gamer",
        "categoria": "Móveis",
        "preco": 1200,
        "estoque": 10,
        "avaliacao": 4.8
    }
]);

// COMANDOS:

db.produtos.find({"preco": {"$eq": 4500}});

db.produtos.find({"preco": {"$ne": 4500}});

db.produtos.find({"preco": {"$gt": 2000}});

db.produtos.find({"preco": {"$lt": 3000}});

db.produtos.find({"preco": { "$gte": 1000, "$lte": 3000}});

db.produtos.find({
    "$and": [
        {"categoria": "Eletrônicos"}, 
        {"preco": {"$gt": 3000}}
    ]
});


db.produtos.find({
    "$or": [
        {"categoria": "Eletrônicos"}, 
        {"preco": {"$gt": 4000}}
    ]
});

db.produtos.find({"preco": {
        "$not": {"$gt": 3000}
    }
});

db.produtos.find({
    "$nor": [
        {"categoria": "Eletrônicos"},
        {"preco": {"$gt": 4000}}
    ]
});

db.produtos.find({"avaliacao": {"$exists": true}});

db.produtos.find({"preco": {"$type": "int"}});


// Exercicios

// 01)
//  Utilize o operador $gte para encontrar todos os produtos com preço maior ou igual a 2000;
db.produtos.find({"preco": { "$gte": 2000, "$lte": 2000}});


// 02)
// Filtre os produtos que pertencem à categoria "Móveis" e possuem avaliação superior a 4.5 usando $and;


// 03)
//  Use $or para retornar todos os produtos que custam menos de 2000 ou tem estoque maior que 20.
db.produtos.find({
    "$or": [
        {"preco": {"$lt": 2000}},
        {"estoque": {"$gt": 20}}
    ]
});


// 04)
//  Escreva uma consulta que retorne apenas os produtos que possuem o campo avaliacao


// 05)
//  Utilize $nor para excluir da busca os produtos da categoria "Eletrônicos" e aqueles com preço maior que 3000.