const PASSWORD_CORRETTA = "3883"; // La tua password

const palette = [
    "#8fb3ff", "#97ed97", "#ff9b9b", "#f0e68c", "#dda0dd", 
    "#87ceeb", "#ffb347", "#b19cd9", "#98fb98", "#ff6961",
    "#77dd77", "#aec6cf", "#cfcfc4", "#f49ac2", "#cb99c9",
    "#ffb7ce", "#ca9bf7", "#92a1cf", "#83e5c4", "#fdfd96"
];

let dati = JSON.parse(localStorage.getItem('dash_data')) || [];
let selectedColor = palette[0];
let isEditMode = false;

window.onload = () => {
    // Carica la palette colori
    const paletteDiv = document.getElementById('palette');
    palette.forEach(color => {
        const dot = document.createElement('div');
        dot.className = 'color-dot';
        dot.style.background = color;
        dot.onclick = () => {
            document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            selectedColor = color;
        };
        paletteDiv.appendChild(dot);
    });

    // Controllo se già loggato
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
    }
};

function login() {
    const input = document.getElementById('password-input').value;
    if (input === PASSWORD_CORRETTA) {
        localStorage.setItem('isLoggedIn', 'true');
        showDashboard();
    } else {
        alert("Password sbagliata!");
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    location.reload();
}

function showDashboard() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('dashboard-content').style.display = 'block';
    renderLinks();
}

function toggleEditMode() {
    isEditMode = !isEditMode;
    document.getElementById('edit-panel').style.display = isEditMode ? 'grid' : 'none';
    renderLinks();
}

function addCategory() {
    const name = document.getElementById('cat-name').value;
    if (!name) return;
    dati.push({ id: Date.now(), name: name, color: selectedColor, links: [] });
    document.getElementById('cat-name').value = "";
    save();
}

function addLink() {
    const name = document.getElementById('link-name').value;
    const url = document.getElementById('link-url').value;
    const catId = document.getElementById('link-cat-select').value;
    if (!name || !url || !catId) return;
    
    const cat = dati.find(c => c.id == catId);
    cat.links.push({ id: Date.now(), name, url });
    
    document.getElementById('link-name').value = "";
    document.getElementById('link-url').value = "";
    save();
}

function deleteCategory(id) {
    if (confirm("Eliminare categoria?")) {
        dati = dati.filter(c => c.id !== id);
        save();
    }
}

function deleteLink(catId, linkId) {
    const cat = dati.find(c => c.id == catId);
    cat.links = cat.links.filter(l => l.id !== linkId);
    save();
}

function save() {
    localStorage.setItem('dash_data', JSON.stringify(dati));
    renderLinks();
}

function renderLinks() {
    const container = document.getElementById('links-container');
    const select = document.getElementById('link-cat-select');
    container.innerHTML = "";
    select.innerHTML = '<option value="">Scegli categoria...</option>';

    dati.forEach(cat => {
        select.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;

        let html = `
            <div class="category">
                <span class="category-title" style="border-color: ${cat.color}">${cat.name} 
                ${isEditMode ? `<button onclick="deleteCategory(${cat.id})" style="color:red; background:none; border:none; cursor:pointer;">[X]</button>` : ''}
                </span>
                <div class="grid">`;
        
        cat.links.forEach(l => {
            html += `
                <div style="position:relative">
                    <a href="${l.url}" target="_blank" class="link-card" style="--accent-color: ${cat.color}">${l.name}</a>
                    ${isEditMode ? `<button class="del-btn" onclick="deleteLink(${cat.id}, ${l.id})">×</button>` : ''}
                </div>`;
        });
        
        html += `</div></div>`;
        container.innerHTML += html;
    });
}