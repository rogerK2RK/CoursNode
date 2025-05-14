// server.js

const http = require("http");
const { shuffleArray } = require("./src/utils");
const data = require("./data");

let users = [...data]; 

// Fonction pour générer une page HTML avec une liste
function generateHTML(title, items) {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
    </head>
    <body>
        <h1>${title}</h1>
        <ul>
            ${items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <a href="/shuffle"> Mélanger</a>
    </body>
    </html>
  `;
}

// Créer le serveur
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Page d'accueil avec la liste actuelle
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(generateHTML("Liste des utilisateurs", users));
  } else if (req.url === "/shuffle") {
    // Mélange les utilisateurs et redirige vers /
    users = shuffleArray(users);
    res.writeHead(302, { Location: "/" });
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Démarrer le serveur
const PORT = 3000;
server.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});
