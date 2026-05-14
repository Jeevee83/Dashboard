const PASSWORD_CORRETTA = "3883"; // CAMBIAMI

// 20 Colori Tenui (Muted Colors)
const palette = [
    "#778899", "#9370DB", "#20B2AA", "#F08080", "#FFB6C1", 
    "#87CEFA", "#77DD77", "#FFD700", "#FF7F50", "#B0C4DE",
    "#D8BFD8", "#AFEEEE", "#E6E6FA", "#FFDAB9", "#98FB98",
    "#BC8F8F", "#4682B4", "#DDA0DD", "#F4A460", "#66CDAA"
];

let dati = JSON.parse(localStorage.getItem('dashboard_data')) || [
    { categoria: "Lavoro", colore: "#778899", links: [{ nome: "GitHub", url: "https://github.com" }] }
];

let selectedColor = palette[0];
let editMode = false;

// CONTROLLO LOGIN
window.onload = () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
    }
    renderPalette();
};

function checkPassword() {
    const psw = document.getElementById("password-input").value;
    if (psw === PASSWORD_CORRETTA) {
        localStorage.setItem('isLoggedIn', 'true');
        showDashboard();
    } else { alert("Errata!"); }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    location.reload();
}

function showDashboard() {
    document.getElementById("login-overlay").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    renderLinks();
}

// GESTIONE COLORI
function renderPalette() {
    const cp = document.getElementById("color-palette");
    palette.forEach(c => {
        const dot = document.createElement("div");
        dot.className = "color-dot";
        dot.style.background = c;
        dot.onclick = () => {
            document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
            dot.classList.add("active");
            selectedColor = c;
        };
        cp.appendChild(dot);
    });
}

// RENDER DASHBOARD
function renderLinks() {
    const container = document.getElementById("links-container");
    const selectCat = document.getElementById("select-cat");
    container.innerHTML = "";
    selectCat.innerHTML = "";

    dati.forEach((cat, cIdx) => {
        // Popola select nell'editor
        selectCat.innerHTML += `<option value="${cIdx}">${cat.categoria}</option>`;

        let html = `
            <div class="category ${editMode ? 'edit-mode' : ''}">
                <h2 style="border-color: ${cat.colore}">${cat.categoria} 
                    ${editMode ? `<button onclick="deleteCategory(${cIdx})" style="background:none; border:none; color:red; cursor:pointer; margin-left:10px;">[Elimina]</button>` : ''}
                </h2>
                <div class="grid">`;
        
        cat.links.forEach((l, lIdx) => {
            html += `
                <div style="position:relative">
                    <a href="${l.url}" target="_blank" class="link-card" style="--accent: ${cat.colore}">${l.nome}</a>
                    ${editMode ? `<button class="delete-btn" onclick="deleteLink(${cIdx}, ${lIdx})">×</button>` : ''}
                </div>`;
        });
        
        html += `</div></div>`;
        container.innerHTML += html;
    });
}

// FUNZIONI AGGIUNTA
function toggleEditMode() {
    editMode = !editMode;
    document.getElementById("editor-panel").classList.toggle("hidden");
    renderLinks();
}

function addCategory() {
    const nome = document.getElementById("new-cat-name").value;
    if (nome) {
        dati.push({ categoria: nome, colore: selectedColor, links: [] });
        saveAndRefresh();
    }
}

function addLink() {
    const nome = document.getElementById("new-link-name").value;
    const url = document.getElementById("new-link-url").value;
    const cIdx = document.getElementById("select-cat").value;
    if (nome && url) {
        dati[cIdx].links.push({ nome, url });
        saveAndRefresh();
    }
}

function deleteLink(cIdx, lIdx) {
    dati[cIdx].links.splice(lIdx, 1);
    saveAndRefresh();
}

function deleteCategory(cIdx) {
    if(confirm("Eliminare intera categoria?")) {
        dati.splice(cIdx, 1);
        saveAndRefresh();
    }
}

function saveAndRefresh() {
    localStorage.setItem('dashboard_data', JSON.stringify(dati));
    renderLinks();
}