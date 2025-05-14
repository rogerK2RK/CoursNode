const http = require("http");
const url = require("url");
const { readUsers, writeUsers } = require("./src/utils");

const PORT = 3000;

function renderHome(res) {
  const users = readUsers();
  const list = users
    .map(
      (u, i) => `<li><a href="/user?id=${i}">${u.nom} (${u.role})</a></li>`
    )
    .join("");
  const html = `
    <h1>Liste des utilisateurs</h1>
    <ul>${list}</ul>
    <a href="/form">➕ Ajouter un utilisateur</a>
  `;
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

function renderUser(res, id) {
  const users = readUsers();
  const user = users[id];
  if (!user) {
    res.writeHead(404);
    return res.end("Utilisateur non trouvé");
  }

  const html = `
    <h1>Détail de l'utilisateur</h1>
    <p><strong>Nom :</strong> ${user.nom}</p>
    <p><strong>Email :</strong> ${user.email}</p>
    <p><strong>Rôle :</strong> ${user.role}</p>
    <a href="/">⬅ Retour</a>
  `;
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

function renderForm(res) {
  const html = `
    <h1>Ajouter un utilisateur</h1>
    <form method="POST" action="/form">
      <label>Nom : <input name="nom" required /></label><br />
      <label>Email : <input name="email" type="email" required /></label><br />
      <button>Ajouter</button>
    </form>
    <a href="/">⬅ Retour</a>
  `;
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
}

function handleFormPost(req, res) {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const params = new URLSearchParams(body);
    const nom = params.get("nom");
    const email = params.get("email");

    if (!nom || !email) {
      res.writeHead(400);
      return res.end("Champs manquants");
    }

    const users = readUsers();
    users.push({ nom, email, role: "utilisateur" });
    writeUsers(users);

    // Redirection vers la page d’accueil
    res.writeHead(302, { Location: "/" });
    res.end();
  });
}

// Serveur
const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const { pathname, query } = parsed;

  if (req.method === "GET") {
    if (pathname === "/") return renderHome(res);
    if (pathname === "/form") return renderForm(res);
    if (pathname === "/user" && query.id !== undefined)
      return renderUser(res, query.id);
  }

  if (req.method === "POST" && pathname === "/form") {
    return handleFormPost(req, res);
  }

  // 404
  res.writeHead(404);
  res.end("Page non trouvée");
});

server.listen(PORT, () =>
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`)
);
