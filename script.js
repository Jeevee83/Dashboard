const PASSWORD_CORRETTA = "laTuaPassword"; // Cambiala!

// Qui gestisci tutto: Categorie, Link e Colori
const MIEI_LINK = [
    {
        categoria: "Lavoro",
        colore: "#3b82f6", // Blu
        links: [
            { nome: "GitHub", url: "https://github.com" },
            { nome: "ChatGPT", url: "https://chat.openai.com" },
            { nome: "Outlook", url: "https://outlook.live.com" }
        ]
    },
    {
        categoria: "Grafica",
        colore: "#a855f7", // Viola
        links: [
            { nome: "Canva", url: "https://canva.com" },
            { nome: "Pinterest", url: "https://pinterest.com" }
        ]
    },
    {
        categoria: "Soldi",
        colore: "#22c55e", // Verde
        links: [
            { nome: "Home Banking", url: "https://..." },
            { nome: "PayPal", url: "https://paypal.com" }
        ]
    }
];

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

document.getElementById("password-input").addEventListener("keyup", (e) => {
    if (e.key === "Enter") checkPassword();
});

function renderLinks() {
    const container = document.getElementById("links-container");
    container.innerHTML = ""; // Pulisce il contenitore

    MIEI_LINK.forEach(cat => {
        let html = `
            <div class="category">
                <h2 style="border-left-color: ${cat.colore}">${cat.categoria}</h2>
                <div class="grid">`;
        
        cat.links.forEach(l => {
            // Applichiamo il colore della categoria al bordo o all'hover tramite variabile CSS inline
            html += `
                <a href="${l.url}" target="_blank" class="link-card" style="--accent: ${cat.colore}">
                    ${l.nome}
                </a>`;
        });
        
        html += `</div></div>`;
        container.innerHTML += html;
    });
}