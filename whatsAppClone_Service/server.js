let cfg = require('./config.json')      // config file
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

let app = express();
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const newContact = require('./routes/newContact');
const deleteContact = require('./routes/deleteContact');
const editContact = require('./routes/editContact');
//Eventuel in eine route --> Message und dort ob GET oder POST Befehl kommt
const sendMessage = require('./routes/sendMessage');
const getMessage = require('./routes/getMessage');
const uploadPhotot = require('./routes/uploadPhoto');

app.use('/contacts/newContact', newContact);
app.use('/contacts/deleteContact', deleteContact);
app.use('/contacts/editContact', editContact);
app.use('/mainChat/sendMessage', sendMessage);
app.use('/mainChat/getMessage', getMessage);
app.use('/mainChat/uploadPhoto', uploadPhotot);


app.use("/", (req, res) => {
    res.send("Welcome to WhatsAppClone server");
});

app.listen(cfg.server.port, () => {
    console.log("Server listening on port " + cfg.server.port);
})