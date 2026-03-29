// ============================================================
// Emotions Explorer Logic
// ============================================================

const emotionResponses = {
    happy: {
        emoji: '😊',
        title: "You're feeling happy!",
        message: "That's wonderful! Happiness is like sunshine — it warms everyone around you. When we're happy, our brain releases special chemicals that make us feel great. Your smile can make others feel happy too!",
        activity: "Try drawing a picture of what makes you happy, or share your happiness with a friend!"
    },
    excited: {
        emoji: '🤩',
        title: "You're feeling excited!",
        message: "Excitement is like bubbles fizzing inside you! It means something fun is happening or about to happen. It's okay to feel excited — just remember to take deep breaths if the excitement feels too big.",
        activity: "Channel your energy into a fun game or dance to your favorite song!"
    },
    calm: {
        emoji: '😌',
        title: "You're feeling calm.",
        message: "Being calm is a superpower! When you're calm, your mind is clear and you can think your best thoughts. It's like being a peaceful lake — still and beautiful on the surface.",
        activity: "This is a great time for reading a story or doing some quiet drawing."
    },
    sad: {
        emoji: '😢',
        title: "You're feeling sad.",
        message: "It's completely okay to feel sad. Everyone feels sad sometimes, even grown-ups. Sadness is your heart's way of saying something matters to you. The sadness will pass, like clouds moving across the sky.",
        activity: "Try talking to someone you trust about how you feel, or give yourself a big hug."
    },
    angry: {
        emoji: '😠',
        title: "You're feeling angry.",
        message: "Anger is a normal feeling. It often means something feels unfair or frustrating. The important thing is what we do with our anger — we can let it out in healthy ways without hurting others.",
        activity: "Try the breathing exercise below, or squeeze a pillow really tight and then let go!"
    },
    scared: {
        emoji: '😨',
        title: "You're feeling scared.",
        message: "Being scared is your body trying to keep you safe. Even brave heroes feel scared sometimes! Fear doesn't mean you're weak — being brave means doing things even when you're afraid.",
        activity: "Try the Calm Down Corner breathing exercise, or talk to a grown-up you trust."
    },
    confused: {
        emoji: '😕',
        title: "You're feeling confused.",
        message: "Feeling confused means your brain is trying to figure something out. That's actually really smart! Confusion is the first step to learning something new. It's okay to ask questions.",
        activity: "Try writing down what confuses you, or ask someone to help explain it."
    },
    proud: {
        emoji: '🥳',
        title: "You're feeling proud!",
        message: "You should be proud! Feeling proud means you did something that matters to you. Pride comes from hard work and being kind. Celebrate your achievements — you earned it!",
        activity: "Tell someone about what you accomplished, or add it to your achievement journal!"
    },
    tired: {
        emoji: '😴',
        title: "You're feeling tired.",
        message: "Your body is telling you it needs rest. Just like a phone needs charging, your body and mind need sleep and quiet time to recharge. Being tired is your body being smart!",
        activity: "Try the breathing exercise below, or find a cozy spot to rest for a few minutes."
    },
    loved: {
        emoji: '🥰',
        title: "You're feeling loved!",
        message: "Feeling loved is one of the best feelings in the world! Love makes us feel safe, warm, and connected. Remember, you are always loved, even when you can't feel it.",
        activity: "Share the love by doing something kind for someone else today!"
    }
};

function selectEmotion(el) {
    // Remove previous selection
    document.querySelectorAll('.emotion-card').forEach(card => {
        card.classList.remove('border-tertiary', 'bg-tertiary-container/20', 'shadow-lg');
        card.classList.add('border-transparent');
    });

    // Mark selected
    el.classList.remove('border-transparent');
    el.classList.add('border-tertiary', 'bg-tertiary-container/20', 'shadow-lg');

    const emotion = el.dataset.emotion;
    const response = emotionResponses[emotion];
    if (!response) return;

    // Show response
    const section = document.getElementById('emotionResponse');
    section.classList.remove('hidden');
    section.classList.add('fade-in-up');
    document.getElementById('responseEmoji').textContent = response.emoji;
    document.getElementById('responseTitle').textContent = response.title;
    document.getElementById('responseMessage').textContent = response.message;
    document.getElementById('responseActivity').textContent = response.activity;

    // Save to mood garden
    saveMoodCheckIn(emotion);

    // Add sparkle
    addSparkles(1);

    // Scroll to response
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// --- Mood Garden ---
function saveMoodCheckIn(emotion) {
    const today = new Date().toISOString().split('T')[0];
    const garden = AppState.get('moodGarden', {});
    garden[today] = emotion;
    AppState.set('moodGarden', garden);
    renderMoodGarden();
}

function renderMoodGarden() {
    const grid = document.getElementById('moodGarden');
    if (!grid) return;

    const garden = AppState.get('moodGarden', {});
    const today = new Date();
    const days = [];

    // Show last 28 days (4 weeks)
    for (let i = 27; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        const isToday = i === 0;
        days.push({ date: key, emotion: garden[key] || null, isToday });
    }

    const emojiMap = {
        happy: '😊', excited: '🤩', calm: '😌', sad: '😢', angry: '😠',
        scared: '😨', confused: '😕', proud: '🥳', tired: '😴', loved: '🥰'
    };

    grid.innerHTML = days.map(d => {
        const base = 'w-full aspect-square rounded-lg flex items-center justify-center text-lg transition-all';
        if (d.isToday && d.emotion) {
            return `<div class="${base} bg-tertiary-container border-2 border-tertiary shadow-sm" title="${d.date}">${emojiMap[d.emotion] || '✨'}</div>`;
        }
        if (d.emotion) {
            return `<div class="${base} bg-secondary-container/40" title="${d.date}">${emojiMap[d.emotion] || '✨'}</div>`;
        }
        if (d.isToday) {
            return `<div class="${base} bg-tertiary-container/30 border-2 border-dashed border-tertiary/40" title="Today">?</div>`;
        }
        return `<div class="${base} bg-surface-container-high/50" title="${d.date}"></div>`;
    }).join('');
}

// --- Breathing Exercise ---
let breathingActive = false;
let breathingInterval = null;

function toggleBreathing() {
    const circle = document.getElementById('breathCircle');
    const text = document.getElementById('breathText');
    const btn = document.getElementById('breathBtn');

    if (breathingActive) {
        breathingActive = false;
        clearInterval(breathingInterval);
        circle.style.transform = 'scale(1)';
        text.textContent = 'Tap to Start';
        btn.textContent = 'Start Breathing';
        return;
    }

    breathingActive = true;
    btn.textContent = 'Stop';
    let phase = 0; // 0=inhale, 1=hold, 2=exhale

    function breathCycle() {
        if (!breathingActive) return;
        if (phase === 0) {
            text.textContent = 'Breathe In...';
            circle.style.transform = 'scale(1.3)';
            circle.style.backgroundColor = 'rgba(0, 96, 147, 0.3)';
        } else if (phase === 1) {
            text.textContent = 'Hold...';
        } else {
            text.textContent = 'Breathe Out...';
            circle.style.transform = 'scale(1)';
            circle.style.backgroundColor = 'rgba(0, 96, 147, 0.15)';
        }
        phase = (phase + 1) % 3;
    }

    breathCycle();
    breathingInterval = setInterval(breathCycle, 4000);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    renderMoodGarden();
});
