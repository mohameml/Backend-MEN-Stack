# **Installation et Configuration d'un client gRPC en C# :**

-   **installtion de grpc et protobuf pour c# :**

    ```bash
    dotnet add package Grpc.Net.Client
    dotnet add package Grpc.Tools
    dotnet add package  Google.Protobuf
    ```

-   **configurer `.csproj`:**

    ```xml
    <ItemGroup>
    <Protobuf Include="Protos\greet.proto" GrpcServices="Client" />
    </ItemGroup>
    ```

-   **fichier `.proto`:**

    ```proto
    syntax = "proto3";
    option csharp_namespace = "GrpcClientHelloWorld";

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

-   **configuration de client:**

    ```CSharp
    using System;
    using Grpc.Net.Client;
    using GrpcClientHelloWorld;

    // Namespace généré correspond à celui de votre fichier .proto
    class Program
    {
        static async Task Main(string[] args)
        {
            // URL de votre serveur gRPC
            var channel = GrpcChannel.ForAddress("http://localhost:5001");

            // Créer un client pour le service Greeter
            var client = new Greeter.GreeterClient(channel);

            // Effectuer un appel au service
            var reply = await client.SayHelloAsync(new HelloRequest { Name = "C#" });
            Console.WriteLine("Message reçu : " + reply.Message);
        }
    }

    ```

-   **lancer le client:**

    ```CSharp
    dotnet run Program.cs
    ```
