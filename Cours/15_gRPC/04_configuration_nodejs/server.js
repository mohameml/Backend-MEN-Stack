const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:4000", grpc.ServerCredentials.createInsecure());
server.addService(todoPackage.Todo.service, {
    createTodo: createTodo,
    readTodos: readTodos,
});

server.start();

const todos = [];
function createTodo(call, callback) {
    console.log(call.request.text);
    const todoItem = {
        id: todos.length + 1,
        text: call.request.text,
    };
    todos.push(todoItem);
    callback(null, todoItem);
}

function readTodos(call, callback) {
    callback(null, { items: todos });
}
