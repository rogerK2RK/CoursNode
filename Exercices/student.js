const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "Data", "student.txt");

// 1. Lecture asynchrone
fs.readFile(filePath, "utf8", (err, dataAsync) => {
  if (err) {
    console.error("Erreur lecture asynchrone :", err);
  } else {
    console.log("Lecture asynchrone réussie.\n");
  }
});

// 1 (bis). Lecture synchrone
let rawData;
try {
  rawData = fs.readFileSync(filePath, "utf8");
} catch (err) {
  console.error("Erreur lecture synchrone :", err);
  process.exit(1);
}

// Parse JSON
let parsedStudents;
try {
  parsedStudents = JSON.parse(rawData);
} catch (err) {
  console.error("Erreur parsing JSON :", err);
  process.exit(1);
}

// 4. Construction du tableau students avec moyennes
const students = parsedStudents.map((s) => {
  const moyenne =
    s.notes.reduce((acc, note) => acc + note, 0) / s.notes.length;
  return {
    name: s.name,
    note: moyenne,
    address: s.address,
  };
});

// 2. Étudiants avec note > 17
const meilleurs = students.filter((s) => s.note > 17);
console.log(" Étudiants avec moyenne > 17 :");
console.log(meilleurs);

// 3. Étudiant avec la meilleure moyenne
const meilleurEtudiant = students.reduce((max, s) =>
  s.note > max.note ? s : max
);
console.log("\n Meilleur étudiant :");
console.log(meilleurEtudiant);

// 5. Tri décroissant par moyenne
students.sort((a, b) => b.note - a.note);

console.log("\n Étudiants triés par moyenne décroissante :");
console.log(students);
