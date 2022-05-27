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
app.use(express.static(process.env.PWD + '/coctails-frontend/src/data/images'));
app.use(bodyParser.json());

app.get('/api/getData', (req, res) => {
    let rawData = fs.readFileSync(PATH_TO_COMMENTS);
    let rawData2 = fs.readFileSync(PATH_TO_COCTAILS);
    let comments = JSON.parse(rawData);
    let coctails = JSON.parse(rawData2);
    let rawResponse = {coctails: coctails, comments: comments}
    let responseData = JSON.stringify(rawResponse, null, 2);
    res.send(responseData);
});

app.post('/adminLogin', (req, res) => {
    const reqData = req.body;
    if (validateCred(reqData)) {
        res.send(true);
        console.log("ADMIN LOGGED SUCCESSFULLY")
    } else {
        res.send(false);
        console.log("BAD USER OR PASSWORD")
    }
});

app.get('/adminLogin/logout', (req, res) => {
    res.cookie("logout", true, {expire: 5000});
    res.send(true);
    console.log("ADMIN LOGOUT")
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

app.post('/coctails/updateCoctail', (req, res) => {
    const reqData = req.body;
    let rawData = fs.readFileSync(PATH_TO_COCTAILS);
    const coctails = JSON.parse(rawData);
    const coctailToUpdate = createCoctail(reqData);

    coctails.sort((c1, c2) => {
        return c1.id - c2.id;
    });
    const updatedCoctails = coctails.map((c) => {
        if (c.id === coctailToUpdate.id){
            Object.assign(c, coctailToUpdate);
        }
        return c;
    });
    let dataToSave = JSON.stringify(updatedCoctails, null, 2);
    fs.writeFileSync(PATH_TO_COCTAILS, dataToSave);
    res.send(dataToSave);
});

app.post('/coctails/deleteCoctail', (req, res) => {
    const reqId = req.body;
    let rawData = fs.readFileSync(PATH_TO_COCTAILS);
    const coctails = JSON.parse(rawData);
    coctails.sort((c1, c2) => {
        return c1.id - c2.id;
    });
    const updatedCoctails = coctails.filter((c) =>
    c.id !== reqId.id)
    let dataToSave = JSON.stringify(updatedCoctails, null, 2);
    fs.writeFileSync(PATH_TO_COCTAILS, dataToSave);
    res.send(dataToSave);
});

app.post('/comments/deleteComment', (req, res) => {
    const reqId = req.body;
    let rawData = fs.readFileSync(PATH_TO_COMMENTS);
    const comments = JSON.parse(rawData);
    comments.sort((c1, c2) => {
        return c1.id - c2.id;
    });
    const updatedComments = comments.filter((c) =>
        c.id !== reqId.id)
    let dataToSave = JSON.stringify(updatedComments, null, 2);
    fs.writeFileSync(PATH_TO_COMMENTS, dataToSave);
    res.send(dataToSave);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../coctails-frontend/build', 'index.html'));
})

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
    let date = today.getDate() + '-' + mm + '-' + today.getFullYear();
    return date.toString();
}

const createCoctail = (data) => {
    const ingredients = [];
    let nameIngr = "nameIngr"
    let amount = "amount";
    let measurement = "measurement";
    let ingredientsLength = Object.keys(data).filter((prop) => prop.includes(nameIngr)).length;
    for (let i = 0; i < ingredientsLength; i++) {
        if (data[nameIngr + i] !== "") {
            ingredients.push({
                name: data[nameIngr + i],
                amount: data[amount + i],
                measurement: data[measurement + i]
            });
        }
    }
    const steps = data.steps.split(".").map((step) => step.trim()).filter((step) => step !== '')
        .map((step) => step + '.');
    const coctail = {
        id: data.id,
        name: data.name,
        type: data.type,
        glass: data.glass,
        ingredients: ingredients,
        steps: steps
    }
    return coctail;
}

//
// function crypt(){
//    bcrypt.hash("admin",0, (err, hash)=>{
//        console.log(hash);
//    });
// }
