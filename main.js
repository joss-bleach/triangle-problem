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

        // Working Out The Triangle
        // First Product Name = Product 1, check origin year, if origin is dev then return incremental value, if origin is different to dev return prev value plus incremental value
        const firstProduct = inputRows[0].product;
        var i;
        var currentAmt = 0;
        var productArray = [];

        for (i = 0; i < inputRows.length; i++) {
            let productName = inputRows[i].product;
            if (productName == firstProduct) {
                if(productArray[0] != productName){
                    productArray.push(productName);
                }
                if (inputRows[i].originyear == inputRows[i].developmentyear) {
                    currentAmt = currentAmt + parseInt(inputRows[i].incrementalvalue);
                    productArray.push(parseInt(inputRows[i].incrementalvalue));
                } else {
                    currentAmt = currentAmt + parseInt(inputRows[i].incrementalvalue);
                    productArray.push(currentAmt);
                }
            } else {

            }
        }

        //FINAL TO WRITE TO CSV
        var arrayToList = productArray.toString() + "\r\n";
        fs.writeFileSync('output.csv', originYear + "," + devYearNo + "\r\n" + arrayToList);
    });
