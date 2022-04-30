process.env.PWD = process.cwd()
const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(__dirname, '../coctails-frontend/build')));
app.use(express.static(process.env.PWD  + '/coctails-frontend/src/data/images'));


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../coctails-frontend/build', 'index.html'));})

////TODO api to save coctails + comments

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});