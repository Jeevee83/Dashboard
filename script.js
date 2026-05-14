const PASSWORD_CORRETTA = "3883"; // CAMBIALA

// 20 Colori Tenui (Pastello)
const palette = [
    "#8fb3ff", "#97ed97", "#ff9b9b", "#f0e68c", "#dda0dd", 
    "#87ceeb", "#ffb347", "#b19cd9", "#98fb98", "#ff6961",
    "#77dd77", "#aec6cf", "#cfcfc4", "#f49ac2", "#cb99c9",
    "#ffb7ce", "#ca9bf7", "#92a1cf", "#83e5c4", "#fdfd96"
];

let dati = JSON.parse(localStorage.getItem('my_links_data')) || [];
let selectedColor = palette[0];
let isEditMode = false;

// Inizializzazione
window.onload = () => {
    if (localStorage.getItem('logged_in') === 'true') {
        mostraDashboard();
    }
    renderPalette();
};

function login() {
    const psw = document.getElementById('password-input').value;
    if (psw === PASSWORD_CORRETTA) {
        localStorage.setItem('logged_in', 'true');
        mostraDashboard();
    } else {
        alert("Password Errata");
    }
}

function logout() {
    localStorage.removeItem('logged_in');
    location.reload();
}

function mostraDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    renderDashboard();
}

function renderPalette() {
    const container = document.getElementById('palette');
    palette.forEach(color => {
        const dot = document.createElement('div');
        dot.className = 'color-dot';
        dot.style.background = color;
        dot.onclick = () => {
            document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            selectedColor = color;
        };
        container.appendChild(dot);
    });
}

function toggleEditMode() {
    isEditMode = !isEditMode;
    document.body.classList.toggle('body-edit-mode');
    document.getElementById('toggle-edit').style.opacity = isEditMode ? "1" : "0.3";
    renderDashboard();
}

// AZIONI
function addCategory() {
    const nome = document.getElementById('cat-name').value;
    if (!nome) return;
    dati.push({ id: Date.now(), nome: nome, colore: selectedColor, links: [] });
    document.getElementById('cat-name').value = "";
    salvaERicarica();
}

function addLink() {
    const nome = document.getElementById('link-name').value;
    const url = document.getElementById('link-url').value;
    const catId = document.getElementById('link-cat-select').value;
    if (!nome || !url || !catId) return;
    
    const cat = dati.find(c => c.id == catId);
    cat.links.push({ id: Date.now(), nome, url });
    
    document.getElementById('link-name').value = "";
    document.getElementById('link-url').value = "";
    salvaERicarica();
}

function deleteCategory(id) {
    if (confirm("Eliminare categoria e tutti i link?")) {
        dati = dati.filter(c => c.id !== id);
        salvaERicarica();
    }
}

function deleteLink(catId, linkId) {
    const cat = dati.find(c => c.id == catId);
    cat.links = cat.links.filter(l => l.id !== linkId);
    salvaERicarica();
}

function salvaERicarica() {
    localStorage.setItem('my_links_data', JSON.stringify(dati));
    renderDashboard();
}

function renderDashboard() {
    const container = document.getElementById('links-container');
    const select = document.getElementById('link-cat-select');
    container.innerHTML = "";
    select.innerHTML = '<option value="">Scegli Categoria...</option>';

    dati.forEach(cat => {
        // Aggiungi alla select dell'editor
        select.innerHTML += `<option value="${cat.id}">${cat.nome}</option>`;

        // Crea HTML Categoria
        let catHtml = `
            <div class="category">
                <div class="category-header">
                    <span class="category-title" style="border-color: ${cat.colore}">${cat.nome}</span>
                    ${isEditMode ? `<button onclick="deleteCategory(${cat.id})" style="background:none; border:none; color:red; cursor:pointer; font-size:10px; margin-left:10px;">ELIMINA</button>` : ''}
                </div>
                <div class="grid">
        `;

        cat.links.forEach(link => {
            catHtml += `
                <div style="position:relative;">
                    <a href="${link.url}" target="_blank" class="link-card" style="--accent-color: ${cat.colore}">${link.nome}</a>
                    ${isEditMode ? `<button class="del-btn" onclick="deleteLink(${cat.id}, ${link.id})">×</button>` : ''}
                </div>
            `;
        });

        catHtml += `</div></div>`;
        container.innerHTML += catHtml;
    });
}