# Installation et Configuration gRPC pour c++ :

-   **installer grpc et protobuf pour c++ :**

    -   [grpc_C_plus_plus](https://grpc.io/docs/languages/cpp/quickstart/)
    -   [protobuf](https://grpc.io/docs/protoc-installation/)

-   **configurer le CMakeLists.txt :**

    ```CMAKE
    cmake_minimum_required(VERSION 3.8)

    project(myServer C CXX)


    # include(./common.cmake)
    # Release or Debug
    if (NOT CMAKE_BUILD_TYPE)
        message(STATUS "Setting build type to 'Debug' as none was specified.")
        set(CMAKE_BUILD_TYPE Debug CACHE STRING "Choose the type of build." FORCE)
    endif ()

    list(APPEND CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/cmake")
    # Find Protobuf installation
    option(protobuf_MODULE_COMPATIBLE TRUE)
    find_package(Protobuf CONFIG REQUIRED)
    message(STATUS "Using protobuf ${Protobuf_VERSION}")

    set(_PROTOBUF_LIBPROTOBUF protobuf::libprotobuf)
    set(_REFLECTION gRPC::grpc++_reflection)
    set(_PROTOBUF_PROTOC $<TARGET_FILE:protobuf::protoc>)

    # Find gRPC installation
    # Looks for gRPCConfig.cmake file installed by gRPC's cmake installation.
    find_package(gRPC CONFIG REQUIRED)
    message(STATUS "Using gRPC ${gRPC_VERSION}")

    set(_GRPC_GRPCPP gRPC::grpc++)
    set(_GRPC_CPP_PLUGIN_EXECUTABLE $<TARGET_FILE:gRPC::grpc_cpp_plugin>)

    # Proto file
    get_filename_component(hw_proto "./helloworld.proto" ABSOLUTE)
    get_filename_component(hw_proto_path "${hw_proto}" PATH)

    # Generated sources
    set(hw_proto_srcs "${CMAKE_CURRENT_BINARY_DIR}/helloworld.pb.cc")
    set(hw_proto_hdrs "${CMAKE_CURRENT_BINARY_DIR}/helloworld.pb.h")
    set(hw_grpc_srcs "${CMAKE_CURRENT_BINARY_DIR}/helloworld.grpc.pb.cc")
    set(hw_grpc_hdrs "${CMAKE_CURRENT_BINARY_DIR}/helloworld.grpc.pb.h")
    add_custom_command(
        OUTPUT "${hw_proto_srcs}" "${hw_proto_hdrs}" "${hw_grpc_srcs}" "${hw_grpc_hdrs}"
        COMMAND ${_PROTOBUF_PROTOC}
        ARGS --grpc_out "${CMAKE_CURRENT_BINARY_DIR}"
            --cpp_out "${CMAKE_CURRENT_BINARY_DIR}"
            -I "${hw_proto_path}"
            --plugin=protoc-gen-grpc="${_GRPC_CPP_PLUGIN_EXECUTABLE}"
            "${hw_proto}"
        DEPENDS "${hw_proto}"
    )



    # Include generated *.pb.h files
    include_directories("${CMAKE_CURRENT_BINARY_DIR}")

    # hw_grpc_proto
    add_library(hw_grpc_proto
    ${hw_grpc_srcs}
    ${hw_grpc_hdrs}
    ${hw_proto_srcs}
    ${hw_proto_hdrs}

    )
    target_link_libraries(hw_grpc_proto
    ${_REFLECTION}
    ${_GRPC_GRPCPP}
    ${_PROTOBUF_LIBPROTOBUF}

    )

    add_executable(serverhw server.cpp)
    target_link_libraries(serverhw
        hw_grpc_proto
        ${_REFLECTION}
        ${_GRPC_GRPCPP}
        ${_PROTOBUF_LIBPROTOBUF}
    )

    ```

-   **fichier .proto:**

    ```proto
    syntax = "proto3";

    package helloworld;

    service Greeter {
        rpc SayHello (HelloRequest) returns (HelloReply);
    }

    message HelloRequest {
        string name = 1;
    }

    message HelloReply {
        string message = 1;
    }


    ```

-   **implémenetre le servive dans le fichier .proto en c++:**

    ```cpp

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

    ```

-   **configurer le serveur:**

    ```cpp

    void RunServer()
    {
        std::string server_address("0.0.0.0:50051");
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

    ```

-   **lancer le serveur:**

    ```bash
    mkdir build
    cd build
    cmake -DCMAKE_PREFIX_PATH=$MY_INSTALL_DIR ..
    make
    ./server
    ```
