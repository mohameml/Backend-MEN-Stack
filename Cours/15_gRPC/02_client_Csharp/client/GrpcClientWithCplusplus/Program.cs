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
