var db = connect("mongodb://root:Tcp9DOTJV9jZO7TdN3VvcneYiD@localhost:27017/admin");

db = db.getSiblingDB('chatapp'); // we can not use "use" statement here to switch db

db.createUser(
    {
        user: "root",
        pwd: "Tcp9DOTJV9jZO7TdN3VvcneYiD",
        roles: [{ role: "readWrite", db: "chatapp" }],
        passwordDigestor: "server",
    }
)