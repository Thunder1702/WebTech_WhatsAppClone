let cfg = require('./config.json')      // config file
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const db = require("./db");

let app = express();
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Request for Contacts
const newContact = require('./routes/newContact');
const deleteContact = require('./routes/deleteContact');
const editContact = require('./routes/editContact');
const getContacts = require('./routes/getContacts');
//Eventuel in eine route --> Message und dort ob GET oder POST Befehl kommt
//Requests for Messages
const sendMessage = require('./routes/sendMessage');
const getMessage = require('./routes/getMessage');
const getMessages = require('./routes/getMessages.js');
//Requests for Photos
const uploadPhotot = require('./routes/uploadPhoto');
const getPhotos = require('./routes/getPhotos');
//Requests for User or Profile
const registerUser = require('./routes/registerUser');
const editUser = require('./routes/editUser');
const getUser = require('./routes/getUser');

//Contacts
app.use('/contacts/newContact', newContact);
app.use('/contacts/deleteContact', deleteContact);
app.use('/contacts/editContact', editContact);
app.use('/contacts/getContacts', getContacts);
//Message
app.use('/mainChat/sendMessage', sendMessage);
app.use('/mainChat/getMessage', getMessage);
app.use('/mainChat/getMessages', getMessages);
//Photo
app.use('/mainChat/uploadPhoto', uploadPhotot);
app.use('/mainChat/getPhotos', getPhotos);
//User or Profile
app.use('/login/register', registerUser);
app.use('/profile', getUser);
app.use('/profile/edit', editUser);


app.use("/", (req, res) => {
    res.send("Welcome to WhatsAppClone server");
});


//initialisieren wir eine Datebank, macht einen neuen Promis
db.initDb.then(() => {
    app.listen(cfg.server.port, () => {
        console.log("Listening on port " + cfg.server.port + "...");
    });
}, () => {console.log("Failed to connect to DB!")});