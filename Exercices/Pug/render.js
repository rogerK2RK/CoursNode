const fs = require("fs");
const path = require("path");

function renderFile(filePath, data) {
    const raw = fs.readFileSync(filePath, "utf8");

    let output = "";
    const lines = raw.split("\n");

    const context = {
        user: data.user,
    };

    let renderNextLine = null;
    let blockConsumed = false; // ✅ nouveau flag

    lines.forEach((line) => {
        line = line.trim();

        if (line.startsWith("if ")) {
            const condition = line.slice(3);
            const fn = new Function("user", `return ${condition}`);
            renderNextLine = fn(context.user);
            blockConsumed = false;
        } else if (line.startsWith("else")) {
        // ✅ si le bloc if a déjà été affiché, on ignore le else
        if (blockConsumed) {
            renderNextLine = false;
        } else {
            renderNextLine = !renderNextLine;
        }
        } else if (renderNextLine === true) {
            const [tag, ...content] = line.split(" ");
            output += `<${tag}>${content.join(" ")}</${tag}>\n`;
            renderNextLine = null;
            blockConsumed = true; // ✅ on indique que le bloc est traité
        }
    });

    return output;
}


// 🔁 Test avec user.isAdmin = true
const templatePath = path.join(__dirname, "template.pug");

const result1 = renderFile(templatePath, { user: { isAdmin: true } });
console.log("✅ Rendement avec isAdmin: true :\n", result1);

const result2 = renderFile(templatePath, { user: { isAdmin: false } });
console.log("❌ Rendement avec isAdmin: false :\n", result2);
