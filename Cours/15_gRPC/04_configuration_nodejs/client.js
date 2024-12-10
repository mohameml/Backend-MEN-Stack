const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const txt = process.argv[2];

const client = new todoPackage.Todo(
    "localhost:4000",
    grpc.credentials.createInsecure()
);

client.createTodo(
    {
        id: -1,
        text: txt,
    },
    (err, res) => {
        console.log("Recieved from server " + JSON.stringify(res));
    }
);

client.readTodos({}, (err, res) => {
    console.log("read the todos from server " + JSON.stringify(res));
});
