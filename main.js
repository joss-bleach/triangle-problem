const csv = require('csv-parser');
const fs = require('fs');

const input = 'input.csv';
const inputRows = [];

fs.createReadStream(input)
    .pipe(csv({
        mapHeaders: ({ header }) => 
            header
                .toLowerCase()
                .replace(/\s/g, "")
    }))
    .on('data', (data) => inputRows.push(data))
    .on('end', () => {
        // Success
        console.log("Success");
        // inputRows array
        console.log(inputRows);
        // Product Name
        const originYear = inputRows[0].originyear;
        console.log(originYear);
        //Get Count of Years
        inputRows.forEach(element => {
            console.log(element.developmentyear);
        })
    });
