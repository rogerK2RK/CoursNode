

/** Function pour calculer le prix en TTC **/
function calculateTTC(priceHT, tauxTVA = 20) {
    const priceTTC = priceHT * (1 + tauxTVA / 100);
    return parseFloat(priceTTC.toFixed(2));
}

//Function pour ajouter les prix ttc dans un tableau
function addPricesTTC(products, tauxTVA=20) {
    return products.map((item) => ({
    ...item,
    priceTTC: calculateTTC(item.priceHT, tauxTVA),
  }));
}

module.exports = {
    calculateTTC,
    addPricesTTC
};