// Métodos de Documentos: UpdateOne(), UpdateMany(), ReplaceMany()

// Operadores de Atualização: $set, $unset, $rename, $inc, $mul, $min, $max

// Operadores de Array: $push, $pop, $pull, $addToSet, $pullAll, $each

// Atualização de Documentos ( update e replace ): 
// -> updateOne (filter, update, options)
//      Atualiza um único documento que corresponde ao filtro;
// -> 


//db.user.insertMany([
//    {
//        _id: 1,
//        username: "João",
//        age: 24,
//       active: true,
//        premium: false,
//        hobbies: ["reading", "soccer"],
//        tasks: [{ title: "Study MongoDB", status: "pending" }]
//    },
//   {
//        _id: 2,
//        username: "Maria",
//        age: 30,
//        active: false,
//        premium: true,
//        hobbies: ["cooking", "yoga"],
//        tasks: [{ title: "Complete project", status: "done" }]
//    },
//    {
//        _id: 3,
//        username: "Carlos",
//        age: 35,
//        active: true,
//        premium: false,
//        hobbies: ["gaming", "music"],
//        tasks: [{ title: "Write report", status: "pending" }]
//    }
// ]);


//db.user.updateOne(
//    {username: "João"},
//    {$set: {age: 25}}
// );


// db.user.replaceOne(
//      {username: "Maria"},
//      {_id: 2, username: "Maria", age: 31, active: true, premium: false, hobbies: [] }
// );


//db.user.updateOne(
//    {username: "Carlos"},
//    {$unset: {premium: ""}}
// );


//db.user.updateOne(
//    {username: "Maria"},
//    {$rename: {"age": "yearsOld"}}
//);


//db.user.updateOne(
//    {isername: "João"},
//    {$inc: {age: 1}}
// );


//db.user.updateOne(
//    {isername: "Carlos"},
//    {$mul: {age: 2}}
// );


//db.user.updateOne(
//    {isername: "Maria"},
//    {$max: {yearOld: 35}}
// );


//db.user.updateOne(
//    {isername: "João"},
//    {$push: {hobbies: "guitar"}}
// );


//db.user.updateOne(
//    {isername: "Maria"},
//    {$pop: {hobbies: -1 }}
// );


//db.user.updateOne(
//    {isername: "João"},
//    {$addToSet: {hobbies: "chess" }}
// );


//db.user.updateOne(
//    {isername: "João"},
//    {$push: {hobbies: {$each: ["coding", "music"] } } }
// );