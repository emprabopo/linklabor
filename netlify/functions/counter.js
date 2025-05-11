const fs = require("fs");
const file = "/tmp/counter.json";

// Die Umleitungsliste
const links = [
    "https://www.soscisurvey.de/labegp/",
    "https://www.soscisurvey.de/labkgpp/",
    "https://www.soscisurvey.de/labkgnpp/",
    "https://www.soscisurvey.de/labpegp/",
    "https://www.soscisurvey.de/labpknpp/",
    "https://www.soscisurvey.de/labpkpp/"
];

exports.handler = async function () {
    let count = 0;

    // Versuche, den aktuellen Zählerstand zu laden
    if (fs.existsSync(file)) {
        count = JSON.parse(fs.readFileSync(file, "utf8")).count || 0;
    }

    // Bestimme den nächsten Link
    const nextLink = links[count % links.length];

    // Erhöhe den Zähler und speichere ihn
    fs.writeFileSync(file, JSON.stringify({ count: count + 1 }));

    return {
        statusCode: 302,
        headers: {
            Location: nextLink
        },
        body: "Redirecting..."
    };
};
