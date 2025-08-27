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