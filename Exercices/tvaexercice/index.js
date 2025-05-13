const { addPricesTTC } = require('./utils');

// Tableau de prix HT
const priceHT = [
    { name : "Apple", priceHT : 1.0, priceTTC : null },
    { name : "Orange", priceHT : 1.2, priceTTC : null },
    { name : "Rasberry", priceHT : 2.5, priceTTC : null },
];

const updatedPrices = addPricesTTC(priceHT);

console.log("Tableau avec Prix TTC :");
console.table(updatedPrices);