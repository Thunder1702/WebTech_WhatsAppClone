let cfg = require('./config.json')      // config file
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const db = require("./db");

let app = express();


const server = require('http').createServer(app);
const options = { cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  } };
const io = require('socket.io')(server, options);


//app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Request for Contacts
const newContact = require('./routes/newContact');
const deleteContact = require('./routes/deleteContact');
const editContact = require('./routes/editContact');
const getContacts = require('./routes/getContacts');
const getAllContactsFromUser = require('./routes/getAllContactsFromUser');
//Eventuel in eine route --> Message und dort ob GET oder POST Befehl kommt
//Requests for Messages
const sendMessage = require('./routes/sendMessage');
const getMessage = require('./routes/getMessage');
const getMessages = require('./routes/getMessages.js');
const chatHistoryUserContact = require('./routes/chathistoryUserContact');
//Requests for Photos
const uploadPhotot = require('./routes/uploadPhoto');
const getPhotos = require('./routes/getPhotos');
//Requests for User or Profile
const registerUser = require('./routes/registerUser');
const editUser = require('./routes/editUser');
const getUser = require('./routes/getUser');
const signIn = require('./routes/signIn');



//Contacts
app.use('/contacts/newContact', newContact);
app.use('/contacts/deleteContact', deleteContact);
app.use('/contacts/editContact', editContact);
app.use('/contacts/getContacts', getContacts);
app.use('/contacts/getAllContactsFromUser', getAllContactsFromUser);
//Message
app.use('/mainChat/sendMessage', sendMessage);
app.use('/mainChat/getMessage', getMessage);
app.use('/mainChat/getMessages', getMessages);
app.use('/mainChat/getChatHistoryUserContact',chatHistoryUserContact);
//Photo
app.use('/mainChat/uploadPhoto', uploadPhotot);
app.use('/mainChat/getPhotos', getPhotos);
//User or Profile
app.use('/login/register', registerUser);
app.use('/login/signIn',signIn);
app.use('/profile', getUser);
app.use('/profile/edit', editUser);


app.use("/", (req, res) => {
    res.send("Welcome to WhatsAppClone server");
});


var clientList = []
var chatRoomList = []
//var chatNr = 0;

/*
var room1 = {
  name: "",
  clientList: []
}
*/

let getClientWithID = (id) => {
  for (let i=0;i<clientList.length;i++) {      
    if (clientList[i].id === id) {
      return clientList[i];
    }
  }
};

io.on("connection", (socket) => {

    if (!getClientWithID(socket.id)) {
      clientList.push(socket);

      setTimeout( () => {
        for (c of chatRoomList) {
          let chat = {
            id: c.id,
            name: c.name
          }
          //console.log(chat);
          
          socket.emit("newChat", chat);
        }
      },500);

    } else return;


    socket.on("sendMessage", (message) => {
      console.log("sendMessage: " + socket.id + " : " + message);
      let msg = {
        id: socket.id,
        msg: message
      }
      socket.broadcast.emit("message", msg);
      
    });

    socket.on("createChat", (name) => {
      let chat = {
        id: chatRoomList.length,
        name: name
      }
      let chatName = chat.name + "_" + chat.id;
      console.log("createChat: " + socket.id + " : " + chatName);

      chatRoomList.push({
        name: name,
        id: chat.id,
        clients: [],
        messages: []
      });


      socket.emit("newChat", chat); // chat creator
      socket.broadcast.emit("newChat", chat); // all others
      
    });

    socket.on("disconnect", () => {
      let index = -1;

      for (let i=0;i<clientList.length;i++) {      
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
//db.initDb.then(() => {
    server.listen(cfg.server.port, () => {
        console.log("Listening on port " + cfg.server.port + "...");
    });
//}, () => {console.log("Failed to connect to DB!")});