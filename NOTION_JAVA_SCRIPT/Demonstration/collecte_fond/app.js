let currentUser = null;
let editingCollecteId = null;

// --- Génération de sel aléatoire ---
function generateSalt(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let salt = '';
  for (let i = 0; i < length; i++) {
    salt += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return salt;
}

// --- Hash avec SHA-256 et sel ---
async function hashPasswordWithSalt(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- Sauvegarde notifications ---
function saveUserNotifications() {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  users = users.map(u => u.id === currentUser.id ? currentUser : u);
  localStorage.setItem('users', JSON.stringify(users));
}

// --- Effacer formulaire ---
function clearForm() {
  document.getElementById('collecte-title').value = '';
  document.getElementById('collecte-objectif').value = '';
  document.getElementById('collecte-deadline').value = '';
  document.getElementById('collecte-desc').value = '';
}

// --- Mettre à jour barre progression ---
function updateProgress(c) {
  document.getElementById('progress').style.width = Math.min(100, (c.total_collecte / c.objectif) * 100) + '%';
}

// --- Charger participants ---
function loadParticipants(c) {
  const list = document.getElementById('participants-list');
  list.innerHTML = '';
  c.participants.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nom} (${p.email}) → ${p.montant} €`;
    list.appendChild(li);
  });
}

// --- Charger notifications ---
function loadNotifications() {
  const list = document.getElementById('notifications-list');
  list.innerHTML = '';
  if (!currentUser || !currentUser.notifications) return;
  currentUser.notifications.forEach(n => {
    const li = document.createElement('li');
    li.textContent = `[${n.date}] ${n.message}`;
    list.appendChild(li);
  });
}

// --- Authentification ---
function attachAuthEvents() {
  document.getElementById('show-login').onclick = () => {
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
  };
  document.getElementById('show-register').onclick = () => {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
  };

  // --- Inscription ---
  document.getElementById('register-btn').onclick = async () => {
    const nom = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-pass').value;
    if (!nom || !email || !password) return alert("Tous les champs sont requis");

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) return alert("Email déjà utilisé");

    const salt = generateSalt();
    const hashed = await hashPasswordWithSalt(password, salt);

    users.push({ id: Date.now(), nom, email, password: hashed, salt, notifications: [] });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Inscription réussie !");
  };

  // --- Connexion standard (pas de collecte partagée) ---
  document.getElementById('login-btn').onclick = async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-pass').value;

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    if (!user) return alert("Email ou mot de passe incorrect");

    const hashed = await hashPasswordWithSalt(password, user.salt);
    if (hashed !== user.password) return alert("Email ou mot de passe incorrect");

    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    const urlParams = new URLSearchParams(window.location.search);
    const collecteId = urlParams.get('collecte');
    if (collecteId) openCollecte(Number(collecteId));
    else showDashboard();
  };
}

// --- Dashboard ---
function showDashboard() {
  document.getElementById('auth-container').classList.add('hidden');
  document.getElementById('dashboard-container').classList.remove('hidden');
  loadCollectes();
}

// --- Créer / Modifier collecte ---
document.getElementById('create-btn').onclick = () => {
  const titre = document.getElementById('collecte-title').value;
  const objectif = parseFloat(document.getElementById('collecte-objectif').value);
  const deadline = document.getElementById('collecte-deadline').value;
  const desc = document.getElementById('collecte-desc').value;
  if (!titre || !objectif || !deadline) return alert("Champs obligatoires");

  let collectes = JSON.parse(localStorage.getItem('collectes') || '[]');
  if (editingCollecteId) {
    collectes = collectes.map(c => c.id === editingCollecteId ? { ...c, titre, objectif, date_limite: deadline, description: desc } : c);
    editingCollecteId = null;
    document.getElementById('create-btn').innerText = 'Créer';
  } else {
    collectes.push({ id: Date.now(), userId: currentUser.id, titre, objectif, date_limite: deadline, description: desc, participants: [], total_collecte: 0 });
  }
  localStorage.setItem('collectes', JSON.stringify(collectes));
  clearForm();
  loadCollectes();
};

// --- Charger collectes dynamiquement ---
function loadCollectes() {
  const collectesList = document.getElementById('collectes-list');
  collectesList.innerHTML = '';
  const collectes = JSON.parse(localStorage.getItem('collectes') || '[]').filter(c => c.userId === currentUser.id);

  collectes.forEach(c => {
    const div = document.createElement('div');
    div.className = 'collecte-item new';
    setTimeout(() => div.classList.remove('new'), 500);

    const h3 = document.createElement('h3'); h3.textContent = c.titre;
    const pDesc = document.createElement('p'); pDesc.textContent = c.description;
    const pTotal = document.createElement('p'); pTotal.textContent = `Total: ${c.total_collecte} / ${c.objectif} €`;
    const pDeadline = document.createElement('p'); pDeadline.textContent = `Date limite: ${new Date(c.date_limite).toLocaleString()}`;

    const btnView = document.createElement('button'); btnView.className = 'btn-view'; btnView.textContent = 'Voir / Participer'; btnView.onclick = () => openCollecte(c.id);
    const btnEdit = document.createElement('button'); btnEdit.className = 'btn-edit'; btnEdit.textContent = 'Modifier'; btnEdit.onclick = () => editCollecte(c.id);
    const btnDelete = document.createElement('button'); btnDelete.className = 'btn-delete'; btnDelete.textContent = 'Supprimer'; btnDelete.onclick = () => deleteCollecte(c.id);
    const btnShare = document.createElement('button'); btnShare.className = 'btn-share'; btnShare.textContent = 'Partager'; btnShare.onclick = () => shareCollecte(c.id);

    div.append(h3, pDesc, pTotal, pDeadline, btnView, btnEdit, btnDelete, btnShare);
    collectesList.appendChild(div);
  });
}

// --- Supprimer / Modifier / Partager ---
function deleteCollecte(id) { 
  let collectes = JSON.parse(localStorage.getItem('collectes') || '[]');
  collectes = collectes.filter(c => c.id !== id);
  localStorage.setItem('collectes', JSON.stringify(collectes));
  loadCollectes();
}

function editCollecte(id) {
  let collectes = JSON.parse(localStorage.getItem('collectes') || '[]');
  const c = collectes.find(col => col.id === id);
  if (!c) return;
  document.getElementById('collecte-title').value = c.titre;
  document.getElementById('collecte-objectif').value = c.objectif;
  document.getElementById('collecte-deadline').value = c.date_limite;
  document.getElementById('collecte-desc').value = c.description;
  editingCollecteId = id;
  document.getElementById('create-btn').innerText = 'Sauvegarder';
}

function shareCollecte(id) {
  const url = `${window.location.origin}${window.location.pathname}?collecte=${id}`;
  navigator.clipboard.writeText(url).then(()=>alert("Lien copié !")).catch(()=>alert("Copiez manuellement : " + url));
}

// --- Ouvrir collecte ---
function openCollecte(id) {
  const collecte = JSON.parse(localStorage.getItem('collectes') || '[]').find(c => c.id === id);
  if (!collecte) return;

  document.getElementById('dashboard-container').classList.add('hidden');
  document.getElementById('auth-container').classList.add('hidden');
  document.getElementById('collecte-page').classList.remove('hidden');

  document.getElementById('collecte-title-display').textContent = collecte.titre;
  document.getElementById('collecte-desc-display').textContent = collecte.description;
  document.getElementById('collecte-objectif-display').textContent = collecte.objectif;
  document.getElementById('collecte-total-display').textContent = collecte.total_collecte;
  document.getElementById('collecte-deadline-display').textContent = new Date(collecte.date_limite).toLocaleString();

  updateProgress(collecte);
  loadParticipants(collecte);
  loadNotifications();

  document.getElementById('contrib-btn').onclick = () => {
    const montant = parseFloat(document.getElementById('contrib-montant').value);
    if (!montant || montant <= 0) return alert("Montant invalide");
    collecte.participants.push({ userId: currentUser.id, nom: currentUser.nom, email: currentUser.email, montant });
    collecte.total_collecte += montant;
    let collectes = JSON.parse(localStorage.getItem('collectes') || '[]');
    collectes = collectes.map(c => c.id === collecte.id ? collecte : c);
    localStorage.setItem('collectes', JSON.stringify(collectes));

    // Animation highlight
    const totalDisplay = document.getElementById('collecte-total-display');
    totalDisplay.textContent = collecte.total_collecte;
    totalDisplay.classList.add('highlight');
    setTimeout(() => totalDisplay.classList.remove('highlight'), 1000);

    updateProgress(collecte);
    loadParticipants(collecte);
    loadNotifications();
    alert("Contribution enregistrée !");
  };

  document.getElementById('back-dashboard').onclick = () => {
    document.getElementById('collecte-page').classList.add('hidden');
    document.getElementById('dashboard-container').classList.remove('hidden');
    loadCollectes();
  };
}

// --- Déconnexion ---
document.getElementById('logout-btn').onclick = () => {
  currentUser = null;
  localStorage.removeItem('currentUser');
  document.getElementById('dashboard-container').classList.add('hidden');
  document.getElementById('auth-container').classList.remove('hidden');
};

// --- Rappels automatiques toutes les 12h ---
setInterval(() => {
  if (!currentUser) return;
  const collectes = JSON.parse(localStorage.getItem('collectes') || '[]');
  const now = new Date();
  collectes.forEach(c => {
    const deadline = new Date(c.date_limite);
    const diff = deadline - now;
    if (c.userId === currentUser.id && diff > 0 && diff <= 12 * 60 * 60 * 1000)
      currentUser.notifications.push({ id: Date.now(), message: `Rappel : La collecte "${c.titre}" se termine bientôt !`, date: now.toLocaleString() });
  });
  saveUserNotifications();
  loadNotifications();
}, 43200000);

// --- Initialisation au chargement ---
window.onload = () => {
  attachAuthEvents();

  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  if (storedUser) currentUser = storedUser;

  const urlParams = new URLSearchParams(window.location.search);
  const collecteId = urlParams.get('collecte');

  if (collecteId) {
    if (!currentUser) {
      // Afficher formulaire login si pas connecté
      document.getElementById('auth-container').classList.remove('hidden');
      document.getElementById('login-btn').onclick = async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-pass').value;

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email);
        if (!user) return alert("Email ou mot de passe incorrect");

        const hashed = await hashPasswordWithSalt(password, user.salt);
        if (hashed !== user.password) return alert("Email ou mot de passe incorrect");

        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        openCollecte(Number(collecteId));
      };
    } else {
      openCollecte(Number(collecteId));
    }
  } else if (currentUser) {
    showDashboard();
  }
};
