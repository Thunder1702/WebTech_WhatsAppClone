import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import SocketIOStatic, { Socket } from "socket.io";

import { initDb } from "./db";
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

// app.use(cors());
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
let chatRoomList: any[] = [];

let getClientWithID = (id: string) => {
  for (let i = 0; i < clientList.length; i++) {
    if (clientList[i].id === id) {
      return clientList[i];
    }
  }
};

sio.on("connection", (socket: Socket) => {
  if (!getClientWithID(socket.id)) {
    clientList.push(socket);

    setTimeout(() => {
      for (let c of chatRoomList) {
        let chat = {
          id: c.id,
          name: c.name,
        };
        //console.log(chat);

        socket.emit("newChat", chat);
      }
    }, 500);
  } else return;

  socket.on("sendMessage", (message) => {
    console.log("sendMessage: " + socket.id + " : " + message);
    let msg = {
      id: socket.id,
      msg: message,
    };
    socket.broadcast.emit("message", msg);
  });

  socket.on("createChat", (name) => {
    let chat = {
      id: chatRoomList.length,
      name: name,
    };
    let chatName = chat.name + "_" + chat.id;
    console.log("createChat: " + socket.id + " : " + chatName);

    chatRoomList.push({
      name: name,
      id: chat.id,
      clients: [],
      messages: [],
    });

    socket.emit("newChat", chat); // chat creator
    socket.broadcast.emit("newChat", chat); // all others
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

  console.log("client connected - id" + socket.id);
  console.log("Connected Clients: " + clientList.length);
});

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
