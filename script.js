// CONFIGURAZIONE
const PASSWORD_CORRETTA = "miaPassword123"; // Cambiala qui!

const MIEI_LINK = [
    {
        categoria: "Lavoro",
        links: [
            { nome: "GitHub", url: "https://github.com" },
            { nome: "ChatGPT", url: "https://chat.openai.com" },
            { nome: "Outlook", url: "https://outlook.live.com" }
        ]
    },
    {
        categoria: "Social & Svago",
        links: [
            { nome: "YouTube", url: "https://youtube.com" },
            { nome: "Reddit", url: "https://reddit.com" }
        ]
    }
    // Aggiungi quante categorie vuoi...
];

// FUNZIONE PER CONTROLLARE LA PASSWORD
function checkPassword() {
    const input = document.getElementById("password-input").value;
    if (input === PASSWORD_CORRETTA) {
        document.getElementById("login-overlay").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        renderLinks();
    } else {
        alert("Password errata!");
    }
}

// Supporto tasto Invio per il login
document.getElementById("password-input").addEventListener("keyup", function(event) {
    if (event.key === "Enter") { checkPassword(); }
});

// FUNZIONE PER GENERARE I BOTTONI
function renderLinks() {
    const container = document.getElementById("links-container");
    MIEI_LINK.forEach(cat => {
        let html = `<div class="category"><h2>${cat.categoria}</h2><div class="grid">`;
        cat.links.forEach(l => {
            html += `<a href="${l.url}" target="_blank" class="link-card">${l.nome}</a>`;
        });
        html += `</div></div>`;
        container.innerHTML += html;
    });
}