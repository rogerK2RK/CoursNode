// utils.js
require("dotenv").config();

const coups = process.env.COUPS
  ? process.env.COUPS.split(",").map(c => c.trim())
  : ["pierre", "feuille", "ciseaux"];

function getRandomMove() {
  return coups[Math.floor(Math.random() * coups.length)];
}

function determineWinner(j1, j2) {
  if (j1 === j2) return 0;

  const règles = {
    pierre: ["ciseaux"],
    feuille: ["pierre"],
    ciseaux: ["feuille"],
  };

  return règles[j1]?.includes(j2) ? 1 : 2;
}

// ✅ Export des fonctions
module.exports = {
  coups,
  getRandomMove,
  determineWinner,
};
