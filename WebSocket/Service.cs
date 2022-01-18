using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text;

using WebSocketSharp;
using WebSocketSharp.Server;

namespace CSharpWebSocket {
    public class Service : WebSocketBehavior {

        private double time;
        private int state;

        protected override void OnMessage(MessageEventArgs e) {
            Console.WriteLine("Sending:" + "aaaaaaa");
            Send("aaaaaaa");
            /*
            Console.WriteLine("State:" + e.Data.Substring(0, 1));
            state = Int32.Parse(e.Data.Substring(0, 1));
            Console.WriteLine("Time:\"" + e.Data.Substring(1) + "\"");
            if (!e.Data.Substring(1).Equals("")) {
                time = Double.Parse(e.Data.Substring(1));
            }
            Console.WriteLine("state:" + state + " time:\"" + time + "\"");
            Console.WriteLine("Received Message: " + e.Data);

            switch (state) {
                //instead of -1 because of string formating
                case 6:
                    break;
                case 0:
                    Console.WriteLine("Sending:" + "0" + time.ToString());
                    Send("aaaaaaaa");
                    break;
                case 1:
                    Console.WriteLine("Sending:" + "1" + time.ToString());
                    Send("aaaaaaaa");
                    break;
                case 2:
                    Console.WriteLine("Sending:" + "2" + time.ToString());
                    Send("aaaaaaaa");
                    break;
                case 3:
                    Console.WriteLine("Sending:" + "3" + time.ToString());
                    Send("aaaaaaaa");
                    break;
                case 5:
                    Console.WriteLine("Sending:" + "5" + time.ToString());
                    Send("aaaaaaaa");
                    break;
                default:
                    break;
            }
            */
        }

        protected override void OnOpen() {
            Console.WriteLine("WebSocketService started.");
            base.OnOpen();
        }

        protected override void OnClose(CloseEventArgs e) {
            Console.WriteLine("Connection closed.");
            base.OnClose(e);
        }

        protected override void OnError(ErrorEventArgs e) {
            Console.WriteLine("Error");
            base.OnError(e);
        }
    }
}

