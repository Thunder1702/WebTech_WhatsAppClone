import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ws from "ws";
import { initDb } from "./db";
import SocketIOStatic,{ Socket } from "socket.io";

let cfg = require("./config.json"); // config file

const app = express();

const server = require("http").createServer(app);
const options = {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
};

const sio = new SocketIOStatic.Server(server, options);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Request for Contacts
import newContact from "./routes/newContact";
import deleteContact from "./routes/deleteContact";
import editContact from "./routes/editContact";
import getContacts from "./routes/getContacts";
import getAllContactsFromUser from "./routes/getAllContactsFromUser";
//Eventuel in eine route --> Message und dort ob GET oder POST Befehl kommt
//Requests for Messages
import sendMessage from "./routes/sendMessage";
import getMessage from "./routes/getMessage";
import getMessages from "./routes/getMessages";
import chatHistoryUserContact from "./routes/chathistoryUserContact";
//Requests for Photos
import uploadPhotot from "./routes/uploadPhoto";
import getPhotos from "./routes/getPhotos";
//Requests for User or Profile
import registerUser from "./routes/registerUser";
import editUser from "./routes/editUser";
import getUser from "./routes/getUser";
import signIn from "./routes/signIn";


//Contacts
app.use("/contacts/newContact", newContact);
app.use("/contacts/deleteContact", deleteContact);
app.use("/contacts/editContact", editContact);
app.use("/contacts/getContacts", getContacts);
app.use("/contacts/getAllContactsFromUser", getAllContactsFromUser);
//Message
app.use("/mainChat/sendMessage", sendMessage);
app.use("/mainChat/getMessage", getMessage);
app.use("/mainChat/getMessages", getMessages);
app.use("/mainChat/getChatHistoryUserContact", chatHistoryUserContact);
//Photo
app.use("/mainChat/uploadPhoto", uploadPhotot);
app.use("/mainChat/getPhotos", getPhotos);
//User or Profile
app.use("/login/register", registerUser);
app.use("/login/signIn", signIn);
app.use("/profile", getUser);
app.use("/profile/edit", editUser);

app.use("/", (req, res) => {
  res.send("Welcome to WhatsAppClone server");
});

let clientList: any[] = [];
//let connectionTo: any[] = [];
let chatRoomList: any[] = [];

// const wsServer = new ws.Server({
//   noServer: true
// });



// wsServer.on('connection', (socket: Socket) => {
//   if (!getClientWithID(socket.id)) {
//     clientList.push(socket);
//     console.log(socket.id);
//   }else return;

//   //connectionTo[name] = socket;
//   //connectionTo[].send();

//   socket.on('sendMessage', message => {
//     if(message === 'sendMessage'){
//       setTimeout(() => {
//         socket.broadcast.send("message", "Update");
//       },1000);
//     }
//   });

//   socket.on("disconnect", () => {
//     let index = -1;

//     for (let i = 0; i < clientList.length; i++) {
//       if (clientList[i].id === socket.id) {
//         index = i;
//       }
//     }
//     if (index > -1) {
//       clientList.splice(index, 1);
//     }
//     console.log("client disconnected - id" + socket.id);
//     console.log("Connected Clients: " + clientList.length);
//   });
//   console.log("client connected - id " + socket.id);
//   console.log("Connected Clients: " + clientList.length);
// });

let getClientWithID = (id: string) => {
  for (let i = 0; i < clientList.length; i++) {
    if (clientList[i].id === id) {
      return clientList[i];
    }
  }
};


sio.on("connection", (socket: Socket) => {

  if(!getClientWithID(socket.id)){
    clientList.push(socket);
    console.log(socket.id);
  }else return;

  socket.on('sendMessage', message => {
    if(message === 'sendMessage'){
      setTimeout(() => {
        console.log("Broadcast gesendet.");
        socket.broadcast.send("message", "Update");
      },1000);
    }
  });

  socket.on("disconnect", () => {
    let index = -1;

    for (let i = 0; i < clientList.length; i++) {
      if (clientList[i].id === socket.id) {
        index = i;
      }
    }
    if (index > -1) {
      clientList.splice(index, 1);
    }
    console.log("client disconnected - id" + socket.id);
    console.log("Connected Clients: " + clientList.length);
  });
  console.log("client connected - id " + socket.id);
  console.log("Connected Clients: " + clientList.length);

});

// server.on('upgrade', (request: any, socket: any, head: any) => {
//   wsServer.handleUpgrade(request, socket, head, socket => {
//     wsServer.emit('connection', socket, request);
//   });
// }) ;

//initialisieren wir eine Datebank, macht einen neuen Promis
initDb().then(
  () => {
    server.listen(cfg.server.port, () => {
      console.log("Listening on port " + cfg.server.port + "...");
    });
  },
  () => {
    console.log("Failed to connect to DB!");
  }
);
