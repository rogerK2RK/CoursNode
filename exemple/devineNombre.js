const readline = require("readline");

// Création de l'interface de lecture en console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Nombre mystère aléatoire entre 1 et 100
const nombreMystere = Math.floor(Math.random() * 100) + 1;
let tentativesRestantes = 10;

console.log("=== Jeu du nombre mystère ===");
console.log("Devinez un nombre entre 1 et 100.");
console.log(`Vous avez ${tentativesRestantes} tentatives.\n`);

function demanderNombre() {
  rl.question(`Tentative ${11 - tentativesRestantes} : Quel est votre choix ? `, (reponse) => {
    const nombre = parseInt(reponse, 10);

    // Vérification de la saisie
    if (isNaN(nombre) || nombre < 1 || nombre > 100) {
      console.log(" Entrez un nombre valide entre 1 et 100.\n");
      return demanderNombre(); // Ne compte pas comme tentative
    }

    // Comparaison avec le nombre mystère
    if (nombre < nombreMystere) {
      console.log("C'est plus grand.\n");
    } else if (nombre > nombreMystere) {
      console.log("C'est plus petit.\n");
    } else {
      console.log(` Bravo ! Vous avez trouvé le nombre mystère : ${nombreMystere}`);
      rl.close();
      return;
    }

    // Mise à jour du nombre de tentatives
    tentativesRestantes--;

    if (tentativesRestantes > 0) {
      demanderNombre();
    } else {
      console.log(` Vous avez perdu ! Le nombre mystère était ${nombreMystere}.`);
      rl.close();
    }
  });
}

demanderNombre();
// Fin du jeu