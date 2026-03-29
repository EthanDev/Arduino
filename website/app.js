// ============================================================
// Luminous Playground - Shared Application Logic
// ============================================================

// --- State Management (localStorage) ---
const AppState = {
    get(key, fallback) {
        try {
            const val = localStorage.getItem('lp_' + key);
            return val !== null ? JSON.parse(val) : fallback;
        } catch { return fallback; }
    },
    set(key, value) {
        localStorage.setItem('lp_' + key, JSON.stringify(value));
    }
};

// --- Sparkle Management ---
function getSparkles() { return AppState.get('sparkles', 12); }
function addSparkles(n) {
    const total = getSparkles() + n;
    AppState.set('sparkles', total);
    updateSparkleDisplay(total);
    return total;
}
function updateSparkleDisplay(count) {
    const el = document.getElementById('sparkleCount');
    if (el) {
        el.textContent = count + ' Sparkles';
        el.classList.add('sparkle-anim');
        setTimeout(() => el.classList.remove('sparkle-anim'), 600);
    }
}

// --- User Name ---
function getUserName() { return AppState.get('userName', 'Alex'); }
function setUserName(name) {
    AppState.set('userName', name);
    document.querySelectorAll('#userName').forEach(el => el.textContent = name);
}

// --- Navigation ---
function navigateTo(page) {
    const pages = { stories: 'stories.html', emotions: 'emotions.html', games: 'games.html', home: 'index.html' };
    if (pages[page]) window.location.href = pages[page];
}

// --- Dark Mode ---
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;
    const isDark = AppState.get('darkMode', false);
    if (isDark) document.documentElement.classList.add('dark');
    toggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        AppState.set('darkMode', document.documentElement.classList.contains('dark'));
        const icon = toggle.querySelector('.material-symbols-outlined');
        icon.textContent = document.documentElement.classList.contains('dark') ? 'light_mode' : 'dark_mode';
    });
}

// --- Sound Toggle ---
function initSoundToggle() {
    const toggle = document.getElementById('soundToggle');
    if (!toggle) return;
    let soundOn = AppState.get('soundOn', true);
    const icon = toggle.querySelector('.material-symbols-outlined');
    icon.textContent = soundOn ? 'volume_up' : 'volume_off';
    toggle.addEventListener('click', () => {
        soundOn = !soundOn;
        AppState.set('soundOn', soundOn);
        icon.textContent = soundOn ? 'volume_up' : 'volume_off';
    });
}

// --- Profile Dropdown ---
function initProfile() {
    const btn = document.getElementById('profileBtn');
    const dropdown = document.getElementById('profileDropdown');
    const nameInput = document.getElementById('nameInput');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== btn) {
            dropdown.classList.add('hidden');
        }
    });
    if (nameInput) {
        nameInput.value = getUserName();
        nameInput.addEventListener('input', () => {
            const name = nameInput.value.trim() || 'Alex';
            setUserName(name);
        });
    }
}

// --- Collectible Modal ---
function initCollectibles() {
    const items = document.querySelectorAll('.collectible');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.dataset.name;
            const desc = item.dataset.desc;
            const icon = item.querySelector('.material-symbols-outlined');
            openModal(name, desc, icon ? icon.textContent : 'help', item.classList.contains('locked'));
        });
    });
}

function openModal(name, desc, iconText, isLocked) {
    const modal = document.getElementById('collectibleModal');
    const content = document.getElementById('modalContent');
    const iconEl = document.getElementById('modalIcon');
    const nameEl = document.getElementById('modalName');
    const descEl = document.getElementById('modalDesc');
    if (!modal) return;

    nameEl.textContent = name;
    descEl.textContent = desc;
    if (isLocked) {
        iconEl.className = 'w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-surface-container-highest';
        iconEl.innerHTML = '<span class="material-symbols-outlined text-outline-variant text-4xl">lock</span>';
    } else {
        iconEl.className = 'w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-primary-container/30';
        iconEl.innerHTML = `<span class="material-symbols-outlined text-primary text-4xl">${iconText}</span>`;
    }
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    });
}

function closeModal() {
    const modal = document.getElementById('collectibleModal');
    const content = document.getElementById('modalContent');
    if (!modal) return;
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// --- Gallery Modal ---
function initGallery() {
    const btn = document.getElementById('viewGalleryBtn');
    if (!btn) return;
    btn.addEventListener('click', openGallery);
}

function openGallery() {
    const modal = document.getElementById('galleryModal');
    const content = document.getElementById('galleryContent');
    const grid = document.getElementById('galleryGrid');
    if (!modal || !grid) return;

    const badges = [
        { icon: 'pets', name: 'Cosmic Pet', color: 'primary', unlocked: true },
        { icon: 'rocket_launch', name: 'Rocket Ship', color: 'secondary', unlocked: true },
        { icon: 'forest', name: 'Magic Forest', color: 'tertiary', unlocked: true },
        { icon: 'favorite', name: 'Heart Crystal', color: 'error', unlocked: true },
        { icon: 'auto_awesome', name: 'Star Dust', color: 'primary', unlocked: false },
        { icon: 'castle', name: 'Dream Castle', color: 'tertiary', unlocked: false },
    ];

    grid.innerHTML = badges.map(b => `
        <div class="flex flex-col items-center gap-2 p-4 rounded-xl ${b.unlocked ? 'bg-surface-container-low' : 'bg-surface-container-highest/50 opacity-50'}">
            <div class="w-16 h-16 rounded-full flex items-center justify-center ${b.unlocked ? 'bg-' + b.color + '-container/30' : 'bg-surface-container-highest'}">
                <span class="material-symbols-outlined text-${b.color} text-3xl">${b.unlocked ? b.icon : 'lock'}</span>
            </div>
            <span class="text-xs font-bold text-on-surface text-center">${b.unlocked ? b.name : '???'}</span>
        </div>
    `).join('');

    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    });
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    const content = document.getElementById('galleryContent');
    if (!modal) return;
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// --- Surprise Me! ---
function initSurprise() {
    const btn = document.getElementById('surpriseBtn');
    if (!btn) return;
    btn.addEventListener('click', showSurprise);
}

const surprises = [
    { emoji: '🌟', title: 'Story Time!', desc: 'A new chapter in The Starry Forest awaits you!', page: 'stories' },
    { emoji: '🎨', title: 'Art Break!', desc: 'Time to paint something beautiful in Color Splash!', page: 'games' },
    { emoji: '🧩', title: 'Brain Teaser!', desc: 'Can you solve the Memory Match puzzle?', page: 'games' },
    { emoji: '🌊', title: 'Ocean Adventure!', desc: 'Dive into Deep Sea Discovery right now!', page: 'stories' },
    { emoji: '😊', title: 'Feeling Check!', desc: 'Let\'s explore how you\'re feeling today!', page: 'emotions' },
    { emoji: '🔢', title: 'Number Fun!', desc: 'Let\'s count and have fun with numbers!', page: 'games' },
];

function showSurprise() {
    const surprise = surprises[Math.floor(Math.random() * surprises.length)];
    const modal = document.getElementById('surpriseModal');
    const content = document.getElementById('surpriseContent');
    if (!modal) return;

    document.getElementById('surpriseEmoji').textContent = surprise.emoji;
    document.getElementById('surpriseTitle').textContent = surprise.title;
    document.getElementById('surpriseDesc').textContent = surprise.desc;

    // Store for navigation on close
    modal.dataset.page = surprise.page;

    modal.classList.remove('hidden');
    launchConfetti();
    requestAnimationFrame(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    });
}

function closeSurprise() {
    const modal = document.getElementById('surpriseModal');
    const content = document.getElementById('surpriseContent');
    if (!modal) return;
    const page = modal.dataset.page;
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        if (page) navigateTo(page);
    }, 300);
}

// --- Confetti ---
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#69bdff', '#9eec69', '#f9d461', '#fb5151', '#a855f7', '#ec4899'];
    const particles = [];

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.2,
            drift: (Math.random() - 0.5) * 2,
        });
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach(p => {
            p.y += p.speed;
            p.x += p.drift;
            p.angle += p.spin;
            if (p.y < canvas.height + 20) alive = true;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        frame++;
        if (alive && frame < 180) requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
}

// --- Mascot Messages ---
const mascotMessages = [
    '"Let\'s try a new story today!"',
    '"Have you checked your emotions today?"',
    '"I bet you can beat the memory game!"',
    '"Your garden is growing beautifully!"',
    '"You\'re doing amazing, keep it up!"',
    '"Try the Color Splash game!"',
    '"Want to learn something new?"',
];

function initMascotChat() {
    const chatBtn = document.getElementById('chatBtn');
    const bubble = document.getElementById('chatBubbleText');
    const msgEl = document.getElementById('mascotMessage');
    if (!chatBtn || !bubble || !msgEl) return;

    let bubbleVisible = true;
    chatBtn.addEventListener('click', () => {
        if (bubbleVisible) {
            bubble.classList.add('hidden');
            bubbleVisible = false;
        } else {
            const msg = mascotMessages[Math.floor(Math.random() * mascotMessages.length)];
            msgEl.textContent = msg;
            bubble.classList.remove('hidden');
            bubbleVisible = true;
        }
    });
}

// --- Mascot Tips ---
const tips = [
    "Let's try a story!",
    "How about a game?",
    "Check your feelings!",
    "Collect more badges!",
    "You're a star!",
];

function initMascotTips() {
    const tipEl = document.getElementById('tipText');
    if (!tipEl) return;
    let idx = 0;
    setInterval(() => {
        idx = (idx + 1) % tips.length;
        tipEl.style.opacity = '0';
        setTimeout(() => {
            tipEl.textContent = tips[idx];
            tipEl.style.opacity = '1';
        }, 300);
    }, 5000);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    // Update sparkle count on all pages
    updateSparkleDisplay(getSparkles());

    // Update user name on all pages
    const nameEls = document.querySelectorAll('#userName');
    nameEls.forEach(el => el.textContent = getUserName());

    // Update mascot message with user name
    const mascotMsg = document.getElementById('mascotMessage');
    if (mascotMsg && mascotMsg.textContent.includes('Alex')) {
        mascotMsg.textContent = mascotMsg.textContent.replace('Alex', getUserName());
    }

    // Init features
    initDarkMode();
    initSoundToggle();
    initProfile();
    initCollectibles();
    initGallery();
    initSurprise();
    initMascotChat();
    initMascotTips();
});
