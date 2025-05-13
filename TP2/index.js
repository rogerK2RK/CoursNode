// Chifoumi/utils.js

const coups = ["Pierre", "Feuille", "Ciseaux"];

// Fonction pour générer un coup aléatoire
function getRandomCoup() {
  return coups[Math.floor(Math.random() * coups.length)];
}

// Fonction pour déterminer le gagnant d'un round
function determineWinner(ordinateur1, ordinateur2) {
  if (ordinateur1 === ordinateur2) {
    return "Égalité";
  } else if (
    (ordinateur1 === "Pierre" && ordinateur2 === "Ciseaux") ||
    (ordinateur1 === "Feuille" && ordinateur2 === "Pierre") ||
    (ordinateur1 === "Ciseaux" && ordinateur2 === "Feuille")
  ) {
    return "Ordinateur1";
  } else {
    return "Ordinateur2";
  }
}

// Exporter les fonctions
module.exports = {
  coups,
  getRandomCoup,
  determineWinner,
};