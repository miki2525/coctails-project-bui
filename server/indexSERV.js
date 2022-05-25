const dataAlaDB = require('./alaDB/adminCred.json');
process.env.PWD = process.cwd()
const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const fs = require('fs');

var PATH_TO_COMMENTS = process.env.PWD + "/coctails-frontend/src/data/comments.json"
var PATH_TO_COCTAILS = process.env.PWD + "/coctails-frontend/src/data/coctails.json"

app.use(express.static(path.resolve(__dirname, '../coctails-frontend/build')));
app.use(express.static(process.env.PWD  + '/coctails-frontend/src/data/images'));
app.use(bodyParser.json());

app.post('/adminLogin', (req, res) => {
    const reqData = req.body;
    if (validateCred(reqData)){
        res.send(true);
    }else{
        res.send(false);
    }
});

app.get('/adminLogin/logout', (req, res) => {
    res.cookie("logout", true, {expire: 5000});
    res.send(true);
});

app.post('/comments/saveComment', (req, res) => {
    const reqData = req.body;
    let rawData = fs.readFileSync(PATH_TO_COMMENTS);
    const comments = JSON.parse(rawData);
    comments.sort((com1, com2) => {
    return com1.id - com2.id;
});
   let date = getToday();
    const newComment = {
        "id": comments[comments.length - 1].id + 1,
        "id_coctail": reqData.idCoctail,
        "date": date.toString(),
        "content": reqData.content
    }
    comments.push(newComment);
    let dataToSave = JSON.stringify(comments, null, 2);
    fs.writeFileSync(PATH_TO_COMMENTS, dataToSave);
    res.send(dataToSave);
});
////TODO api to save coctails

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../coctails-frontend/build', 'index.html'));})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const validateCred = (credentials) => {
    let result = bcrypt.compareSync(credentials.password, dataAlaDB.password);
    console.log(result);
    return (credentials.login === dataAlaDB.login && result);
}

const getToday = () => {
    let today = new Date();
    let mm = today.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    let date = today.getDate()+'-'+mm+'-'+today.getFullYear();
    return date.toString();
}

//
// function crypt(){
//    bcrypt.hash("admin",0, (err, hash)=>{
//        console.log(hash);
//    });
// }

// comments.sort((com1, com2) => {
//     return com1.id - com2.id;
// });