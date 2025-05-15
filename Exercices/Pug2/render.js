const pug = require("pug");
const path = require("path");

const menuItems = [
  { path: '/', title: 'Home', isActive: true },
  { path: '/about-me', title: 'About', isActive: false },
  { path: '/references', title: 'References', isActive: false },
  { path: '/contact-me', title: 'Contact', isActive: false },
];

const html = pug.renderFile(path.join(__dirname, '/index.pug'), {
  pretty: true,
  menuItems,
});

console.log(html);
