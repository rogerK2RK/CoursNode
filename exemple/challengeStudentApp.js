const fs = require("fs");
const path = require("path");
const readline = require("readline");

// 🔁 Point important : fichier dans le dossier 'Data'
const filePath = path.join(__dirname, "Data", "student.json");

// Charger les données depuis le JSON
function loadStudents() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(data);

    return parsed.map((student) => {
      const moyenne =
        student.notes.reduce((acc, val) => acc + val, 0) / student.notes.length;

      return {
        ...student,
        average: Number(moyenne.toFixed(2)),
      };
    });
  } catch (error) {
    console.error(" Erreur de lecture ou parsing :", error.message);
    return [];
  }
}

const students = loadStudents();

// 1. Afficher tous les noms
function showNames() {
    console.log("\n Liste des élèves :");
    students.forEach((s, i) => console.log(`${i + 1}. ${s.name}`));
  }

//   showNames();

// 2. Rechercher un élève par nom
function searchByName(name) {
    const found = students.find(
      (s) => s.name.toLowerCase() === name.toLowerCase()
    );
    if (found) {
      console.log("\n Élève trouvé :");
      console.log(found);
    } else {
      console.warn("⚠️ Aucun élève trouvé avec ce nom.");
    }
}

// searchByName("AHMED AMIRI");

// 3. Filtrer les élèves avec une note moyenne > valeur
function filterByMinNote(minNote) {
    const filtered = students.filter((s) => s.average > minNote);
    if (filtered.length === 0) {
        console.log(` Aucun élève avec une moyenne > ${minNote}`);
    } else {
        console.log(`\n Élèves avec une moyenne > ${minNote} :`);
        filtered.forEach((s) =>
        console.log(`${s.name} - Moyenne : ${s.average}`)
        );
    }
}

// filterByMinNote(17);

// Interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function showMenu() {
    console.log(`\n=== MENU ÉTUDIANTS ===
  1. Afficher tous les noms
  2. Rechercher un élève par nom
  3. Filtrer par moyenne minimale
  4. Quitter\n`);
  
    rl.question("Votre choix : ", (choix) => {
      switch (choix.trim()) {
        case "1":
          showNames();
          return showMenu();
  
        case "2":
          rl.question("Entrez le nom de l'élève : ", (nom) => {
            searchByName(nom);
            return showMenu();
          });
          break;
  
        case "3":
          rl.question("Entrez la note minimale : ", (note) => {
            const min = parseFloat(note);
            if (isNaN(min)) {
              console.error(" Entrez un nombre valide.");
              return showMenu();
            }
            filterByMinNote(min);
            return showMenu();
          });
          break;
  
        case "4":
          console.log(" Fin du programme.");
          rl.close();
          break;
  
        default:
          console.warn(" Choix invalide.");
          return showMenu();
      }
    });
}
  
showMenu();