/* 
   -> Métodos de Documentos: UpdateOne(), UpdateMany(), ReplaceMany()

   -> Operadores de Atualização: $set, $unset, $rename, $inc, $mul, $min, $max

   -> Operadores de Array: $push, $pop, $pull, $addToSet, $pullAll, $each

    ATUALIZAÇÃO DE DOCUMENTOS ( update e replace ):
    -> updateOne(filter, update, options)
        • Atualiza um único documento que corresponde ao 
        filtro.

    -> updateMany(filter, update, options)
        • Atualiza múltiplos documentos que 
        correspondem ao filtro.

    -> replaceOne(filter, replacement, options)
        • Substitui um único documento inteiro pelo 
        novo documento fornecido.

    
    OPERADORES DE ATUALIZAÇÃO:
    • 1°) Modificação de campos:
        –> $set – Define ou altera um campo específico.
        –> $unset – Remove um campo.
        –> $rename – Renomeia um campo.

    • 2°) Operações matemáticas:
        –>$inc – Incrementa o valor de um campo numérico.
        –>$mul – Multiplica o valor de um campo.
        –>$min – Atualiza o campo apenas se o novo valor for
        menor que o atual.
        –>$max – Atualiza o campo apenas se o novo valor for
        maior que o atual.

    OPERADORES DE ARRAY:
        –> $push – Adiciona um elemento a um array.
        –> $pop – Remove o primeiro (-1) ou o último (1) elemento de um
        array.
        –> $pull – Remove elementos específicos de um array.
        –> $addToSet – Adiciona um elemento ao array apenas se ele não
        existir.
        –> $pullAll – Remove múltiplos valores específicos de um array.
        –> $each – Usado com $push para adicionar múltiplos elementos
        ao array.

*/

db.user.insertMany([
    {
        _id: 1,
        username: "João",
        age: 24,
       active: true,
        premium: false,
        hobbies: ["reading", "soccer"],
        tasks: [{ title: "Study MongoDB", status: "pending" }]
    },
   {
        _id: 2,
        username: "Maria",
        age: 30,
        active: false,
        premium: true,
        hobbies: ["cooking", "yoga"],
        tasks: [{ title: "Complete project", status: "done" }]
    },
    {
        _id: 3,
        username: "Carlos",
        age: 35,
        active: true,
        premium: false,
        hobbies: ["gaming", "music"],
        tasks: [{ title: "Write report", status: "pending" }]
    }
 ]);


db.user.updateOne(
    {username: "João"},
    {$set: {age: 25}}
 );


 db.user.replaceOne(
      {username: "Maria"},
      {_id: 2, username: "Maria", age: 31, active: true, premium: false, hobbies: [] }
 );


db.user.updateOne(
    {username: "Carlos"},
    {$unset: {premium: ""}}
 );


db.user.updateOne(
    {username: "Maria"},
    {$rename: {"age": "yearsOld"}}
);


db.user.updateOne(
    {isername: "João"},
    {$inc: {age: 1}}
 );


db.user.updateOne(
    {isername: "Carlos"},
    {$mul: {age: 2}}
 );


db.user.updateOne(
    {isername: "Maria"},
    {$max: {yearOld: 35}}
 );


db.user.updateOne(
   {isername: "João"},
   {$push: {hobbies: "guitar"}}
 );


db.user.updateOne(
    {isername: "Maria"},
    {$pop: {hobbies: -1 }}
 );


db.user.updateOne(
    {isername: "João"},
    {$addToSet: {hobbies: "chess" }}
 );


db.user.updateOne(
    {isername: "João"},
    {$push: {hobbies: {$each: ["coding", "music"] } } }
 );