// Chargement des variables d'environnement
require("dotenv").config();

// Import des modules nécessaires
const readline = require("readline");
const { coups, getRandomMove, determineWinner } = require("./utils");

// Initialisation de l'interface readline pour les entrées console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Récupération des noms et paramètres depuis le fichier .env
const joueur1 = process.env.JOUEUR1_NAME || "Joueur 1";
const joueur2 = process.env.JOUEUR2_NAME || "Joueur 2";
const totalRounds = parseInt(process.env.ROUNDS) || 3;

// Initialisation des scores
let score = {
  [joueur1]: 0,
  [joueur2]: 0,
};

// Fonction qui gère un round de jeu
function jouerRound() {
  const j1 = getRandomMove();
  const j2 = getRandomMove();

  console.log(`\n🧠 ${joueur1} joue : ${j1}`);
  console.log(`🤖 ${joueur2} joue : ${j2}`);

  // Déterminer le gagnant du round
  const result = determineWinner(j1, j2);
  if (result === 0) {
    console.log("⚖️ Égalité !");
  } else if (result === 1) {
    console.log(`✅ ${joueur1} gagne ce round !`);
    score[joueur1]++;
  } else {
    console.log(`✅ ${joueur2} gagne ce round !`);
    score[joueur2]++;
  }
}

// Affichage du score final et du vainqueur
function afficherScore() {
  console.log("\n📊 Score final :");
  console.log(`${joueur1} : ${score[joueur1]}`);
  console.log(`${joueur2} : ${score[joueur2]}`);

  if (score[joueur1] > score[joueur2]) {
    console.log(`🏆 Vainqueur : ${joueur1}`);
  } else if (score[joueur2] > score[joueur1]) {
    console.log(`🏆 Vainqueur : ${joueur2}`);
  } else {
    console.log("🤝 Match nul !");
  }
}

// Réinitialisation des scores pour une nouvelle partie
function resetScore() {
  score[joueur1] = 0;
  score[joueur2] = 0;
}

// Lancement du jeu avec le nombre de rounds indiqué
function jouerJeu(nbRounds = totalRounds) {
  console.log(`\n🎮 Début du Chifoumi - ${joueur1} vs ${joueur2}`);
  console.log(`🎯 Nombre de rounds : ${nbRounds}`);
  let round = 0;

  // Fonction récursive pour exécuter les rounds un à un
  function jouerEtSuivant() {
    if (round < nbRounds) {
      round++;
      console.log(`\n--- Round ${round} ---`);
      jouerRound();
      setTimeout(jouerEtSuivant, 1000); // délai pour rendre l'affichage plus lisible
    } else {
      afficherScore();
      // Proposer de rejouer
      rl.question("\n🔁 Rejouer ? (oui/non) : ", (reponse) => {
        if (reponse.trim().toLowerCase() === "oui") {
          resetScore();
          jouerJeu();
        } else {
          console.log("👋 Fin du jeu.");
          rl.close();
        }
      });
    }
  }

  jouerEtSuivant(); 
}

// Lancer le jeu
jouerJeu();
