//nodemon index.js (to start server)
//http://localhost:3000/inputs?model=civic&year=1990 (syntax for inputs)
//http://localhost:3000/results?model=civic&year=1990 (syntax for results)



const express = require('express');
const app = express();

//new code.

function raw(req, res, next) {
    const model = req.query.model;
    const year = req.query.year;

     //test case - year can't be a word **
    if(isNaN(year)){
        return res.status(400).send("Year can't be a word")
    }

    //test case - yeaer can't be a negative **
    if(year < 0){
        return res.status(400).send("Year can't be negative")
    }

/////////////////////////////////////////////////////////////////////////

    //test case 1 - no model or year
    if (!model || !year) {
        return res.status(400).send('Model and year are required');
    }
 
    //test case 2 - car year can't be before 1886
    if(year < 1886){
        return res.status(400).send("Car Year can't be before 1886, when first car was invented")
    }

     //test case 3 - car year can't be after 1886
    if(year > 2024){
        return res.status(400).send("Car Year can't be after 2024")
    }

    //test case 4 - year must be a whole number
    if (year % 1 !== 0) {
        return res.status(400).send("Invalid Year, must be a whole number");
    }
 
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const list = [];

    for (let i = 0; i < model.length; i++) {
        const letter = model[i].toLowerCase();
        const index = alphabet.indexOf(letter) + 1;
        list.push(index);
    }

    let sum = 0;
    for (let i = 0; i < list.length; i++) {
        sum += list[i];
    }

    req.totalSum = (sum * 100) + parseInt(year);
    next();
}

app.use(raw);

app.get('/inputs', (req, res) => {
    return res.json({
        model : req.query.model,
        year : req.query.year
    });
});

app.get('/results', (req, res) => {
    const totalSum = req.totalSum;
    return res.json({
       car_value : req.totalSum
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


