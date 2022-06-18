const dataAlaDB = require('./alaDB/adminCred.json');
const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const fs = require('fs');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const multer = require('multer');
process.env.PWD = process.cwd();

app.use(express.static(path.resolve(__dirname, '../coctails-frontend/build')));
app.use(express.static(process.env.PWD + '/coctails-frontend/src/data/images'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

var PATH_TO_COMMENTS = process.env.PWD + "/server/data/comments.json";
var PATH_TO_COCTAILS = process.env.PWD + "/server/data/coctails.json";
var PATH_TO_IMAGES = process.env.PWD + "/coctails-frontend/src/data/images";
var PATH_TO_PUBLIC = process.env.PWD + "/server/public/";
var PATH_TO_FONTS = process.env.PWD + "/server/public/fonts/";
var PDF_COCTAILS_DIR = "pdfCoctails/";
var PDF_FILE_EXTENSION = ".pdf";

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, PATH_TO_IMAGES);
        },
        filename: function (req, file, cb) {
            const extension = file.mimetype.split('/')[1];
            const coctail = JSON.parse(req.body.coctail);
            let nameNoWhitespace = coctail.name.replace(/\s/g, '');
            const fileName = nameNoWhitespace + '.' + extension;
            cb(null, fileName);
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 5 // MB
    },
    fileFilter: (req, file, cb) => {
        let valid = file.mimetype.includes('image/');
        cb(null, valid);
    },
});

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

app.post('/coctails/createCoctail', upload.single("file"), (req, res) => {
    const reqData = JSON.parse(req.body.coctail);
    const image = req.file;
    if (image !== undefined) {
        reqData.image = '/' + image.filename;
    } else {
        reqData.image = "/noPhoto.jpg";
    }
    let rawData = fs.readFileSync(PATH_TO_COCTAILS);
    const coctails = JSON.parse(rawData);
    const createdCoctail = createCoctail(reqData, true);

    coctails.sort((c1, c2) => {
        return c1.id - c2.id;
    });

    createdCoctail.id = coctails.length + 1;
    coctails.push(createdCoctail);

    let dataToSave = JSON.stringify(coctails, null, 2);
    fs.writeFileSync(PATH_TO_COCTAILS, dataToSave);
    res.send(dataToSave);
});

app.post('/coctails/updateCoctail', upload.single("file"), (req, res) => {
    const reqData = JSON.parse(req.body.coctail);
    const image = req.file;
    if (image !== undefined) {
        reqData.image = '/' + image.filename;
    }
    let rawData = fs.readFileSync(PATH_TO_COCTAILS);
    const coctails = JSON.parse(rawData);
    const coctailToUpdate = createCoctail(reqData);

    coctails.sort((c1, c2) => {
        return c1.id - c2.id;
    });
    const updatedCoctails = coctails.map((c) => {
        if (c.id === coctailToUpdate.id) {
            //if name has changed check if file was uploaded, otherwise assign img to noPhoto.jpg
            console.log(image);
            console.log(c.name.replace(/\s/g, ''));
            console.log(coctailToUpdate.name.replace(/\s/g, ''));
            if (c.name.replace(/\s/g, '') !== coctailToUpdate.name.replace(/\s/g, '') && image === undefined) {
                coctailToUpdate.image = "/noPhoto.jpg";
            }
            Object.assign(c, coctailToUpdate);
        }
        return c;
    });
    let dataToSave = JSON.stringify(updatedCoctails, null, 2);
    fs.writeFileSync(PATH_TO_COCTAILS, dataToSave);
    res.send(dataToSave);
});

app.post('/coctails/rateCoctail', (req, res) => {
    const reqData = req.body;
    let rawData = fs.readFileSync(PATH_TO_COCTAILS);
    const coctails = JSON.parse(rawData);
    const updatedCoctails = coctails.map((coctail) => {
        if (reqData.idCoctail === coctail.id) {
            coctail.ratings.push(reqData.rate);
        }
        return coctail;
    });

    coctails.sort((c1, c2) => {
        return c1.id - c2.id;
    });
    let dataToSave = JSON.stringify(updatedCoctails, null, 2);
    fs.writeFileSync(PATH_TO_COCTAILS, dataToSave);
    res.send(dataToSave);
});

app.get('/coctails/downloadCoctail', (req, res) => {
    const reqId = parseInt(req.query.coctailId);
    let rawData = fs.readFileSync(PATH_TO_COCTAILS);
    const coctails = JSON.parse(rawData);
    const requestedCoctail = coctails.find((coctail) => coctail.id === reqId);
    const pathToFile = PATH_TO_PUBLIC + PDF_COCTAILS_DIR + requestedCoctail.name.replace(/\s/g, '').toLowerCase()  + PDF_FILE_EXTENSION;
    console.log(pathToFile)
    fs.createWriteStream("./plik.pdf").on('error', function (err){
        console.error("ERROR:" + err);
    });
    console.log(fs.existsSync("./plik.pdf"));
    fs.createWriteStream(pathToFile);

    // if (!fs.existsSync(pathToFile)) {
    //     loadCoctailDataToPDF(pathToFile, requestedCoctail);
    // }
    // let stream = fs.createReadStream(pathToFile);
    console.log(fs.existsSync(pathToFile));
    // stream.pipe(res).once("close", function () {
    //     stream.destroy(); // makesure stream closed, not close if download aborted.
    //     deleteFile(pathToFile);
    // });
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

const createCoctail = (data, createNew) => {
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
    let coctail = {};
    if (createNew) {
        coctail = {
            id: undefined,
            name: data.name,
            image: data.image,
            type: data.type,
            glass: data.glass,
            ratings: [],
            ingredients: ingredients,
            steps: steps
        }
    }
    //update
    else {
        coctail = {
            id: data.id,
            name: data.name,
            type: data.type,
            glass: data.glass,
            ingredients: ingredients,
            steps: steps
        }
        if (data.image !== undefined) {
            coctail.image = data.image;
        }
    }
    return coctail;
}

const deleteFile = (file) => {
    fs.unlink(file, function (err) {
        if (err) {
            console.error(err.toString());
        } else {
            console.warn(file + ' deleted');
        }
    });
}

const loadCoctailDataToPDF = (pathToFile, coctail) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pathToFile));
    // Tittle
    doc
        .fontSize(12)
        .font(PATH_TO_FONTS + "times.ttf")
        .text("Przepis na", {
            width: 410,
            align: 'center'
        })
        .moveDown()
        .fontSize(16)
        .font(PATH_TO_FONTS + "timesBold.ttf")
        .text(coctail.name, {
            width: 410,
            align: 'center',
            underline: true
        });
    //IMG
    //     doc
    //         .moveDown()
    //         .image(PATH_TO_IMAGES + coctail.image, {
    //         fit: [300, 300],
    //         align: 'center',
    //         valign: 'center'
    //     });
    //Ingredients
    doc
        .moveDown()
        .fontSize(14)
        .text("Składniki:", {
            width: 410,
            underline: true
        })
        .fontSize(12)
        .font(PATH_TO_FONTS + "times.ttf");
    coctail.ingredients.forEach((ingr, index) => {
        doc
            .moveDown()
            .text(index + 1 + ". " + ingr.name + " " + ingr.amount + " " + ingr.measurement);
    })
    //Steps
    doc
        .moveDown()
        .fontSize(14)
        .font(PATH_TO_FONTS + "timesBold.ttf")
        .text("Sposób przygotowania", {
            width: 410,
            underline: true
        })
        .fontSize(12)
        .font(PATH_TO_FONTS + "times.ttf");
    coctail.steps.forEach((step, index) => {
        doc
            .moveDown()
            .text(index + 1 + ". " + step);
    })
    doc.end();
}
