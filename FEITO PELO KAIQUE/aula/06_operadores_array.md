# Push: adiciona um elemento a um array
```js
db.clientes.updateOne(
    { nome: "Kaique" },
    { $push: { jogos: "genshin" } }
);
```

# Pop: remove o primeiro (-1) ou o último (1) elemento de um array
```js
db.clientes.updateOne(
    { nome: "Kaique" },
    { $pop: { jogos: -1 } }
);
```

# Pull: remove elementos especificos de um array
```js
db.clientes.updateOne(
    { nome: "Kaique" },
    { $pull: { jogos: "hollow knight" } }
);
```

# AddToSet: adiciona um elemento ao array apenas se ele não existir
```js
db.clientes.updateOne(
    { nome: "Kaique" },
    { $addToSet: { jogos: "the witcher 3" } }
);
```

# PullAll: remove múltiplo valores específicos de um array
```js
db.clientes.updateOne(
    { nome: "Kaique" },
    { $pullAll: { jogos: ["hollow knight", "roblox", "minecraft"] } }
);
```

# Each: usado com $push para adicionar múltiplos elementos ao array
```js
db.clientes.updateOne(
    { nome: "Kaique" },
    { $push: { jogos: { $each: ["cyberpunk 2077", "life is strange", "the walking dead"] } } }
)
```