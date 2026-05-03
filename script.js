// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
}

// Profile Picture - Persists across sessions
let profilePicData = localStorage.getItem('profilePic');
if (profilePicData) {
    const preview = document.getElementById('profilePreview');
    preview.src = profilePicData;
    preview.style.display = 'block';
}

document.getElementById('profilePic').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('profilePreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
            // Save to localStorage
            localStorage.setItem('profilePic', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Phone number formatting
document.getElementById('contactPhone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    e.target.value = value;
});

// Enter key support
document.getElementById('favoriteInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addFavorite();
});
document.getElementById('habitInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addHabit();
});

// About Me - Thoughts
let thoughts = JSON.parse(localStorage.getItem('thoughts')) || [];
function saveThoughts() {
    const content = document.getElementById('thoughts').value.trim();
    if (content) {
        thoughts.unshift({
            id: Date.now(),
            content: content
        });
        localStorage.setItem('thoughts', JSON.stringify(thoughts));
        document.getElementById('thoughts').value = '';
        displayThoughts();
    }
}

function displayThoughts() {
    const container = document.getElementById('thoughtsDisplay');
    if (thoughts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">No thoughts yet. Share something about yourself! ✨</p>';
        return;
    }
    container.innerHTML = thoughts.map(thought => `
        <div class="entry-card">
            <p style="font-size: 1.1rem; line-height: 1.6;">"${thought.content}"</p>
            <br><br>
            <button class="delete-btn" onclick="deleteThought(${thought.id})">🗑️ Delete</button>
        </div>
    `).join('');
}

function deleteThought(id) {
    thoughts = thoughts.filter(t => t.id !== id);
    localStorage.setItem('thoughts', JSON.stringify(thoughts));
    displayThoughts();
}

function clearThoughts() {
    if (confirm('Are you sure you want to delete all thoughts?')) {
        thoughts = [];
        localStorage.setItem('thoughts', JSON.stringify(thoughts));
        displayThoughts();
    }
}

// Favorites & Habits
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let habits = JSON.parse(localStorage.getItem('habits')) || [];

function addFavorite() {
    const input = document.getElementById('favoriteInput');
    const value = input.value.trim();
    if (value) {
        favorites.unshift(value);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        input.value = '';
        displayFavorites();
    }
}

function addHabit() {
    const input = document.getElementById('habitInput');
    const value = input.value.trim();
    if (value) {
        habits.unshift(value);
        localStorage.setItem('habits', JSON.stringify(habits));
        input.value = '';
        displayHabits();
    }
}

function displayFavorites() {
    const container = document.getElementById('favoritesList');
    if (favorites.length === 0) {
        container.innerHTML = '<p style="color: #666; font-style: italic;">No favorites yet. Add some movies, books, or songs! 🎥📚🎶</p>';
        return;
    }
    container.innerHTML = favorites.map((fav, index) => 
        `<span class="tag">${fav} 
            <button style="background:none;border:none;color:white;font-size:1.2rem;cursor:pointer;padding:0;" onclick="removeFavorite(${index})">×</button>
        </span>`
    ).join('');
}

function displayHabits() {
    const container = document.getElementById('habitsList');
    if (habits.length === 0) {
        container.innerHTML = '<p style="color: #666; font-style: italic;">No habits yet. Add your daily routines! ✅</p>';
        return;
    }
    container.innerHTML = habits.map((habit, index) => 
        `<span class="tag">${habit} 
            <button style="background:none;border:none;color:white;font-size:1.2rem;cursor:pointer;padding:0;" onclick="removeHabit(${index})">×</button>
        </span>`
    ).join('');
}

function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

function removeHabit(index) {
    habits.splice(index, 1);
    localStorage.setItem('habits', JSON.stringify(habits));
    displayHabits();
}

function clearFavorites() {
    if (confirm('Clear all favorites?')) {
        favorites = [];
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    }
}

function clearHabits() {
    if (confirm('Clear all habits?')) {
        habits = [];
        localStorage.setItem('habits', JSON.stringify(habits));
        displayHabits();
    }
}

// Diary Entries
let entries = JSON.parse(localStorage.getItem('entries')) || [];

function addEntry() {
    const title = document.getElementById('entryTitle').value.trim();
    const content = document.getElementById('entryContent').value.trim();
    const imageFile = document.getElementById('entryImage').files[0];
    
    if (title || content) {
        const entry = {
            id: Date.now(),
            title: title || 'Untitled',
            content: content,
            image: null
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                entry.image = e.target.result;
                entries.unshift(entry);
                localStorage.setItem('entries', JSON.stringify(entries));
                resetEntryForm();
                displayEntries();
            };
            reader.readAsDataURL(imageFile);
        } else {
            entries.unshift(entry);
            localStorage.setItem('entries', JSON.stringify(entries));
            resetEntryForm();
            displayEntries();
        }
    } else {
        alert('Please add a title or content!');
    }
}

function resetEntryForm() {
    document.getElementById('entryTitle').value = '';
    document.getElementById('entryContent').value = '';
    document.getElementById('entryImage').value = '';
}

function displayEntries() {
    const container = document.getElementById('entriesContainer');
    if (entries.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; font-size: 1.2rem;">No diary entries yet. Start writing! 📖</p>';
        return;
    }
    container.innerHTML = entries.map(entry => `
        <div class="entry-card">
            ${entry.image ? `<img src="${entry.image}" alt="Diary entry photo">` : ''}
            <h3>${entry.title}</h3>
            <p style="line-height: 1.6;">${entry.content}</p>
            <br><br>
            <button class="delete-btn" onclick="deleteEntry(${entry.id})">🗑️ Delete Entry</button>
        </div>
    `).join('');
}

function deleteEntry(id) {
    if (confirm('Delete this diary entry?')) {
        entries = entries.filter(e => e.id !== id);
        localStorage.setItem('entries', JSON.stringify(entries));
        displayEntries();
    }
}

// Gallery
let gallery = JSON.parse(localStorage.getItem('gallery')) || [];

function addGalleryImage() {
    const imageFile = document.getElementById('galleryImage').files[0];
    const desc = document.getElementById('imageDesc').value.trim();
    
    if (!imageFile) {
        alert('Please select an image first!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        gallery.unshift({
            id: Date.now(),
            image: e.target.result,
            description: desc || 'No description added'
        });
        
        try {
            localStorage.setItem('gallery', JSON.stringify(gallery));
            document.getElementById('galleryImage').value = '';
            document.getElementById('imageDesc').value = '';
            displayGallery();
            alert('✅ Photo added to gallery!');
        } catch (error) {
            alert('Storage limit reached. Please delete some photos.');
        }
    };
    reader.readAsDataURL(imageFile);
}

function displayGallery() {
    const container = document.getElementById('galleryContainer');
    if (gallery.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; font-size: 1.2rem; grid-column: 1/-1;">No photos yet. Add some memories! 📸</p>';
        return;
    }
    
    container.innerHTML = gallery.map(item => `
        <div class="gallery-item">
            <img src="${item.image}" alt="${item.description}" loading="lazy">
            <div class="gallery-desc">
                <p style="font-size: 0.95rem; margin-bottom: 0.5rem;">${item.description}</p>
                <br>
                <button class="delete-btn" onclick="deleteGalleryItem(${item.id})" style="width: 100%; margin-top: 0.5rem;">🗑️ Delete Photo</button>
            </div>
        </div>
    `).join('');
}

function deleteGalleryItem(id) {
    if (confirm('Delete this photo from gallery?')) {
        gallery = gallery.filter(item => item.id !== id);
        localStorage.setItem('gallery', JSON.stringify(gallery));
        displayGallery();
    }
}

// Contact
function saveContact() {
    const phoneNumber = document.getElementById('contactPhone').value.trim();
    const fullPhone = phoneNumber ? '+63 ' + phoneNumber : '';
    
    const contact = {
        email: document.getElementById('contactEmail').value.trim(),
        phone: fullPhone,
        social: document.getElementById('socialMedia').value.trim(),
        address: document.getElementById('address').value.trim()
    };
    
    localStorage.setItem('contact', JSON.stringify(contact));
    displayContact(contact);
    document.getElementById('clearContactBtn').style.display = 'inline-block';
    alert('✅ Contact info saved!');
}

function clearContact() {
    if (confirm('🗑️ Delete all contact information? This cannot be undone.')) {
        localStorage.removeItem('contact');
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactPhone').value = '';
        document.getElementById('socialMedia').value = '';
        document.getElementById('address').value = '';
        document.getElementById('contactDisplay').innerHTML = '<p style="color: #666; text-align: center;">No contact info saved yet. Add your details above! 📝</p>';
        document.getElementById('clearContactBtn').style.display = 'none';
    }
}

function displayContact(contact) {
    const container = document.getElementById('contactDisplay');
    let html = '<div class="contact-display">';
    html += '<h3>✅ Saved Contact Information </h3>';
    
    let hasData = false;
    
    if (contact.email) {
        html += `
            <div class="contact-item">
                <span><strong>📧 Email:</strong> ${contact.email}</span>
                <button class="delete-btn" onclick="removeContactField('email')" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;">Remove</button>
            </div>
        `;
        hasData = true;
    }
    
    if (contact.phone) {
        html += `
            <div class="contact-item">
                <span><strong>📱 Phone:</strong> ${contact.phone}</span>
                <button class="delete-btn" onclick="removeContactField('phone')" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;">Remove</button>
            </div>
        `;
        hasData = true;
    }
    
    if (contact.social) {
        html += `
            <div class="contact-item">
                <span><strong>🌐 Social:</strong> ${contact.social}</span>
                <button class="delete-btn" onclick="removeContactField('social')" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;">Remove</button>
            </div>
        `;
        hasData = true;
    }
    
    if (contact.address) {
        html += `
            <div class="contact-item">
                <span><strong>📍 Address:</strong> ${contact.address}</span>
                <button class="delete-btn" onclick="removeContactField('address')" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;">Remove</button>
            </div>
        `;
        hasData = true;
    }
    
    html += '</div>';
    
    if (!hasData) {
        html = '<p style="color: #666; text-align: center;">No contact info saved yet. Add your details above! 📝</p>';
        document.getElementById('clearContactBtn').style.display = 'none';
    }
    
    container.innerHTML = html;
}

function removeContactField(field) {
    const savedContact = JSON.parse(localStorage.getItem('contact')) || {};
    savedContact[field] = '';
    
    if (field === 'email') document.getElementById('contactEmail').value = '';
    if (field === 'phone') document.getElementById('contactPhone').value = '';
    if (field === 'social') document.getElementById('socialMedia').value = '';
    if (field === 'address') document.getElementById('address').value = '';
    
    localStorage.setItem('contact', JSON.stringify(savedContact));
    displayContact(savedContact);
}

// Initialize everything on page load
window.onload = function() {
    displayThoughts();
    displayFavorites();
    displayHabits();
    displayEntries();
    displayGallery();
    
    const savedContact = localStorage.getItem('contact');
    if (savedContact) {
        displayContact(JSON.parse(savedContact));
        document.getElementById('clearContactBtn').style.display = 'inline-block';
    }
};