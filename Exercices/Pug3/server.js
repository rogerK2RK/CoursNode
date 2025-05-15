const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // pour le CSS ou JS

// View engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Menu dynamique
const menuItems = [
  { path: '/', title: 'Home' },
  { path: '/about-me', title: 'About' },
  { path: '/references', title: 'References' },
  { path: '/contact-me', title: 'Contact' },
];

// Page d'accueil
app.get("/", (req, res) => {
  const showToast = req.query.sent === "true";
  res.render("index", {
    menuItems: menuItems.map(item => ({
      ...item,
      isActive: item.path === "/"
    })),
    showToast
  });
});

// Page contact
app.get("/contact-me", (req, res) => {
  res.render("contact", {
    menuItems: menuItems.map(item => ({
      ...item,
      isActive: item.path === "/contact-me"
    }))
  });
});

// Traitement formulaire contact
app.post("/contact", (req, res) => {
  const { email, message } = req.body;

  const contactEntry = {
    email,
    message,
    date: new Date().toISOString()
  };

  const filePath = path.join(__dirname, "contacts.json");

  let existing = [];
  if (fs.existsSync(filePath)) {
    existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  existing.push(contactEntry);

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  // Redirection vers la page d’accueil avec un paramètre de confirmation
  res.redirect("/?sent=true");
});

app.listen(PORT, () =>
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`)
);