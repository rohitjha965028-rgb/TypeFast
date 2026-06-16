/* ===== QUOTE BANK ===== */
const QUOTES = [
    "The quick brown fox jumps over the lazy dog and then runs away into the forest without looking back.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts in every endeavor.",
    "In the middle of difficulty lies opportunity, and those who embrace it find the greatest rewards waiting ahead.",
    "The only way to do great work is to love what you do, because passion drives excellence beyond measure.",
    "A computer once beat me at chess, but it was no match for me at kickboxing, which requires real skill.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall with renewed strength.",
    "The way to get started is to quit talking and begin doing, because action is the foundation of all success.",
    "Your time is limited, so don't waste it living someone else's life when you can create your own destiny.",
    "If life were predictable it would cease to be life, and be without flavor, mystery, or genuine excitement.",
    "Life is what happens when you're busy making other plans, so stay present and enjoy every precious moment.",
    "The future belongs to those who believe in the beauty of their dreams and work tirelessly to achieve them.",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn, because experience is the best teacher.",
    "It is during our darkest moments that we must focus to see the light and find the strength to carry on.",
    "Whoever is happy will make others happy too, for joy is contagious and spreads like wildfire among friends.",
    "You will face many defeats in life, but never let yourself be defeated, because resilience defines true character.",
    "The only impossible journey is the one you never begin, so take that first step and discover what awaits you.",
    "In this world we have nothing to fear but fear itself, because courage conquers all obstacles in our path.",
    "The purpose of our lives is to be happy and to spread joy to others through kindness and genuine compassion.",
    "Get busy living or get busy dying, the choice is yours every single day when you wake up and face the world.",
    "You only live once, but if you do it right, once is enough for everyone to remember your legacy forever.",
    "Many of life's failures are people who did not realize how close they were to success when they gave up hope.",
    "Never let the fear of striking out keep you from playing the game of life with all your heart and soul.",
    "Money and success don't change people; they merely amplify what is already there in their hearts and minds.",
    "Your time is limited, so don't waste it living someone else's life story when you can write your own epic tale.",
    "Not how long, but how well you have lived is the main thing in life, because quality always trumps quantity.",
    "If you want to live a happy life, tie it to a goal, not to people or things that can be lost or broken.",
    "Never let the fear of striking out keep you from playing the game hard and giving everything you have got.",
    "Curiosity about life in all of its aspects, I think, is still the secret of great creative people everywhere.",
    "Life is not a problem to be solved, but a reality to be experienced fully with all its ups and downs.",
    "The unexamined life is not worth living, so examine your life daily and strive for continuous improvement.",
    "Turn your wounds into wisdom and your pain into power to change the world for the better every single day.",
    "The way to get started is to quit talking and begin doing the work that will lead you to your ultimate goals.",
    "Do not let making a living prevent you from making a life worth living, full of love, laughter, and adventure.",
    "Happiness is not something ready made. It comes from your own actions and thoughts, cultivated with intention.",
    "Everything negative, pressure, challenges, is all an opportunity for me to rise above and become stronger.",
    "I like criticism. It makes you strong and helps you grow into a better person with each passing day.",
    "You never really learn much from hearing yourself speak, only from listening to others with an open mind.",
    "Life imposes things on you that you can't control, but you still have the choice of how you respond to them.",
    "The best way to predict your future is to create it with your own hands, guided by vision and determination.",
    "You must be the change you wish to see in the world around you, starting with small acts of kindness today.",
    "Spread love everywhere you go. Let no one ever come to you without leaving happier than when they arrived.",
    "When you reach the end of your rope, tie a knot in it and hang on tight, because help is always on the way.",
    "Always remember that you are absolutely unique, just like everyone else, and that makes you truly special.",
    "Don't judge each day by the harvest you reap but by the seeds that you plant for tomorrow's bright future.",
    "The future belongs to those who believe in the beauty of their dreams deeply and pursue them with passion.",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn fast because practice makes perfect.",
    "It is during our darkest moments that we must focus to see the light ahead and trust that dawn will come.",
    "In the end, it's not the years in your life that count, it's the life in your years that truly matters most.",
    "Life is either a daring adventure or nothing but a boring routine, so choose adventure and live without regrets.",
    "Many of life's failures are people who did not realize how close they were to achieving their greatest dreams."
];

/* ===== STORAGE MODULE ===== */
const Storage = (() => {
    const KEYS = {
        history: 'typefast_history',
        theme: 'typefast_theme',
        best: 'typefast_best',
        sound: 'typefast_sound',
        duration: 'typefast_duration'
    };

    function get(key, fallback) {
        try {
            const val = localStorage.getItem(key);
            return val ? JSON.parse(val) : fallback;
        } catch {
            return fallback;
        }
    }

    function set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {}
    }

    return {
        getHistory: () => get(KEYS.history, []),
        setHistory: (h) => set(KEYS.history, h),
        getTheme: () => get(KEYS.theme, 'dark'),
        setTheme: (t) => set(KEYS.theme, t),
        getBest: () => get(KEYS.best, null),
        setBest: (b) => set(KEYS.best, b),
        getSound: () => get(KEYS.sound, true),
        setSound: (s) => set(KEYS.sound, s),
        getDuration: () => get(KEYS.duration, 60),
        setDuration: (d) => set(KEYS.duration, d)
    };
})();

/* ===== THEME MODULE ===== */
const Theme = (() => {
    function init() {
        const saved = Storage.getTheme();
        apply(saved);
        updateIcons(saved);
    }

    function apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        Storage.setTheme(theme);
    }

    function toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        apply(next);
        updateIcons(next);
    }

    function updateIcons(theme) {
        const moon = document.getElementById('moonIcon');
        const sun = document.getElementById('sunIcon');
        if (moon && sun) {
            moon.classList.toggle('hidden', theme !== 'dark');
            sun.classList.toggle('hidden', theme !== 'light');
        }
    }

    return { init, toggle };
})();

/* ===== AUDIO MODULE ===== */
const Audio = (() => {
    let ctx = null;
    let enabled = true;
    let tickInterval = null;

    function ensureCtx() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
    }

    function play(type) {
        if (!enabled) return;
        ensureCtx();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        switch (type) {
            case 'correct':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1200, now);
                osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
                break;
            case 'wrong':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(150, now);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                osc.start(now);
                osc.stop(now + 0.12);
                break;
            case 'space':
                osc.type = 'square';
                osc.frequency.setValueAtTime(400, now);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
            case 'word':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1800, now);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                osc.start(now);
                osc.stop(now + 0.06);
                break;
            case 'tick':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                gain.gain.setValueAtTime(0.03, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
                osc.start(now);
                osc.stop(now + 0.04);
                break;
            case 'pb':
                playPBChime();
                return;
        }
    }

    function playPBChime() {
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            const t = ctx.currentTime + i * 0.12;
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0.08, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
            osc.start(t);
            osc.stop(t + 0.3);
        });
    }

    function toggle() {
        enabled = !enabled;
        Storage.setSound(enabled);
        updateIcon();
    }

    function updateIcon() {
        const on = document.getElementById('soundOnIcon');
        const off = document.getElementById('soundOffIcon');
        if (on && off) {
            on.classList.toggle('hidden', !enabled);
            off.classList.toggle('hidden', enabled);
        }
    }

    function startTick() {
        if (tickInterval) clearInterval(tickInterval);
        tickInterval = setInterval(() => {
            play('tick');
        }, 1000);
    }

    function stopTick() {
        if (tickInterval) {
            clearInterval(tickInterval);
            tickInterval = null;
        }
    }

    function init() {
        enabled = Storage.getSound();
        updateIcon();
    }

    return { init, play, toggle, startTick, stopTick };
})();

/* ===== QUOTES MODULE ===== */
const Quotes = (() => {
    function getRandom() {
        return QUOTES[Math.floor(Math.random() * QUOTES.length)];
    }
    return { getRandom };
})();

/* ===== STATS MODULE ===== */
const Stats = (() => {
    function calculateWPM(correctChars, elapsedSeconds) {
        if (elapsedSeconds <= 0) return 0;
        return Math.round((correctChars / 5) / (elapsedSeconds / 60));
    }

    function calculateRawWPM(totalChars, elapsedSeconds) {
        if (elapsedSeconds <= 0) return 0;
        return Math.round((totalChars / 5) / (elapsedSeconds / 60));
    }

    function calculateAccuracy(correctChars, totalTyped) {
        if (totalTyped <= 0) return 100;
        return Math.round((correctChars / totalTyped) * 100);
    }

    function getRank(wpm) {
        if (wpm >= 100) return { name: 'God Mode', icon: '🔥', class: 'godmode', next: null };
        if (wpm >= 80) return { name: 'Lightning', icon: '⚡', class: 'lightning', next: 100 };
        if (wpm >= 60) return { name: 'Cheetah', icon: '🐆', class: 'cheetah', next: 80 };
        if (wpm >= 40) return { name: 'Fox', icon: '🦊', class: 'fox', next: 60 };
        if (wpm >= 20) return { name: 'Rabbit', icon: '🐰', class: 'rabbit', next: 40 };
        return { name: 'Turtle', icon: '🐢', class: 'turtle', next: 20 };
    }

    return { calculateWPM, calculateRawWPM, calculateAccuracy, getRank };
})();

/* ===== RENDERER MODULE ===== */
const Renderer = (() => {
    const els = {};

    function cache() {
        els.wpmValue = document.getElementById('wpmValue');
        els.accuracyValue = document.getElementById('accuracyValue');
        els.timeValue = document.getElementById('timeValue');
        els.charsValue = document.getElementById('charsValue');
        els.textDisplay = document.getElementById('textDisplay');
        els.timerProgress = document.getElementById('timerProgress');
        els.comboDisplay = document.getElementById('comboDisplay');
        els.focusHint = document.getElementById('focusHint');
        els.graphSvg = document.getElementById('wpmGraph');
        els.graphLine = document.getElementById('graphLine');
        els.graphDots = document.getElementById('graphDots');
        els.typingCard = document.getElementById('typingCard');
    }

    function renderText(quote) {
        if (!els.textDisplay) return;
        els.textDisplay.innerHTML = '';
        const chars = quote.split('');
        chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.dataset.index = i;
            span.textContent = char;
            els.textDisplay.appendChild(span);
        });
        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.id = 'cursor';
        els.textDisplay.appendChild(cursor);
    }

    function updateCharState(index, state) {
        const char = els.textDisplay?.querySelector(`[data-index="${index}"]`);
        if (!char) return;
        char.className = 'char ' + state;
    }

    function addExtraChar(char, index) {
        const span = document.createElement('span');
        span.className = 'char extra';
        span.dataset.extra = index;
        span.textContent = char;
        els.textDisplay?.appendChild(span);
    }

    function removeExtraChar(index) {
        const extra = els.textDisplay?.querySelector(`[data-extra="${index}"]`);
        if (extra) extra.remove();
    }

    function updateCursor(position) {
        const cursor = document.getElementById('cursor');
        if (!cursor) return;
        if (position < 0) {
            cursor.style.display = 'none';
            return;
        }
        cursor.style.display = 'block';
        const char = els.textDisplay?.querySelector(`[data-index="${position}"]`);
        if (char) {
            cursor.style.left = char.offsetLeft + 'px';
            cursor.style.top = char.offsetTop + 'px';
        } else {
            // At end
            const lastChar = els.textDisplay?.querySelector('.char:last-of-type:not(.cursor)');
            if (lastChar) {
                cursor.style.left = (lastChar.offsetLeft + lastChar.offsetWidth) + 'px';
                cursor.style.top = lastChar.offsetTop + 'px';
            }
        }
    }

    function updateStats(wpm, accuracy, timeLeft, correct, wrong) {
        if (els.wpmValue) els.wpmValue.textContent = wpm;
        if (els.accuracyValue) els.accuracyValue.textContent = accuracy + '%';
        if (els.timeValue) els.timeValue.textContent = timeLeft;
        if (els.charsValue) els.charsValue.textContent = correct + '/' + wrong;
    }

    function updateTimer(percent, isUrgent) {
        if (els.timerProgress) {
            els.timerProgress.style.width = percent + '%';
            els.timerProgress.classList.toggle('pulse', isUrgent);
        }
    }

    function updateCombo(combo) {
        if (!els.comboDisplay) return;
        if (combo >= 5) {
            let text = 'Combo x' + combo;
            if (combo >= 25) text += ' 🔥';
            else if (combo >= 10) text += ' ⚡';
            els.comboDisplay.textContent = text;
            els.comboDisplay.classList.add('visible');
        } else {
            els.comboDisplay.classList.remove('visible');
        }
    }

    function showHint(show) {
        if (els.focusHint) els.focusHint.classList.toggle('hidden', !show);
    }

    function shake() {
        if (els.typingCard) {
            els.typingCard.classList.remove('shake');
            void els.typingCard.offsetWidth;
            els.typingCard.classList.add('shake');
        }
    }

    function updateGraph(wordTimes, avgTime) {
        if (!els.graphSvg || wordTimes.length === 0) return;
        els.graphSvg.classList.add('visible');

        const maxTime = Math.max(...wordTimes, avgTime * 2);
        const points = wordTimes.map((t, i) => {
            const x = (i / (wordTimes.length - 1 || 1)) * 100;
            const y = 40 - (t / maxTime) * 35;
            return `${x},${y}`;
        }).join(' ');

        if (els.graphLine) els.graphLine.setAttribute('points', points);

        // Dots
        if (els.graphDots) {
            els.graphDots.innerHTML = '';
            wordTimes.forEach((t, i) => {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                const x = (i / (wordTimes.length - 1 || 1)) * 100;
                const y = 40 - (t / maxTime) * 35;
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', y);
                circle.setAttribute('r', '1.5');
                let color;
                if (t < avgTime * 0.8) color = '#4ade80';
                else if (t > avgTime * 1.2) color = '#f87171';
                else color = '#fbbf24';
                circle.setAttribute('fill', color);
                circle.setAttribute('class', 'graph-dot');
                els.graphDots.appendChild(circle);
            });
        }
    }

    return {
        cache, renderText, updateCharState, addExtraChar, removeExtraChar,
        updateCursor, updateStats, updateTimer, updateCombo, showHint, shake, updateGraph
    };
})();

/* ===== HISTORY MODULE ===== */
const History = (() => {
    function save(result) {
        const history = Storage.getHistory();
        history.unshift(result);
        if (history.length > 10) history.pop();
        Storage.setHistory(history);
        render();
    }

    function render() {
        const list = document.getElementById('historyList');
        if (!list) return;
        const history = Storage.getHistory();
        if (history.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-illustration">
                        <svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="10" y="20" width="100" height="50" rx="4" ry="4"></rect>
                            <path d="M20 35h20M20 45h40M20 55h30"></path>
                            <rect x="85" y="30" width="15" height="10" rx="2" ry="2"></rect>
                            <path d="M92 33v4M95 35h-6"></path>
                        </svg>
                    </div>
                    <p class="empty-text">Start typing to see your stats</p>
                </div>`;
            return;
        }

        const bestWpm = Math.max(...history.map(h => h.wpm));
        list.innerHTML = history.map(item => {
            const isBest = item.wpm === bestWpm;
            const date = new Date(item.date);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            return `
                <div class="history-item ${isBest ? 'best' : ''}">
                    <div class="history-wpm">${item.wpm} WPM</div>
                    <div class="history-accuracy">${item.accuracy}%</div>
                    <div class="history-duration">${item.duration}s</div>
                    <div class="history-rank">${item.rank}</div>
                    <div class="history-date">${dateStr}</div>
                </div>`;
        }).join('');
    }

    return { save, render };
})();

/* ===== RESULT MODAL MODULE ===== */
const ResultModal = (() => {
    function show(result) {
        const overlay = document.getElementById('modalOverlay');
        if (!overlay) return;

        const rank = Stats.getRank(result.wpm);
        const best = Storage.getBest();
        const isPB = !best || result.wpm > best.wpm;

        // Rank badge
        const badge = document.getElementById('rankBadge');
        if (badge) {
            badge.className = 'rank-badge ' + rank.class;
            badge.innerHTML = rank.icon + ' ' + rank.name;
        }

        // Stats
        document.getElementById('modalWpm').textContent = result.wpm;
        document.getElementById('modalAccuracy').textContent = result.accuracy + '%';
        document.getElementById('modalRawWpm').textContent = result.rawWpm;
        document.getElementById('modalChars').textContent = result.correctChars + '/' + result.wrongChars;

        // PB
        const pbEl = document.getElementById('pbCelebration');
        if (isPB) {
            pbEl.classList.add('visible');
            document.getElementById('pbValue').textContent = result.wpm;
            Confetti.burst();
            Audio.play('pb');
            Storage.setBest({ wpm: result.wpm, date: result.date });
        } else {
            pbEl.classList.remove('visible');
        }

        // Next rank
        const nextRank = document.getElementById('nextRank');
        if (nextRank) {
            if (rank.next) {
                nextRank.textContent = `Next rank: ${rank.next} WPM`;
            } else {
                nextRank.textContent = 'You have reached the highest rank!';
            }
        }

        // Heatmap
        renderHeatmap(result.heatmap);

        overlay.classList.add('visible');
    }

    function hide() {
        const overlay = document.getElementById('modalOverlay');
        if (overlay) overlay.classList.remove('visible');
    }

    function renderHeatmap(heatmap) {
        const container = document.getElementById('heatmapKeyboard');
        if (!container || !heatmap) return;

        const rows = [
            'QWERTYUIOP'.split(''),
            'ASDFGHJKL'.split(''),
            'ZXCVBNM'.split('')
        ];

        container.innerHTML = rows.map(row => {
            return `<div class="heatmap-row">` + row.map(key => {
                const correct = heatmap.correct[key] || 0;
                const wrong = heatmap.wrong[key] || 0;
                let cls = '';
                if (wrong > 0) {
                    cls = 'wrong-' + Math.min(wrong, 3);
                } else if (correct > 0) {
                    cls = 'correct-' + Math.min(correct, 3);
                }
                return `<div class="heatmap-key ${cls}">${key}</div>`;
            }).join('') + `</div>`;
        }).join('');
    }

    return { show, hide };
})();

/* ===== CONFETTI MODULE ===== */
const Confetti = (() => {
    function burst() {
        const container = document.getElementById('confettiContainer');
        if (!container) return;
        container.innerHTML = '';

        const colors = ['#8b5cf6', '#ec4899', '#fbbf24', '#4ade80', '#3b82f6', '#f87171'];
        const count = 40;

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'confetti-particle';
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = '-10px';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.width = (Math.random() * 6 + 4) + 'px';
            p.style.height = (Math.random() * 6 + 4) + 'px';
            p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            p.style.animationDelay = (Math.random() * 0.5) + 's';
            p.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
            container.appendChild(p);
        }

        setTimeout(() => {
            container.innerHTML = '';
        }, 3000);
    }

    return { burst };
})();

/* ===== TIMER MODULE ===== */
const Timer = (() => {
    let interval = null;
    let duration = 60;
    let remaining = 60;
    let elapsed = 0;
    let running = false;
    let callbacks = {};

    function setDuration(d) {
        duration = d;
        remaining = d;
        elapsed = 0;
        updateDisplay();
    }

    function start() {
        if (running) return;
        running = true;
        const startTime = Date.now();
        interval = setInterval(() => {
            elapsed = (Date.now() - startTime) / 1000;
            remaining = Math.max(0, duration - elapsed);
            updateDisplay();
            if (remaining <= 0) {
                stop();
                if (callbacks.onEnd) callbacks.onEnd();
            }
        }, 100);
    }

    function stop() {
        running = false;
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function reset() {
        stop();
        remaining = duration;
        elapsed = 0;
        updateDisplay();
    }

    function updateDisplay() {
        const pct = (remaining / duration) * 100;
        const isUrgent = remaining <= 10 && remaining > 0;
        Renderer.updateTimer(pct, isUrgent);
        Renderer.updateStats(
            document.getElementById('wpmValue')?.textContent || 0,
            document.getElementById('accuracyValue')?.textContent?.replace('%', '') || 100,
            Math.ceil(remaining),
            document.getElementById('charsValue')?.textContent?.split('/')[0] || 0,
            document.getElementById('charsValue')?.textContent?.split('/')[1] || 0
        );
        if (isUrgent && running) {
            Audio.play('tick');
        }
    }

    function getElapsed() {
        return elapsed;
    }

    function isRunning() {
        return running;
    }

    function onEnd(cb) {
        callbacks.onEnd = cb;
    }

    return { setDuration, start, stop, reset, getElapsed, isRunning, onEnd };
})();

/* ===== TYPING MODULE ===== */
const Typing = (() => {
    let quote = '';
    let typed = '';
    let correctChars = 0;
    let wrongChars = 0;
    let combo = 0;
    let maxCombo = 0;
    let wordStartTime = 0;
    let wordTimes = [];
    let heatmap = { correct: {}, wrong: {} };
    let started = false;
    let wordIndex = 0;

    function init() {
        quote = Quotes.getRandom();
        typed = '';
        correctChars = 0;
        wrongChars = 0;
        combo = 0;
        maxCombo = 0;
        wordStartTime = 0;
        wordTimes = [];
        heatmap = { correct: {}, wrong: {} };
        started = false;
        wordIndex = 0;
        Renderer.renderText(quote);
        Renderer.updateCursor(0);
        Renderer.showHint(true);
        Renderer.updateCombo(0);
        Renderer.updateStats(0, 100, Timer.getElapsed() ? Math.ceil(Timer.getElapsed()) : Storage.getDuration(), 0, 0);
    }

    function handleInput(value) {
        if (!started) {
            started = true;
            wordStartTime = Date.now();
            Timer.start();
            Renderer.showHint(false);
            Audio.startTick();
        }

        const prevLen = typed.length;
        typed = value;

        // Handle backspace / deletion
        if (typed.length < prevLen) {
            for (let i = typed.length; i < prevLen; i++) {
                if (i < quote.length) {
                    Renderer.updateCharState(i, '');
                } else {
                    Renderer.removeExtraChar(i);
                }
            }
            combo = 0;
            Renderer.updateCombo(combo);
        }

        // Process new input
        let newCorrect = 0;
        let newWrong = 0;
        let currentCombo = 0;
        let lastWasCorrect = true;

        for (let i = 0; i < typed.length; i++) {
            if (i < quote.length) {
                const expected = quote[i];
                const actual = typed[i];
                const key = expected.toUpperCase();

                if (actual === expected) {
                    Renderer.updateCharState(i, 'correct');
                    newCorrect++;
                    if (lastWasCorrect) {
                        currentCombo++;
                    } else {
                        currentCombo = 1;
                        lastWasCorrect = true;
                    }
                    heatmap.correct[key] = (heatmap.correct[key] || 0) + 1;
                } else {
                    Renderer.updateCharState(i, 'wrong');
                    newWrong++;
                    lastWasCorrect = false;
                    currentCombo = 0;
                    heatmap.wrong[key] = (heatmap.wrong[key] || 0) + 1;
                }
            } else {
                // Extra characters
                const extraIndex = i;
                const existing = document.querySelector(`[data-extra="${extraIndex}"]`);
                if (!existing) {
                    Renderer.addExtraChar(typed[i], extraIndex);
                }
                newWrong++;
                lastWasCorrect = false;
                currentCombo = 0;
            }
        }

        correctChars = newCorrect;
        wrongChars = newWrong;

        // Combo tracking
        if (currentCombo > combo) {
            combo = currentCombo;
            if (combo > maxCombo) maxCombo = combo;
        }
        if (currentCombo === 0) combo = 0;
        Renderer.updateCombo(combo);

        // Word completion detection
        const words = quote.split(' ');
        let charCount = 0;
        let currentWordIdx = 0;
        for (let w = 0; w < words.length; w++) {
            charCount += words[w].length + (w < words.length - 1 ? 1 : 0);
            if (typed.length >= charCount && w > wordIndex) {
                wordIndex = w;
                const wordTime = Date.now() - wordStartTime;
                wordTimes.push(wordTime);
                wordStartTime = Date.now();
                Audio.play('word');
            }
        }

        // Update cursor
        Renderer.updateCursor(typed.length);

        // Update stats
        const elapsed = Timer.getElapsed();
        const totalTyped = typed.length;
        const wpm = Stats.calculateWPM(correctChars, elapsed);
        const rawWpm = Stats.calculateRawWPM(totalTyped, elapsed);
        const accuracy = Stats.calculateAccuracy(correctChars, totalTyped);
        const timeLeft = Math.max(0, Math.ceil(Storage.getDuration() - elapsed));

        Renderer.updateStats(wpm, accuracy, timeLeft, correctChars, wrongChars);

        // Update graph
        if (wordTimes.length > 0) {
            const avg = wordTimes.reduce((a, b) => a + b, 0) / wordTimes.length;
            Renderer.updateGraph(wordTimes, avg);
        }

        // Check completion
        if (typed.length >= quote.length && typed === quote.substring(0, typed.length)) {
            // Completed quote, get new one
            quote = Quotes.getRandom();
            typed = '';
            document.getElementById('hiddenInput').value = '';
            Renderer.renderText(quote);
            Renderer.updateCursor(0);
        }
    }

    function handleKey(key) {
        if (key === 'Backspace') {
            Audio.play('space');
            return;
        }
        if (key === ' ') {
            Audio.play('space');
        } else if (key.length === 1) {
            const idx = typed.length;
            if (idx < quote.length && key === quote[idx]) {
                Audio.play('correct');
            } else {
                Audio.play('wrong');
                Renderer.shake();
            }
        }
    }

    function getResult() {
        const elapsed = Timer.getElapsed() || 1;
        const totalTyped = typed.length;
        const wpm = Stats.calculateWPM(correctChars, elapsed);
        const rawWpm = Stats.calculateRawWPM(totalTyped, elapsed);
        const accuracy = Stats.calculateAccuracy(correctChars, totalTyped);
        const rank = Stats.getRank(wpm);

        // Mark missed characters
        for (let i = typed.length; i < quote.length; i++) {
            Renderer.updateCharState(i, 'missed');
        }

        return {
            wpm,
            accuracy,
            rawWpm,
            correctChars,
            wrongChars,
            duration: Storage.getDuration(),
            rank: rank.icon + ' ' + rank.name,
            date: new Date().toISOString(),
            heatmap,
            wordTimes
        };
    }

    return { init, handleInput, handleKey, getResult, isStarted: () => started };
})();

/* ===== APP MODULE ===== */
const App = (() => {
    function init() {
        Renderer.cache();
        Theme.init();
        Audio.init();
        History.render();

        const savedDuration = Storage.getDuration();
        Timer.setDuration(savedDuration);
        updateDurationButtons(savedDuration);

        Typing.init();

        bindEvents();
    }

    function bindEvents() {
        // Hidden input
        const hiddenInput = document.getElementById('hiddenInput');
        const typingCard = document.getElementById('typingCard');

        typingCard?.addEventListener('click', () => {
            hiddenInput?.focus();
        });

        hiddenInput?.addEventListener('input', (e) => {
            Typing.handleInput(e.target.value);
        });

        hiddenInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                restart();
                return;
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                stop();
                return;
            }
            Typing.handleKey(e.key);
        });

        // Global key listener to focus
        document.addEventListener('keydown', (e) => {
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                if (document.activeElement !== hiddenInput) {
                    hiddenInput?.focus();
                }
            }
        });

        // Restart button
        document.getElementById('restartBtn')?.addEventListener('click', restart);

        // Try again button
        document.getElementById('tryAgainBtn')?.addEventListener('click', () => {
            ResultModal.hide();
            restart();
        });

        // Duration toggle
        document.querySelectorAll('.duration-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const d = parseInt(btn.dataset.duration);
                Storage.setDuration(d);
                Timer.setDuration(d);
                updateDurationButtons(d);
                restart();
            });
        });

        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', Theme.toggle);

        // Sound toggle
        document.getElementById('soundToggle')?.addEventListener('click', Audio.toggle);

        // Timer end
        Timer.onEnd(() => {
            Audio.stopTick();
            const result = Typing.getResult();
            History.save(result);
            ResultModal.show(result);
        });

        // Modal overlay click to close
        document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
            if (e.target.id === 'modalOverlay') {
                ResultModal.hide();
            }
        });
    }

    function updateDurationButtons(active) {
        document.querySelectorAll('.duration-btn').forEach(btn => {
            const isActive = parseInt(btn.dataset.duration) === active;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-checked', isActive);
        });
    }

    function restart() {
        Timer.stop();
        Audio.stopTick();
        ResultModal.hide();
        document.getElementById('hiddenInput').value = '';
        Typing.init();
        Timer.reset();
    }

    function stop() {
        Timer.stop();
        Audio.stopTick();
        const result = Typing.getResult();
        History.save(result);
        ResultModal.show(result);
    }

    return { init, restart, stop };
})();

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});