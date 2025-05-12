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

  showNames();