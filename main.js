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
        //console.log("Success");
        // inputRows array
        //console.log(inputRows);
        //console.log(inputRows.length);
        // Product Name
        const originYear = inputRows[0].originyear;
        //console.log("Origin Year: " + originYear);
        //Get Count of Years
        function countUnique(iterable) {
            return new Set(iterable).size;
          }
          let devYears = [];
        inputRows.forEach(element => {
            //console.log(element.developmentyear);
            devYears.push(element.developmentyear);
        })
        const devYearNo = countUnique(devYears);
        //console.log(countUnique(devYears));

        //FINAL TO WRITE TO CSV
        console.log(originYear + ", " + devYearNo);
    });
