#include <iostream>
#include <memory>
#include <string>

#include <grpcpp/grpcpp.h>
#include "helloworld.grpc.pb.h"

using grpc::Server;
using grpc::ServerBuilder;
using grpc::ServerContext;
using grpc::Status;

using helloworld::Greeter;
using helloworld::HelloReply;
using helloworld::HelloRequest;

// Implémentation du service Greeter
class GreeterServiceImpl final : public Greeter::Service
{
public:
    Status SayHello(ServerContext *context, const HelloRequest *request, HelloReply *reply) override
    {
        std::string message = "Hello, " + request->name();
        reply->set_message(message);
        return Status::OK;
    }
};

void RunServer()
{
    std::string server_address("0.0.0.0:5001");
    GreeterServiceImpl service;

    ServerBuilder builder;
    builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
    builder.RegisterService(&service);

    std::unique_ptr<Server> server(builder.BuildAndStart());
    std::cout << "Server is running on " << server_address << std::endl;
    server->Wait();
}

int main()
{
    RunServer();
    return 0;
}
