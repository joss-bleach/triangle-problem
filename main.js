const csv = require("csv-parser");
const fs = require("fs");

const input = "input.csv";
const inputData = [];

fs.createReadStream(input)
  .pipe(
    csv({
      mapHeaders: ({ header }) =>
        header
          // Remove whitespace from header names / lower case
          .toLowerCase()
          .replace(/\s/g, "")
    })
  )
  .on("data", data => inputData.push(data))
  .on("end", () => {
    // Get the origin year - remove whitespace
    let originYear = inputData[0].originyear.trim(" ");

    // Number of development years
    function countUnique(iterable) {
      return new Set(iterable).size;
    }
    let developmentYears = [];
    inputData.forEach(element => {
      developmentYears.push(element.developmentyear);
    });
    const developmentYearCount = countUnique(developmentYears);

    // Get name of first product
    let firstProduct = inputData[0].product;

    // Loop through input data
    var i;
    var outputArray = [];
    var accumAmount;

    for (i = 0; i < inputData.length; i++) {
      // Get the name of the current product
      let currentProduct = inputData[i].product;
      // Check if the current product is the same as the first product
      if (currentProduct == firstProduct) {
        // Check whether this product is in the output array
        formatProduct = "\n " + currentProduct;
        if (!outputArray.includes(formatProduct)) {
          outputArray.push(formatProduct);
        }
        if (inputData[i].originyear == inputData[i].developmentyear) {
          accumAmount = parseFloat(inputData[i].incrementalvalue);
          outputArray.push(parseFloat(inputData[i].incrementalvalue));
        } else if (inputData[i].originyear != inputData[i].developmentyear) {
          accumAmount = accumAmount + parseFloat(inputData[i].incrementalvalue);
          outputArray.push(accumAmount);
        }
      } else if (currentProduct != firstProduct) {
        formatProduct = "\n " + currentProduct;
        if (!outputArray.includes(formatProduct)) {
          outputArray.push(formatProduct);
        }
        if (inputData[i].originyear == inputData[i].developmentyear) {
          accumAmount = parseFloat(inputData[i].incrementalvalue);
          outputArray.push(parseFloat(inputData[i].incrementalvalue));
        } else if (inputData[i].originyear != inputData[i].developmentyear) {
          accumAmount = accumAmount + parseFloat(inputData[i].incrementalvalue);
          outputArray.push(accumAmount);
        }
      }
    }

    // Format the array as a string
    var arrayToList = outputArray.toString() + "\r\n";

    // Format the output for the CSV
    var output = originYear + ", " + developmentYearCount + arrayToList;

    // Write to output file
    fs.writeFileSync("outputs/output.csv", output);
  });
