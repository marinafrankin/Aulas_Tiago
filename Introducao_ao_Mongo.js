// 1) Acessar o MongoDB: abra o terminal e digite: 
     mongosh

// 2) Mostrar os bancos de dados no servidor: 
     show dbs
 
// 3) Criar banco de dados: 
     use primeiro_db
 
// 4) Mostrar as coleções no banco de dados: 
     show collections
 
// 5) Criar coleção: 
    db.createCollection("minha_coleção")
 
// 6) Inserir documento:
      db.minha_colecao.insertOne({ nome: "João", idade: 30})
// o "db" é uma variavel, a qual contem o "primeiro_db";

// 7) Retorna a lista de todos os documentos da colecao: 
      db.minha_colecao.find()

// 8) Inserir varios documentos da coleção:
      db.minha_colecao.insertMany([
      { nome: "Maria", idade: 40},
      { nome: "Eduardo", idade: 80},
      { nome: "Maria Eduarda", idade: 60}
      ])

// 9) Encontrar um documento:
      db.minha_colecao.findOne({ nome: "Marina"})

// 10) Encontrar um documento e exibir apenas o campo "nome" e "idade":
      db.minha_colecao.find(
        { nome: "Marina"},
        { nome: 1, idade: 1, _id: 0})

// 11) Atualizar o documento:
        db.minha_colecao.updateOne(
            { nome: "Marina"},
            { $set: { idade: 21 } })

// 12) Remover um documento:
 db.minha_colecao.deleteOne({ nome: "Marina"})

// 13) Remover a coleçao:
    db.minha_colecao.drop()

// 14) Remover o banco de dados:
    db.dropDatabase()

// 15) Para sair do programa mongosh
    exit


//  ANOTAÇÕES:
// O "1" é verdadeiro e o "0" é falso;
// Para "copiar e colar" é preciso dar ctrl + c e clicar com o botao direito do mause no terminal;
// 