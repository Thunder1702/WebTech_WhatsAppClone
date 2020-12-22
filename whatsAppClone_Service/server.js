let cfg = require('./config.json')      // config file
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const db = require("./db");

let app = express();
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const newContact = require('./routes/newContact');
const deleteContact = require('./routes/deleteContact');
const editContact = require('./routes/editContact');
const getContacts = require('./routes/getContacts');
//Eventuel in eine route --> Message und dort ob GET oder POST Befehl kommt
const sendMessage = require('./routes/sendMessage');
const getMessage = require('./routes/getMessage');
const uploadPhotot = require('./routes/uploadPhoto');

app.use('/contacts/newContact', newContact);
app.use('/contacts/deleteContact', deleteContact);
app.use('/contacts/editContact', editContact);
app.use('/contacts/getContacts', getContacts);
app.use('/mainChat/sendMessage', sendMessage);
app.use('/mainChat/getMessage', getMessage);
app.use('/mainChat/uploadPhoto', uploadPhotot);


app.use("/", (req, res) => {
    res.send("Welcome to WhatsAppClone server");
});


//initialisieren wir eine Datebank, macht einen neuen Promis
db.initDb.then(() => {
    app.listen(cfg.server.port, () => {
        console.log("Listening on port " + cfg.server.port + "...");
    });
}, () => {console.log("Failed to connect to DB!")});