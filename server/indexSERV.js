const dataAlaDB = require('./alaDB/adminCred.json');
process.env.PWD = process.cwd()
const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");

app.use(express.static(path.resolve(__dirname, '../coctails-frontend/build')));
app.use(express.static(process.env.PWD  + '/coctails-frontend/src/data/images'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../coctails-frontend/build', 'index.html'));})

app.post('/adminLogin', (req, res) => {
    const reqData = req.body;
    if (validateCred(reqData)){
        res.send(true);
    }else{
        res.send(false);
    }
});

////TODO api to save coctails + comments

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const validateCred = (credentials) => {
    let result = bcrypt.compareSync(credentials.password, dataAlaDB.password);
    console.log(result);
    return (credentials.login === dataAlaDB.login && result);
}