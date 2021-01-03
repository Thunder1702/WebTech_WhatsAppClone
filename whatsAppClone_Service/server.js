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
app.user('/contacts/getAllContactsFromUser', getAllContactsFromUser);
//Message
app.use('/mainChat/sendMessage', sendMessage);
app.use('/mainChat/getMessage', getMessage);
app.use('/mainChat/getMessages', getMessages);
app.user('/mainChat/getChatHistoryUserContact',chatHistoryUserContact);
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

io.on("connection", (socket) => {
    socket.on("sendMessage", (message) => {
      console.log("sendMessage: " + socket.id + " : " + message);
      socket.broadcast.emit("message", message);
    });
    console.log("someone connected");
  });
  
  io.on("disconnect", (socket) => {
    console.log("someone disconnected");
  });
  
  io.on("disconnecting", (socket) => {
    console.log("someone disconnecting");
  });

  

//initialisieren wir eine Datebank, macht einen neuen Promis
//db.initDb.then(() => {
    server.listen(cfg.server.port, () => {
        console.log("Listening on port " + cfg.server.port + "...");
    });
//}, () => {console.log("Failed to connect to DB!")});