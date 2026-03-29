// ============================================================
// Games Logic
// ============================================================

function startGame(game) {
    document.getElementById('gameList').classList.add('hidden');
    document.querySelectorAll('[id$="Game"]').forEach(el => el.classList.add('hidden'));

    if (game === 'memory') initMemoryGame();
    else if (game === 'drawing') initDrawingGame();
    else if (game === 'quiz') initQuizGame();
    else if (game === 'counting') initCountingGame();
}

function backToGames() {
    document.getElementById('gameList').classList.remove('hidden');
    document.querySelectorAll('[id$="Game"]').forEach(el => el.classList.add('hidden'));
}

// ============================================================
// Memory Match Game
// ============================================================
const memoryIcons = ['🌟', '🐬', '🌈', '🎨', '🚀', '🦋', '🌸', '🎵'];
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moveCount = 0;
let memoryLocked = false;

function initMemoryGame() {
    document.getElementById('memoryGame').classList.remove('hidden');
    document.getElementById('memoryWin').classList.add('hidden');
    matchedPairs = 0;
    moveCount = 0;
    flippedCards = [];
    memoryLocked = false;
    document.getElementById('moveCount').textContent = '0';
    document.getElementById('pairCount').textContent = '0';

    // Create shuffled deck
    const deck = [...memoryIcons, ...memoryIcons];
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    memoryCards = deck;

    const board = document.getElementById('memoryBoard');
    board.innerHTML = deck.map((icon, idx) => `
        <div class="game-card aspect-square" data-index="${idx}" data-icon="${icon}" onclick="flipCard(this)">
            <div class="game-card-inner w-full h-full">
                <div class="game-card-front bg-secondary/80 text-white rounded-xl shadow-md">
                    <span class="material-symbols-outlined text-3xl">help</span>
                </div>
                <div class="game-card-back bg-surface-container-lowest rounded-xl shadow-md border-2 border-secondary-container">
                    <span class="text-4xl">${icon}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function flipCard(card) {
    if (memoryLocked) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moveCount++;
        document.getElementById('moveCount').textContent = moveCount;
        memoryLocked = true;

        const [a, b] = flippedCards;
        if (a.dataset.icon === b.dataset.icon) {
            a.classList.add('matched');
            b.classList.add('matched');
            matchedPairs++;
            document.getElementById('pairCount').textContent = matchedPairs;
            flippedCards = [];
            memoryLocked = false;

            if (matchedPairs === 8) {
                setTimeout(() => {
                    document.getElementById('memoryWin').classList.remove('hidden');
                    document.getElementById('finalMoves').textContent = moveCount;
                    addSparkles(5);
                }, 500);
            }
        } else {
            setTimeout(() => {
                a.classList.remove('flipped');
                b.classList.remove('flipped');
                flippedCards = [];
                memoryLocked = false;
            }, 800);
        }
    }
}

// ============================================================
// Drawing Game
// ============================================================
let drawingCtx = null;
let isDrawing = false;
let currentColor = '#1e293b';

function initDrawingGame() {
    document.getElementById('drawingGame').classList.remove('hidden');
    const canvas = document.getElementById('drawingCanvas');
    drawingCtx = canvas.getContext('2d');

    // Set canvas size to match display
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    drawingCtx.scale(2, 2);
    drawingCtx.lineCap = 'round';
    drawingCtx.lineJoin = 'round';
    clearCanvas();

    // Remove old listeners by cloning
    const newCanvas = canvas.cloneNode(true);
    canvas.parentNode.replaceChild(newCanvas, canvas);
    drawingCtx = newCanvas.getContext('2d');
    const r2 = newCanvas.getBoundingClientRect();
    newCanvas.width = r2.width * 2;
    newCanvas.height = r2.height * 2;
    drawingCtx.scale(2, 2);
    drawingCtx.lineCap = 'round';
    drawingCtx.lineJoin = 'round';
    drawingCtx.fillStyle = 'white';
    drawingCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // Mouse events
    newCanvas.addEventListener('mousedown', startDraw);
    newCanvas.addEventListener('mousemove', draw);
    newCanvas.addEventListener('mouseup', stopDraw);
    newCanvas.addEventListener('mouseleave', stopDraw);

    // Touch events
    newCanvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDraw(e.touches[0]); });
    newCanvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e.touches[0]); });
    newCanvas.addEventListener('touchend', stopDraw);

    // Set default active color
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active-color', 'ring-2', 'ring-offset-2', 'ring-slate-800'));
    const defaultBtn = document.querySelector('[data-color="#1e293b"]');
    if (defaultBtn) {
        defaultBtn.classList.add('active-color', 'ring-2', 'ring-offset-2', 'ring-slate-800');
    }
}

function startDraw(e) {
    isDrawing = true;
    const canvas = document.querySelector('#drawingCanvas') || document.querySelector('[id="drawingCanvas"]');
    const rect = canvas.getBoundingClientRect();
    drawingCtx.beginPath();
    drawingCtx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    const canvas = document.querySelector('#drawingCanvas') || document.querySelector('[id="drawingCanvas"]');
    const rect = canvas.getBoundingClientRect();
    const size = document.getElementById('brushSize');
    drawingCtx.strokeStyle = currentColor;
    drawingCtx.lineWidth = size ? size.value : 6;
    drawingCtx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    drawingCtx.stroke();
}

function stopDraw() {
    isDrawing = false;
}

function setColor(btn) {
    currentColor = btn.dataset.color;
    document.querySelectorAll('.color-btn').forEach(b => {
        b.classList.remove('active-color', 'ring-2', 'ring-offset-2');
        b.className = b.className.replace(/ring-\S+/g, '');
    });
    btn.classList.add('active-color', 'ring-2', 'ring-offset-2');
}

function clearCanvas() {
    if (!drawingCtx) return;
    const canvas = drawingCtx.canvas;
    drawingCtx.fillStyle = 'white';
    drawingCtx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
    addSparkles(3);
    alert('Drawing saved! +3 Sparkles earned! 🎨');
}

// ============================================================
// Quiz Game
// ============================================================
const quizQuestions = [
    { q: 'What color do you get when you mix red and blue?', options: ['Green', 'Purple', 'Orange', 'Yellow'], answer: 1 },
    { q: 'How many legs does a butterfly have?', options: ['4', '6', '8', '2'], answer: 1 },
    { q: 'What is the largest animal on Earth?', options: ['Elephant', 'Giraffe', 'Blue Whale', 'Shark'], answer: 2 },
    { q: 'Which season comes after winter?', options: ['Summer', 'Fall', 'Spring', 'Winter'], answer: 2 },
    { q: 'What do bees make?', options: ['Milk', 'Honey', 'Sugar', 'Juice'], answer: 1 },
    { q: 'How many colors are in a rainbow?', options: ['5', '6', '7', '8'], answer: 2 },
    { q: 'What planet do we live on?', options: ['Mars', 'Moon', 'Earth', 'Sun'], answer: 2 },
    { q: 'What do caterpillars turn into?', options: ['Birds', 'Butterflies', 'Bees', 'Frogs'], answer: 1 },
    { q: 'Which fruit is yellow and curved?', options: ['Apple', 'Orange', 'Banana', 'Grape'], answer: 2 },
    { q: 'What sound does a cow make?', options: ['Woof', 'Meow', 'Moo', 'Baa'], answer: 2 },
];

let quizCurrent = 0;
let quizScore = 0;
let quizSet = [];

function initQuizGame() {
    document.getElementById('quizGame').classList.remove('hidden');
    document.getElementById('quizEnd').classList.add('hidden');
    quizCurrent = 0;
    quizScore = 0;

    // Pick 5 random questions
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    quizSet = shuffled.slice(0, 5);

    renderQuizQuestion();
}

function renderQuizQuestion() {
    if (quizCurrent >= 5) {
        document.getElementById('quizEnd').classList.remove('hidden');
        document.getElementById('quizScore').textContent = quizScore;
        addSparkles(4);
        return;
    }

    const q = quizSet[quizCurrent];
    document.getElementById('quizNum').textContent = quizCurrent + 1;
    document.getElementById('quizQuestion').textContent = q.q;
    document.getElementById('quizFeedback').classList.add('hidden');

    const optionsEl = document.getElementById('quizOptions');
    optionsEl.innerHTML = q.options.map((opt, idx) => `
        <button onclick="answerQuiz(${idx})" class="quiz-option bg-surface-container-low hover:bg-primary-container/30 p-4 rounded-xl font-bold text-on-surface border-2 border-transparent hover:border-primary/20 transition-all text-lg">
            ${opt}
        </button>
    `).join('');
}

function answerQuiz(idx) {
    const q = quizSet[quizCurrent];
    const feedback = document.getElementById('quizFeedback');
    const options = document.querySelectorAll('.quiz-option');

    options.forEach((opt, i) => {
        opt.disabled = true;
        if (i === q.answer) {
            opt.classList.add('bg-secondary-container', 'border-secondary');
        }
        if (i === idx && idx !== q.answer) {
            opt.classList.add('bg-error-container/20', 'border-error');
        }
    });

    if (idx === q.answer) {
        quizScore++;
        feedback.textContent = '✅ Correct! Great job!';
        feedback.className = 'mt-6 p-4 rounded-xl font-bold text-lg bg-secondary-container/20 text-on-secondary-container';
    } else {
        feedback.textContent = `❌ Not quite! The answer is "${q.options[q.answer]}"`;
        feedback.className = 'mt-6 p-4 rounded-xl font-bold text-lg bg-error-container/10 text-error';
    }
    feedback.classList.remove('hidden');

    setTimeout(() => {
        quizCurrent++;
        renderQuizQuestion();
    }, 1500);
}

// ============================================================
// Counting Game
// ============================================================
const countingEmojis = ['🌟', '🐟', '🍎', '🌸', '🦋', '🐢', '🎈', '🍪'];
let countCurrent = 0;
let countScoreVal = 0;
let countSet = [];

function initCountingGame() {
    document.getElementById('countingGame').classList.remove('hidden');
    document.getElementById('countEnd').classList.add('hidden');
    countCurrent = 0;
    countScoreVal = 0;
    document.getElementById('countScore').textContent = '0';

    // Generate 5 counting questions
    countSet = [];
    for (let i = 0; i < 5; i++) {
        const emoji = countingEmojis[Math.floor(Math.random() * countingEmojis.length)];
        const count = Math.floor(Math.random() * 8) + 2; // 2-9
        countSet.push({ emoji, count });
    }

    renderCountQuestion();
}

function renderCountQuestion() {
    if (countCurrent >= 5) {
        document.getElementById('countEnd').classList.remove('hidden');
        document.getElementById('countFinalScore').textContent = countScoreVal;
        addSparkles(4);
        return;
    }

    const q = countSet[countCurrent];
    document.getElementById('countEmojis').textContent = q.emoji.repeat(q.count);
    document.getElementById('countQuestion').textContent = `How many ${q.emoji} do you see?`;
    document.getElementById('countFeedback').classList.add('hidden');

    // Generate options (correct + 3 wrong)
    const options = new Set([q.count]);
    while (options.size < 4) {
        const wrong = q.count + Math.floor(Math.random() * 5) - 2;
        if (wrong > 0 && wrong !== q.count) options.add(wrong);
    }
    const shuffled = [...options].sort(() => Math.random() - 0.5);

    const optionsEl = document.getElementById('countOptions');
    optionsEl.innerHTML = shuffled.map(n => `
        <button onclick="answerCount(${n}, ${q.count})" class="count-option w-16 h-16 rounded-2xl bg-surface-container-low hover:bg-primary-container/30 font-black text-2xl text-on-surface border-2 border-transparent hover:border-primary/20 transition-all">
            ${n}
        </button>
    `).join('');
}

function answerCount(picked, correct) {
    const feedback = document.getElementById('countFeedback');
    const options = document.querySelectorAll('.count-option');

    options.forEach(opt => {
        opt.disabled = true;
        const val = parseInt(opt.textContent);
        if (val === correct) opt.classList.add('bg-secondary-container', 'border-secondary');
        if (val === picked && picked !== correct) opt.classList.add('bg-error-container/20', 'border-error');
    });

    if (picked === correct) {
        countScoreVal++;
        document.getElementById('countScore').textContent = countScoreVal;
        feedback.textContent = '✅ Correct!';
        feedback.className = 'mt-6 p-4 rounded-xl font-bold text-lg bg-secondary-container/20 text-on-secondary-container';
    } else {
        feedback.textContent = `❌ The answer is ${correct}!`;
        feedback.className = 'mt-6 p-4 rounded-xl font-bold text-lg bg-error-container/10 text-error';
    }
    feedback.classList.remove('hidden');

    setTimeout(() => {
        countCurrent++;
        renderCountQuestion();
    }, 1200);
}
