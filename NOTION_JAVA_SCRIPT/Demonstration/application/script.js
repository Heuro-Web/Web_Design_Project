// Variables globales
let currentQuote = {
    services: [],
    client: {},
    settings: {}
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Application initialisée');
    
    // Initialiser les composants
    initTabs();
    initProfile();
    initServices();
    initQuote();
    initHistory();
    initSettings();
    
    // Charger les données
    loadProfile();
    loadServices();
    loadQuoteHistory();
    generateQuoteNumber();
    updateProfileScore();
    updateQuoteCalculations();
    updateHistoryStats();
});

// === GESTION DES ONGLETS ===
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            showTab(targetTab);
        });
    });
}

function showTab(tabName) {
    // Masquer tous les contenus
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Désactiver tous les onglets
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Activer l'onglet et le contenu sélectionnés
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// === GESTION DU PROFIL ===
function initProfile() {
    const saveBtn = document.getElementById('saveProfileBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveProfile);
    }
    
    // Écouter les changements pour mettre à jour le score
    const profileFields = ['companyName', 'email', 'phone', 'address', 'website', 'siret', 'vat', 'paymentTerms'];
    profileFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', updateProfileScore);
        }
    });
}

function saveProfile() {
    const profile = {
        companyName: document.getElementById('companyName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value,
        address: document.getElementById('address').value,
        siret: document.getElementById('siret').value,
        vat: document.getElementById('vat').value,
        paymentTerms: document.getElementById('paymentTerms').value
    };
    
    localStorage.setItem('freelanceProfile', JSON.stringify(profile));
    updateProfileScore();
    showNotification('✅ Profil sauvegardé avec succès !', 'success');
}

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('freelanceProfile') || '{}');
    
    Object.keys(profile).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.value = profile[key] || '';
        }
    });
}

function updateProfileScore() {
    const profile = JSON.parse(localStorage.getItem('freelanceProfile') || '{}');
    const requiredFields = ['companyName', 'email', 'phone', 'address'];
    const optionalFields = ['website', 'siret', 'vat', 'paymentTerms'];
    
    let score = 0;
    let suggestions = [];
    
    // Champs obligatoires (60% du score)
    requiredFields.forEach(field => {
        if (profile[field] && profile[field].trim()) {
            score += 15;
        } else {
            suggestions.push(`Ajoutez votre ${getFieldLabel(field)}`);
        }
    });
    
    // Champs optionnels (40% du score)
    optionalFields.forEach(field => {
        if (profile[field] && profile[field].trim()) {
            score += 10;
        }
    });
    
    // Suggestions spécifiques
    if (!profile.siret) suggestions.push('Ajoutez votre SIRET pour plus de crédibilité');
    if (!profile.paymentTerms) suggestions.push('Définissez vos conditions de paiement');
    if (!profile.website) suggestions.push('Ajoutez votre site web');
    
    const finalScore = Math.min(100, score);
    document.getElementById('profileScore').textContent = finalScore + '%';
    
    const suggestionsList = document.getElementById('profileSuggestionsList');
    if (suggestions.length > 0) {
        suggestionsList.innerHTML = suggestions.slice(0, 3).map(s => `<li>${s}</li>`).join('');
    } else {
        suggestionsList.innerHTML = '<li>Profil complet ! 🎉</li>';
    }
}

function getFieldLabel(field) {
    const labels = {
        companyName: 'nom/raison sociale',
        email: 'email',
        phone: 'téléphone',
        address: 'adresse',
        website: 'site web',
        siret: 'SIRET',
        vat: 'numéro de TVA',
        paymentTerms: 'conditions de paiement'
    };
    return labels[field] || field;
}

// === GESTION DES SERVICES ===
function initServices() {
    const addBtn = document.getElementById('addServiceBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addService);
    }
    
    // Templates
    const templateBtns = document.querySelectorAll('[data-template]');
    templateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const template = this.getAttribute('data-template');
            addTemplate(template);
        });
    });
}

function addService() {
    const name = document.getElementById('serviceName').value.trim();
    const description = document.getElementById('serviceDescription').value.trim();
    const price = parseFloat(document.getElementById('servicePrice').value);
    const unit = document.getElementById('serviceUnit').value;
    
    if (!name || !price || price <= 0) {
        showNotification('⚠️ Veuillez remplir le nom et un prix valide', 'error');
        return;
    }
    
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const service = {
        id: Date.now(),
        name,
        description,
        price,
        unit,
        createdAt: new Date().toISOString()
    };
    
    services.push(service);
    localStorage.setItem('services', JSON.stringify(services));
    
    // Réinitialiser le formulaire
    document.getElementById('serviceName').value = '';
    document.getElementById('serviceDescription').value = '';
    document.getElementById('servicePrice').value = '';
    document.getElementById('serviceUnit').value = 'projet';
    
    displayServices();
    showNotification('✅ Service ajouté avec succès !', 'success');
}

function addTemplate(type) {
    const templates = {
        web: [
            { name: 'Site vitrine', description: 'Site web responsive 5 pages', price: 1500, unit: 'projet' },
            { name: 'E-commerce', description: 'Boutique en ligne complète', price: 3000, unit: 'projet' },
            { name: 'Développement', description: 'Développement sur mesure', price: 60, unit: 'heure' }
        ],
        design: [
            { name: 'Logo', description: 'Création de logo professionnel', price: 300, unit: 'projet' },
            { name: 'Charte graphique', description: 'Identité visuelle complète', price: 800, unit: 'projet' },
            { name: 'Design web', description: 'Maquette de site web', price: 50, unit: 'heure' }
        ],
        consulting: [
            { name: 'Audit', description: 'Audit technique ou marketing', price: 500, unit: 'projet' },
            { name: 'Conseil', description: 'Conseil stratégique', price: 80, unit: 'heure' },
            { name: 'Formation', description: 'Formation personnalisée', price: 400, unit: 'jour' }
        ],
        writing: [
            { name: 'Article de blog', description: 'Rédaction d\'article optimisé SEO', price: 50, unit: 'article' },
            { name: 'Page web', description: 'Rédaction de page de site', price: 100, unit: 'page' },
            { name: 'Rédaction', description: 'Rédaction sur mesure', price: 40, unit: 'heure' }
        ]
    };
    
    if (!templates[type]) return;
    
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    templates[type].forEach(template => {
        services.push({
            id: Date.now() + Math.random(),
            ...template,
            createdAt: new Date().toISOString()
        });
    });
    
    localStorage.setItem('services', JSON.stringify(services));
    displayServices();
    showNotification(`✅ ${templates[type].length} services ajoutés !`, 'success');
}

function loadServices() {
    displayServices();
}

function displayServices() {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const container = document.getElementById('servicesList');
    
    if (services.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucun service configuré. Ajoutez votre premier service ci-dessus.</p>';
        return;
    }
    
    container.innerHTML = services.map(service => `
        <div class="service-item">
            <div class="service-info">
                <h4>${service.name}</h4>
                <p>${service.description}</p>
                <span class="service-price">${service.price.toFixed(2)}€ / ${service.unit}</span>
            </div>
            <div class="service-actions">
                <button class="btn btn-danger btn-small" onclick="deleteService(${service.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function deleteService(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
        const services = JSON.parse(localStorage.getItem('services') || '[]');
        const filteredServices = services.filter(service => service.id !== id);
        localStorage.setItem('services', JSON.stringify(filteredServices));
        displayServices();
        showNotification('Service supprimé', 'success');
    }
}

// === GESTION DES DEVIS ===
function initQuote() {
    const addServicesBtn = document.getElementById('addServicesBtn');
    if (addServicesBtn) {
        addServicesBtn.addEventListener('click', showServiceSelector);
    }
    
    const generateBtn = document.getElementById('generateQuoteBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateQuote);
    }
    
    const saveBtn = document.getElementById('saveQuoteBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveQuote);
    }
    
    // Écouter les changements pour recalculer
    const calcFields = ['discount', 'taxRate'];
    calcFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', updateQuoteCalculations);
        }
    });
    
    // Modal
    initModal();
}

function initModal() {
    const modal = document.getElementById('serviceModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelModal');
    const confirmBtn = document.getElementById('confirmModal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeServiceModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeServiceModal);
    }
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', addSelectedServices);
    }
    
    // Fermer en cliquant à l'extérieur
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeServiceModal();
            }
        });
    }
}

function generateQuoteNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const time = String(date.getHours()).padStart(2, '0') + String(date.getMinutes()).padStart(2, '0');
    
    const quoteNumberField = document.getElementById('quoteNumber');
    if (quoteNumberField) {
        quoteNumberField.value = `DEV-${year}${month}${day}-${time}`;
    }
}

function showServiceSelector() {
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    
    if (services.length === 0) {
        showNotification('⚠️ Aucun service configuré. Ajoutez des services dans l\'onglet Services.', 'error');
        return;
    }
    
    const modal = document.getElementById('serviceModal');
    const list = document.getElementById('serviceModalList');
    
    list.innerHTML = services.map(service => `
        <div class="service-checkbox">
            <input type="checkbox" value="${service.id}" id="service-${service.id}">
            <div class="service-checkbox-info">
                <strong>${service.name}</strong>
                <small>${service.description}</small>
            </div>
            <div class="service-checkbox-price">${service.price.toFixed(2)}€ / ${service.unit}</div>
        </div>
    `).join('');
    
    modal.style.display = 'block';
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function addSelectedServices() {
    const checkboxes = document.querySelectorAll('#serviceModalList input[type="checkbox"]:checked');
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    
    checkboxes.forEach(checkbox => {
        const serviceId = parseInt(checkbox.value);
        const service = services.find(s => s.id === serviceId);
        
        if (service && !currentQuote.services.find(s => s.id === serviceId)) {
            currentQuote.services.push({
                ...service,
                quantity: 1
            });
        }
    });
    
    displaySelectedServices();
    updateQuoteCalculations();
    closeServiceModal();
    
    if (checkboxes.length > 0) {
        showNotification(`${checkboxes.length} service(s) ajouté(s)`, 'success');
    }
}

function displaySelectedServices() {
    const container = document.getElementById('selectedServices');
    
    if (currentQuote.services.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucun service sélectionné</p>';
        return;
    }
    
    container.innerHTML = currentQuote.services.map((service, index) => `
        <div class="quote-item">
            <div>
                <strong>${service.name}</strong><br>
                <small>${service.description}</small><br>
                <span style="color: #28a745;">${service.price.toFixed(2)}€ / ${service.unit}</span>
            </div>
            <div class="quote-controls">
                <input type="number" value="${service.quantity}" min="0.1" step="0.1" 
                       onchange="updateServiceQuantity(${index}, this.value)">
                <button class="btn btn-danger btn-small" onclick="removeService(${index})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function updateServiceQuantity(index, quantity) {
    const qty = parseFloat(quantity);
    if (qty > 0) {
        currentQuote.services[index].quantity = qty;
        updateQuoteCalculations();
    }
}

function removeService(index) {
    currentQuote.services.splice(index, 1);
    displaySelectedServices();
    updateQuoteCalculations();
}

function updateQuoteCalculations() {
    const subtotal = currentQuote.services.reduce((sum, service) => 
        sum + (service.price * service.quantity), 0);
    
    const discountRate = parseFloat(document.getElementById('discount')?.value || 0);
    const taxRate = parseFloat(document.getElementById('taxRate')?.value || 0);
    
    const discountAmount = subtotal * (discountRate / 100);
    const subtotalAfterDiscount = subtotal - discountAmount;
    const taxAmount = subtotalAfterDiscount * (taxRate / 100);
    const total = subtotalAfterDiscount + taxAmount;
    
    // Mettre à jour l'affichage
    const elements = {
        subtotalAmount: subtotal,
        discountAmount: discountAmount,
        taxAmount: taxAmount,
        totalAmount: total
    };
    
    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id].toFixed(2) + '€';
        }
    });
}

function generateQuote() {
    if (currentQuote.services.length === 0) {
        showNotification('⚠️ Veuillez ajouter au moins un service au devis', 'error');
        return;
    }
    
    const clientName = document.getElementById('clientName').value.trim();
    if (!clientName) {
        showNotification('⚠️ Veuillez renseigner le nom du client', 'error');
        return;
    }
    
    const profile = JSON.parse(localStorage.getItem('freelanceProfile') || '{}');
    const quoteNumber = document.getElementById('quoteNumber').value;
    const validityDays = parseInt(document.getElementById('validityDays').value);
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + validityDays);
    
    const subtotal = currentQuote.services.reduce((sum, service) => 
        sum + (service.price * service.quantity), 0);
    const discountRate = parseFloat(document.getElementById('discount').value) || 0;
    const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
    const discountAmount = subtotal * (discountRate / 100);
    const subtotalAfterDiscount = subtotal - discountAmount;
    const taxAmount = subtotalAfterDiscount * (taxRate / 100);
    const total = subtotalAfterDiscount + taxAmount;
    
    const quoteHTML = `
        <div class="quote-header">
            <h2>DEVIS</h2>
            <p>N° ${quoteNumber}</p>
            <p>Date: ${new Date().toLocaleDateString('fr-FR')}</p>
            <p>Valable jusqu'au: ${validUntil.toLocaleDateString('fr-FR')}</p>
        </div>
        
        <div class="quote-details">
            <div>
                <h4>De:</h4>
                <p><strong>${profile.companyName || 'Nom non renseigné'}</strong></p>
                <p>${profile.address || 'Adresse non renseignée'}</p>
                <p>Email: ${profile.email || 'Non renseigné'}</p>
                <p>Tél: ${profile.phone || 'Non renseigné'}</p>
                ${profile.siret ? `<p>SIRET: ${profile.siret}</p>` : ''}
                ${profile.vat ? `<p>TVA: ${profile.vat}</p>` : ''}
            </div>
            <div>
                <h4>À:</h4>
                <p><strong>${document.getElementById('clientName').value}</strong></p>
                <p>${document.getElementById('clientEmail').value}</p>
                <p>${document.getElementById('clientAddress').value}</p>
            </div>
        </div>
        
        <table class="quote-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${currentQuote.services.map(service => `
                    <tr>
                        <td>
                            <strong>${service.name}</strong><br>
                            <small>${service.description}</small>
                        </td>
                        <td>${service.quantity} ${service.unit}${service.quantity > 1 ? 's' : ''}</td>
                        <td>${service.price.toFixed(2)}€</td>
                        <td>${(service.price * service.quantity).toFixed(2)}€</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <div class="quote-total">
            <p>Sous-total: ${subtotal.toFixed(2)}€</p>
            ${discountRate > 0 ? `<p>Remise (${discountRate}%): -${discountAmount.toFixed(2)}€</p>` : ''}
            <p>Total HT: ${subtotalAfterDiscount.toFixed(2)}€</p>
            ${taxRate > 0 ? `<p>TVA (${taxRate}%): ${taxAmount.toFixed(2)}€</p>` : ''}
            <p style="font-size: 24px; color: #28a745;"><strong>Total TTC: ${total.toFixed(2)}€</strong></p>
        </div>
        
        ${profile.paymentTerms ? `
            <div style="margin-top: 30px;">
                <h4>Conditions de paiement:</h4>
                <p>${profile.paymentTerms}</p>
            </div>
        ` : ''}
        
        <div style="margin-top: 30px; text-align: center;">
            <button class="btn btn-primary" onclick="window.print()">🖨️ Imprimer / Sauvegarder PDF</button>
            <button class="btn btn-secondary" onclick="closeQuotePreview()">Fermer</button>
        </div>
    `;
    
    const preview = document.getElementById('quotePreview');
    if (preview) {
        preview.innerHTML = quoteHTML;
        preview.style.display = 'block';
        preview.scrollIntoView({ behavior: 'smooth' });
    }
}

function closeQuotePreview() {
    const preview = document.getElementById('quotePreview');
    if (preview) {
        preview.style.display = 'none';
    }
}

function saveQuote() {
    if (currentQuote.services.length === 0) {
        showNotification('⚠️ Veuillez ajouter au moins un service au devis', 'error');
        return;
    }
    
    const clientName = document.getElementById('clientName').value.trim();
    if (!clientName) {
        showNotification('⚠️ Veuillez renseigner le nom du client', 'error');
        return;
    }
    
    const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    const subtotal = currentQuote.services.reduce((sum, service) => 
        sum + (service.price * service.quantity), 0);
    const discountRate = parseFloat(document.getElementById('discount').value) || 0;
    const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
    const discountAmount = subtotal * (discountRate / 100);
    const subtotalAfterDiscount = subtotal - discountAmount;
    const taxAmount = subtotalAfterDiscount * (taxRate / 100);
    const total = subtotalAfterDiscount + taxAmount;
    
    const quote = {
        id: Date.now(),
        number: document.getElementById('quoteNumber').value,
        client: {
            name: clientName,
            email: document.getElementById('clientEmail').value,
            address: document.getElementById('clientAddress').value
        },
        services: [...currentQuote.services],
        amounts: {
            subtotal,
            discount: discountAmount,
            tax: taxAmount,
            total
        },
        settings: {
            discountRate,
            taxRate,
            validityDays: parseInt(document.getElementById('validityDays').value)
        },
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    quotes.push(quote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    
    // Réinitialiser le formulaire
    resetQuoteForm();
    updateHistoryStats();
    
    showNotification('✅ Devis sauvegardé avec succès !', 'success');
}

function resetQuoteForm() {
    currentQuote.services = [];
    document.getElementById('clientName').value = '';
    document.getElementById('clientEmail').value = '';
    document.getElementById('clientAddress').value = '';
    document.getElementById('discount').value = '0';
    generateQuoteNumber();
    displaySelectedServices();
    updateQuoteCalculations();
    closeQuotePreview();
}

// === GESTION DE L'HISTORIQUE ===
function initHistory() {
    // Pas d'événements spécifiques à initialiser
}

function loadQuoteHistory() {
    displayQuoteHistory();
    updateHistoryStats();
}

function displayQuoteHistory() {
    const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    const container = document.getElementById('quoteHistory');
    
    if (quotes.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucun devis créé pour le moment</p>';
        return;
    }
    
    // Trier par date (plus récent en premier)
    const sortedQuotes = quotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    container.innerHTML = sortedQuotes.map(quote => `
        <div class="history-item">
            <div>
                <strong>${quote.number}</strong> - ${quote.client.name}<br>
                <small>${new Date(quote.createdAt).toLocaleDateString('fr-FR')}</small><br>
                <strong style="color: #28a745;">${quote.amounts.total.toFixed(2)}€</strong>
            </div>
            <div>
                <span class="status-badge status-${quote.status}">
                    ${getStatusLabel(quote.status)}
                </span>
                <button class="btn btn-secondary btn-small" onclick="changeQuoteStatus(${quote.id})">
                    📝
                </button>
                <button class="btn btn-danger btn-small" onclick="deleteQuote(${quote.id})">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

function getStatusLabel(status) {
    const labels = {
        pending: 'En attente',
        accepted: 'Accepté',
        rejected: 'Refusé'
    };
    return labels[status] || status;
}

function changeQuoteStatus(id) {
    const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    const quote = quotes.find(q => q.id === id);
    
    if (!quote) return;
    
    const newStatus = prompt('Nouveau statut:\n- pending (En attente)\n- accepted (Accepté)\n- rejected (Refusé)', quote.status);
    if (newStatus && ['pending', 'accepted', 'rejected'].includes(newStatus)) {
        quote.status = newStatus;
        localStorage.setItem('quotes', JSON.stringify(quotes));
        displayQuoteHistory();
        updateHistoryStats();
        showNotification('Statut mis à jour', 'success');
    }
}

function deleteQuote(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce devis ?')) {
        const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
        const filteredQuotes = quotes.filter(quote => quote.id !== id);
        localStorage.setItem('quotes', JSON.stringify(filteredQuotes));
        displayQuoteHistory();
        updateHistoryStats();
        showNotification('Devis supprimé', 'success');
    }
}

function updateHistoryStats() {
    const quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    
    const totalQuotes = quotes.length;
    const acceptedQuotes = quotes.filter(q => q.status === 'accepted').length;
    const totalRevenue = quotes.filter(q => q.status === 'accepted')
        .reduce((sum, q) => sum + q.amounts.total, 0);
    const conversionRate = totalQuotes > 0 ? (acceptedQuotes / totalQuotes * 100) : 0;
    
    const stats = {
        totalQuotes: totalQuotes,
        acceptedQuotes: acceptedQuotes,
        totalRevenue: totalRevenue.toFixed(2) + '€',
        conversionRate: conversionRate.toFixed(1) + '%'
    };
    
    Object.keys(stats).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = stats[id];
        }
    });
}

// === GESTION DES PARAMÈTRES ===
function initSettings() {
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const clearBtn = document.getElementById('clearBtn');
    const importFile = document.getElementById('importFile');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportData);
    }
    
    if (importBtn) {
        importBtn.addEventListener('click', () => importFile.click());
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllData);
    }
    
    if (importFile) {
        importFile.addEventListener('change', handleImport);
    }
}

function exportData() {
    const data = {
        profile: JSON.parse(localStorage.getItem('freelanceProfile') || '{}'),
        services: JSON.parse(localStorage.getItem('services') || '[]'),
        quotes: JSON.parse(localStorage.getItem('quotes') || '[]'),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devis-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Données exportées', 'success');
}

function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (confirm('⚠️ Cette action remplacera toutes vos données actuelles. Continuer ?')) {
                if (data.profile) localStorage.setItem('freelanceProfile', JSON.stringify(data.profile));
                if (data.services) localStorage.setItem('services', JSON.stringify(data.services));
                if (data.quotes) localStorage.setItem('quotes', JSON.stringify(data.quotes));
                
                // Recharger l'interface
                loadProfile();
                displayServices();
                displayQuoteHistory();
                updateHistoryStats();
                updateProfileScore();
                
                showNotification('✅ Données importées avec succès !', 'success');
            }
        } catch (error) {
            showNotification('❌ Erreur lors de l\'importation du fichier', 'error');
        }
    };
    reader.readAsText(file);
    
    // Reset input
    e.target.value = '';
}

function clearAllData() {
    if (confirm('⚠️ Êtes-vous sûr de vouloir effacer toutes les données ? Cette action est irréversible.')) {
        if (confirm('🚨 DERNIÈRE CONFIRMATION: Toutes vos données seront perdues !')) {
            localStorage.clear();
            location.reload();
        }
    }
}

// === UTILITAIRES ===
function showNotification(message, type = 'info') {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles inline pour la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '600',
        zIndex: '9999',
        maxWidth: '300px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Couleurs selon le type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#667eea'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Rendre certaines fonctions globales pour les onclick
window.deleteService = deleteService;
window.updateServiceQuantity = updateServiceQuantity;
window.removeService = removeService;
window.changeQuoteStatus = changeQuoteStatus;
window.deleteQuote = deleteQuote;
window.closeQuotePreview = closeQuotePreview;