using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text;
using System.Globalization;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace CSharpWebSocket {
    public class Service : WebSocketBehavior {

        private float time;
        private int state;

        protected override void OnMessage(MessageEventArgs e) {

            Console.WriteLine("------------------------\nReceived Message: " + e.Data);

            //Console.WriteLine("State:" + e.Data.Substring(0, 1));
            state = Int32.Parse(e.Data.Substring(0, 1));

            //Console.WriteLine("Time:\"" + e.Data.Substring(1) + "\"");

            if (!e.Data.Substring(1).Equals("")) {
                time = float.Parse(e.Data.Substring(1), System.Globalization.CultureInfo.InvariantCulture);
            }

            Console.WriteLine("State:" + state + " Time:\"" + time + "\"");       

            // overcomplicated, but may need switch statements later
            switch (state) {
                //instead of -1 because of string formating
                case 6:
                    break;
                case 0:
                    Console.WriteLine("Sending Message:" + "0" + time.ToString());
                    Sessions.Broadcast("0" + time.ToString());
                    break;
                case 1:
                    Console.WriteLine("Sending Message:" + "1" + time.ToString());
                    Sessions.Broadcast("1" + time.ToString());
                    break;
                case 2:
                    Console.WriteLine("Sending Message:" + "2" + time.ToString());
                    Sessions.Broadcast("2" + time.ToString());
                    break;
                case 3:
                    Console.WriteLine("Sending Message:" + "3" + time.ToString());
                    Sessions.Broadcast("3" + time.ToString());
                    break;
                case 5:
                    Console.WriteLine("Sending Message:" + "5" + time.ToString());
                    Sessions.Broadcast("5" + time.ToString());
                    break;
                default:
                    break;
            }
            
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

