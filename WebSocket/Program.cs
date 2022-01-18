using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace CSharpWebSocket {
    class Program {
        static void Main(string[] args) {
            
            Console.WriteLine("Program started.");
            
            WebSocketServer w = new WebSocketServer("ws://127.0.0.1:7890");
            w.AddWebSocketService<Service>("/Service");
            w.Start();
            
            Console.WriteLine("WS server started on ws://127.0.0.1:7890");

            Console.ReadKey();
            w.Stop();
            Console.WriteLine("WebSocket closed");
        }
    }
}

