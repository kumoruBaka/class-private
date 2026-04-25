/**
 * ======================================================
 *  かな学習 — Main Application Logic
 *  Interactive learning, quiz, and writing practice
 * ======================================================
 */

(() => {
  'use strict';

  // ========== State ==========
  const state = {
    currentView: 'landing',   // 'landing' | 'day' | 'quiz' | 'writing'
    currentDay: null,          // 1-7
    completedDays: new Set(),
    masteredChars: new Set(), // Track individual mastered characters
    quizState: null,
    writingState: null,
  };

  // ========== DOM Cache ==========
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const dom = {
    loadingScreen: $('#loading-screen'),
    app: $('#app'),
    dayNav: $('#day-nav'),
    progressRing: $('#progress-ring-fill'),
    progressPercent: $('#progress-percent'),
    mobileProgressText: $('#mobile-progress-text'),
    viewLanding: $('#view-landing'),
    viewDay: $('#view-day'),
    viewQuiz: $('#view-quiz'),
    viewWriting: $('#view-writing'),
    btnStart: $('#btn-start'),
    btnReset: $('#btn-reset'),
    btnMenu: $('#btn-menu'),
    sidebar: $('#sidebar'),
    sidebarOverlay: $('#sidebar-overlay'),
    mainContent: $('#main-content'),
    heroParticles: $('#hero-particles'),
  };

  // ========== Storage ==========
  const STORAGE_KEY = 'kana_gakushuu_progress';

  const loadProgress = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        state.completedDays = new Set(data.completedDays || []);
        state.masteredChars = new Set(data.masteredChars || []);
      }
    } catch { /* ignore */ }
  };

  const saveProgress = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        completedDays: [...state.completedDays],
        masteredChars: [...state.masteredChars],
      }));
    } catch { /* ignore */ }
  };

  // ========== Audio System ==========
  const speak = (text) => {
    // Switching to Youdao TTS which is generally more stable for short Japanese clips
    const audioUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&le=jap`;
    const audio = new Audio(audioUrl);
    
    audio.play().catch(error => {
      // Fallback to local SpeechSynthesis if the external audio fails (e.g. 404 or No Internet)
      console.warn('External audio failed, falling back to TTS:', error);
      if (!window.speechSynthesis) return;
      
      // Cancel any ongoing speech to avoid overlap
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    });
  };

  // ========== Toast System ==========
  const showToast = (message, type = 'info') => {
    let container = $('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const icons = { success: 'check-circle', error: 'alert-circle', info: 'info' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i data-lucide="${icons[type] || 'info'}" class="toast-icon"></i><span>${message}</span>`;
    container.appendChild(toast);
    
    // Initialize icons for the new toast
    if (window.lucide) lucide.createIcons();
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  };

  // ========== Progress ==========
  const updateProgress = () => {
    const total = CURRICULUM.length;
    const done = state.completedDays.size;
    const pct = Math.round((done / total) * 100);

    // Ring
    const circumference = 2 * Math.PI * 52; // r=52
    const offset = circumference - (pct / 100) * circumference;
    dom.progressRing.style.strokeDashoffset = offset;
    dom.progressPercent.textContent = pct;

    // Mobile
    if (dom.mobileProgressText) {
      dom.mobileProgressText.textContent = `${pct}%`;
    }

    // Nav items
    $$('.day-nav-link').forEach(link => {
      const day = parseInt(link.dataset.day);
      if (state.completedDays.has(day)) {
        link.classList.add('completed');
      } else {
        link.classList.remove('completed');
      }
    });
  };

  // ========== Navigation ==========
  const buildNav = () => {
    // Add SVG gradient definition for the progress ring
    const svgEl = $('.progress-ring');
    if (svgEl) {
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      gradient.id = 'ring-gradient';
      gradient.setAttribute('x1', '0%');
      gradient.setAttribute('y1', '0%');
      gradient.setAttribute('x2', '100%');
      gradient.setAttribute('y2', '100%');
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', '#e8729a');
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', '#8b5cf6');
      gradient.append(stop1, stop2);
      defs.appendChild(gradient);
      svgEl.prepend(defs);
    }

    dom.dayNav.innerHTML = CURRICULUM.map(day => `
      <li class="day-nav-item">
        <button class="day-nav-link ${state.completedDays.has(day.day) ? 'completed' : ''}" data-day="${day.day}" id="nav-day-${day.day}">
          <span class="day-badge">${day.day}</span>
          <span class="day-nav-title">Hari ${day.day}</span>
          <i data-lucide="check" class="day-check"></i>
        </button>
      </li>
    `).join('');

    // Event delegation
    dom.dayNav.addEventListener('click', (e) => {
      const link = e.target.closest('.day-nav-link');
      if (!link) return;
      const day = parseInt(link.dataset.day);
      navigateToDay(day);
      closeMobileSidebar();
    });
  };

  const setActiveNavItem = (day) => {
    $$('.day-nav-link').forEach(l => l.classList.remove('active'));
    if (day) {
      const target = $(`#nav-day-${day}`);
      if (target) target.classList.add('active');
    }
  };

  const switchView = (viewName) => {
    ['viewLanding', 'viewDay', 'viewQuiz', 'viewWriting'].forEach(key => {
      dom[key].classList.remove('active');
    });
    state.currentView = viewName;
    if (viewName === 'landing') dom.viewLanding.classList.add('active');
    else if (viewName === 'day') dom.viewDay.classList.add('active');
    else if (viewName === 'quiz') dom.viewQuiz.classList.add('active');
    else if (viewName === 'writing') dom.viewWriting.classList.add('active');

    // Scroll to top
    dom.mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDay = (dayNum) => {
    const dayData = CURRICULUM.find(d => d.day === dayNum);
    if (!dayData) return;
    state.currentDay = dayNum;
    setActiveNavItem(dayNum);
    renderDayView(dayData);
    switchView('day');
  };

  // ========== Hero Particles ==========
  const spawnParticles = () => {
    const chars = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソ';
    const container = dom.heroParticles;
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('span');
      particle.className = 'hero-particle';
      particle.textContent = chars[Math.floor(Math.random() * chars.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.fontSize = `${1.2 + Math.random() * 2}rem`;
      particle.style.animationDuration = `${12 + Math.random() * 18}s`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.opacity = 0;
      container.appendChild(particle);
    }
  };

  // ========== Render Day View ==========
  const renderDayView = (data) => {
    const isCompleted = state.completedDays.has(data.day);
    dom.viewDay.innerHTML = `
      <div class="day-view-wrapper">
        <div class="day-header">
          <div class="day-header-top">
            <span class="day-number">Hari ke-${data.day}</span>
            ${isCompleted ? '<span style="color:var(--success);font-size:0.85rem;font-weight:600;">✓ Selesai</span>' : ''}
          </div>
          <h1 class="day-title">${data.title}</h1>
          <p class="day-desc">${data.description}</p>

          <div class="objectives-card">
            <div class="objectives-title">🎯 Target Hari Ini</div>
            <ul class="objectives-list">
              ${data.objectives.map(o => `<li>${o}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Hiragana Section -->
        <div class="char-section">
          <h2 class="section-title">
            <span class="section-icon hiragana"><i data-lucide="languages"></i></span>
            Hiragana
          </h2>
          <div class="char-grid" id="hiragana-grid-${data.day}">
            ${data.hiragana.map((h, i) => {
              const isMastered = state.masteredChars.has(h.char);
              return `
              <div class="char-card hiragana ${isMastered ? 'mastered' : ''}" data-type="hiragana" data-index="${i}" data-day="${data.day}" data-char="${h.char}">
                ${isMastered ? '<div class="master-badge"><i data-lucide="check"></i></div>' : ''}
                <div class="char-main">${h.char}</div>
                <div class="char-romaji">${h.romaji}</div>
                <button class="btn-voice" title="Dengarkan Suara"><i data-lucide="volume-2"></i></button>
              </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Katakana Section -->
        <div class="char-section">
          <h2 class="section-title">
            <span class="section-icon katakana"><i data-lucide="type"></i></span>
            Katakana
          </h2>
          <div class="char-grid" id="katakana-grid-${data.day}">
            ${data.katakana.map((k, i) => {
              const isMastered = state.masteredChars.has(k.char);
              return `
              <div class="char-card katakana ${isMastered ? 'mastered' : ''}" data-type="katakana" data-index="${i}" data-day="${data.day}" data-char="${k.char}">
                ${isMastered ? '<div class="master-badge"><i data-lucide="check"></i></div>' : ''}
                <div class="char-main">${k.char}</div>
                <div class="char-romaji">${k.romaji}</div>
                <button class="btn-voice" title="Dengarkan Suara"><i data-lucide="volume-2"></i></button>
              </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Vocabulary Section -->
        <div class="char-section">
          <h2 class="section-title">
            <span class="section-icon vocab"><i data-lucide="book-open"></i></span>
            Kosakata Hari Ini (${data.vocabulary.length} kata)
          </h2>
          <div class="vocab-grid">
            ${data.vocabulary.map(v => `
              <div class="vocab-card">
                <div class="vocab-word">${v.word}</div>
                <div class="vocab-reading">${v.reading}</div>
                <div class="vocab-meaning">${v.meaning}</div>
                ${v.example ? `<div class="vocab-example">${v.example}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Day Actions -->
        <div class="day-actions">
          <button class="btn-primary" id="btn-start-quiz" data-day="${data.day}">
            <i data-lucide="gamepad-2"></i>
            <span>Kuis Membaca</span>
          </button>
          <button class="btn-secondary" id="btn-start-writing" data-day="${data.day}">
            <i data-lucide="pen-tool"></i>
            <span>Latihan Menulis</span>
          </button>
          <button class="btn-secondary btn-success" id="btn-complete-day" data-day="${data.day}" ${isCompleted ? 'disabled style="opacity:0.5"' : ''}>
            <i data-lucide="check-circle-2"></i>
            <span>${isCompleted ? 'Sudah Selesai' : 'Tandai Selesai'}</span>
          </button>
        </div>

        <!-- Navigation between days -->
        <div class="day-actions" style="justify-content: space-between; border-top: none; padding-top: 0.75rem;">
          ${data.day > 1 ? `<button class="btn-secondary btn-sm" id="btn-prev-day" data-day="${data.day - 1}">← Hari ${data.day - 1}</button>` : '<span></span>'}
          ${data.day < CURRICULUM.length ? `<button class="btn-secondary btn-sm" id="btn-next-day" data-day="${data.day + 1}">Hari ${data.day + 1} →</button>` : '<span></span>'}
        </div>
      </div>
    `;

    // Bind events
    bindDayViewEvents(data);

    // Initialize Lucide icons
    if (window.lucide) lucide.createIcons();
  };

  const bindDayViewEvents = (data) => {
    // Char card click → modal
    $$('.char-card', dom.viewDay).forEach(card => {
      const type = card.dataset.type;
      const index = parseInt(card.dataset.index);
      const dayNum = parseInt(card.dataset.day);
      const dayData = CURRICULUM.find(d => d.day === dayNum);
      const charData = type === 'hiragana' ? dayData.hiragana[index] : dayData.katakana[index];

      // Click for modal
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-voice')) return; // ignore if voice btn clicked
        openCharModal(charData, type);
      });

      // Voice btn
      const voiceBtn = $('.btn-voice', card);
      if (voiceBtn) {
        voiceBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          speak(charData.char);
        });
      }
    });

    // Quiz button
    const quizBtn = $('#btn-start-quiz', dom.viewDay);
    if (quizBtn) {
      quizBtn.addEventListener('click', () => startQuiz(data.day));
    }

    // Writing button
    const writingBtn = $('#btn-start-writing', dom.viewDay);
    if (writingBtn) {
      writingBtn.addEventListener('click', () => startWriting(data.day));
    }

    // Complete button
    const completeBtn = $('#btn-complete-day', dom.viewDay);
    if (completeBtn && !completeBtn.disabled) {
      completeBtn.addEventListener('click', () => {
        state.completedDays.add(data.day);
        saveProgress();
        updateProgress();
        showToast(`Hari ${data.day} selesai! おめでとう！`, 'success');
        renderDayView(data); // re-render
      });
    }

    // Prev/Next
    const prevBtn = $('#btn-prev-day', dom.viewDay);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateToDay(parseInt(prevBtn.dataset.day)));
    const nextBtn = $('#btn-next-day', dom.viewDay);
    if (nextBtn) nextBtn.addEventListener('click', () => navigateToDay(parseInt(nextBtn.dataset.day)));
  };

  // ========== Character Modal ==========
  const openCharModal = (charData, type) => {
    const isMastered = state.masteredChars.has(charData.char);
    const overlay = document.createElement('div');
    overlay.className = 'char-modal-overlay';
    overlay.innerHTML = `
      <div class="char-modal">
        <button class="char-modal-close">✕</button>
        <div class="char-modal-char ${type}">${charData.char}</div>
        <div class="char-modal-romaji">${charData.romaji}</div>
        
        <div style="margin-bottom: 1rem;">
          <button class="btn-primary btn-sm" id="btn-modal-speak">
            <i data-lucide="volume-2"></i>
            Dengarkan
          </button>
        </div>

        <div class="char-modal-info">
          <div class="char-modal-row">
            <span class="char-modal-label">Kuasai Huruf Ini?</span>
            <label class="switch-container">
              <input type="checkbox" id="check-mastery" ${isMastered ? 'checked' : ''}>
              <span class="switch-label">${isMastered ? 'Sudah Dikuasai ✓' : 'Belum Dikuasai'}</span>
            </label>
          </div>
          <div class="char-modal-row">
            <span class="char-modal-label">Tipe</span>
            <span class="char-modal-value">${type === 'hiragana' ? 'Hiragana' : 'Katakana'}</span>
          </div>
        </div>
        <div class="char-modal-hint">
          <strong>💡 Tips:</strong><br>${charData.hint}
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Mastery toggle
    const masteryCheck = $('#check-mastery', overlay);
    masteryCheck.addEventListener('change', (e) => {
      if (e.target.checked) {
        state.masteredChars.add(charData.char);
        $('.switch-label', overlay).textContent = 'Sudah Dikuasai ✓';
      } else {
        state.masteredChars.delete(charData.char);
        $('.switch-label', overlay).textContent = 'Belum Dikuasai';
      }
      saveProgress();
      updateProgress();
      renderDayView(CURRICULUM.find(d => d.day === state.currentDay));
      if (window.lucide) lucide.createIcons();
    });

    // Speak button
    $('#btn-modal-speak', overlay).addEventListener('click', () => speak(charData.char));

    // Close events
    const close = () => {
      overlay.style.animation = 'none';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 200);
    };
    overlay.querySelector('.char-modal-close').addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    
    // Initialize Lucide icons for modal
    if (window.lucide) lucide.createIcons();

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', escHandler);
      }
    });
  };

  // ========== Quiz System ==========
  const startQuiz = (dayNum) => {
    const dayData = CURRICULUM.find(d => d.day === dayNum);
    if (!dayData) return;

    // Build question pool from both hiragana and katakana
    const questions = [];
    for (const h of dayData.hiragana) {
      questions.push({ char: h.char, answer: h.romaji, type: 'Hiragana' });
    }
    for (const k of dayData.katakana) {
      questions.push({ char: k.char, answer: k.romaji, type: 'Katakana' });
    }

    // Shuffle
    shuffleArray(questions);

    // Limit to 15 questions max to keep quizzes manageable
    const limited = questions.slice(0, 15);

    state.quizState = {
      dayNum,
      questions: limited,
      currentIndex: 0,
      score: 0,
      total: limited.length,
    };

    renderQuiz();
    switchView('quiz');
  };

  const renderQuiz = () => {
    const qs = state.quizState;
    if (qs.currentIndex >= qs.total) {
      renderQuizResults();
      return;
    }

    const question = qs.questions[qs.currentIndex];
    const correctAnswer = question.answer;

    // Generate wrong options from a pool
    const allRomaji = ['a','i','u','e','o','ka','ki','ku','ke','ko','sa','shi','su','se','so',
      'ta','chi','tsu','te','to','na','ni','nu','ne','no','ha','hi','fu','he','ho',
      'ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','n',
      'ga','gi','gu','ge','go','za','ji','zu','ze','zo','da','de','do',
      'ba','bi','bu','be','bo','pa','pi','pu','pe','po',
      'kya','kyu','kyo','sha','shu','sho','cha','chu','cho','nya','nyu','nyo',
      'hya','hyu','hyo','mya','myu','myo','rya','ryu','ryo','gya','ja','bya','pya'];

    const wrongPool = allRomaji.filter(r => r !== correctAnswer);
    shuffleArray(wrongPool);
    const options = [correctAnswer, ...wrongPool.slice(0, 3)];
    shuffleArray(options);

    dom.viewQuiz.innerHTML = `
      <div class="quiz-wrapper">
        <div class="quiz-header">
          <button class="btn-secondary btn-sm" id="btn-quiz-back" style="margin-bottom:1rem;">← Kembali ke Hari ${qs.dayNum}</button>
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${(qs.currentIndex / qs.total) * 100}%"></div>
          </div>
          <div class="quiz-question-count">Soal ${qs.currentIndex + 1} dari ${qs.total}</div>
        </div>

        <div class="quiz-card">
          <div class="quiz-char">${question.char}</div>
          <div class="quiz-type-label">${question.type}</div>
        </div>

        <div class="quiz-options" id="quiz-options">
          ${options.map((opt, i) => `
            <button class="quiz-option" data-answer="${opt}" id="quiz-opt-${i}">${opt}</button>
          `).join('')}
        </div>

        <div class="quiz-feedback" id="quiz-feedback"></div>
      </div>
    `;

    // Bind option clicks
    $$('.quiz-option', dom.viewQuiz).forEach(btn => {
      btn.addEventListener('click', () => handleQuizAnswer(btn, correctAnswer));
    });

    // Back button
    $('#btn-quiz-back', dom.viewQuiz).addEventListener('click', () => {
      navigateToDay(qs.dayNum);
    });
  };

  const handleQuizAnswer = (btn, correctAnswer) => {
    const qs = state.quizState;
    const selected = btn.dataset.answer;
    const feedback = $('#quiz-feedback', dom.viewQuiz);

    // Disable all options
    $$('.quiz-option', dom.viewQuiz).forEach(o => o.classList.add('disabled'));

    if (selected === correctAnswer) {
      btn.classList.add('correct');
      feedback.textContent = 'せいかい！ (Benar!) 🎉';
      feedback.className = 'quiz-feedback correct';
      qs.score++;
    } else {
      btn.classList.add('wrong');
      // Show correct answer
      $$('.quiz-option', dom.viewQuiz).forEach(o => {
        if (o.dataset.answer === correctAnswer) o.classList.add('correct');
      });
      feedback.textContent = `ざんねん... Jawabannya: ${correctAnswer}`;
      feedback.className = 'quiz-feedback wrong';
    }

    // Next question after delay
    setTimeout(() => {
      qs.currentIndex++;
      renderQuiz();
    }, 1200);
  };

  const renderQuizResults = () => {
    const qs = state.quizState;
    const pct = Math.round((qs.score / qs.total) * 100);
    let emoji, msg;

    if (pct >= 90) {
      emoji = '🏆';
      msg = 'すごい！Luar biasa! Kamu sudah menguasai huruf hari ini!';
    } else if (pct >= 70) {
      emoji = '🌸';
      msg = 'いいね！Bagus! Sedikit lagi sempurna. Coba ulangi sekali lagi?';
    } else if (pct >= 50) {
      emoji = '💪';
      msg = 'がんばって！Terus berlatih, kamu pasti bisa!';
    } else {
      emoji = '📖';
      msg = 'もういちど！Ayo baca ulang materi dan coba lagi!';
    }

    dom.viewQuiz.innerHTML = `
      <div class="quiz-wrapper">
        <div class="quiz-results">
          <div class="quiz-results-icon">${emoji}</div>
          <div class="quiz-results-title">Hasil Kuis — Hari ${qs.dayNum}</div>
          <div class="quiz-results-score">${qs.score}/${qs.total}</div>
          <p class="quiz-results-msg">${msg}</p>
          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <button class="btn-primary" id="btn-quiz-retry">🔄 Coba Lagi</button>
            <button class="btn-secondary" id="btn-quiz-back-results">← Kembali</button>
          </div>
        </div>
      </div>
    `;

    // Confetti for high scores
    if (pct >= 80) spawnConfetti();

    $('#btn-quiz-retry', dom.viewQuiz).addEventListener('click', () => startQuiz(qs.dayNum));
    $('#btn-quiz-back-results', dom.viewQuiz).addEventListener('click', () => navigateToDay(qs.dayNum));
  };

  // ========== Writing Practice ==========
  const startWriting = (dayNum) => {
    const dayData = CURRICULUM.find(d => d.day === dayNum);
    if (!dayData) return;

    // Combine hiragana + katakana that have strokes > 0
    const chars = [
      ...dayData.hiragana.filter(h => h.strokes > 0).map(h => ({ ...h, type: 'Hiragana' })),
      ...dayData.katakana.filter(k => k.strokes > 0).map(k => ({ ...k, type: 'Katakana' })),
    ];

    if (chars.length === 0) {
      showToast('Tidak ada huruf untuk latihan menulis di hari ini (kombinasi huruf)', 'info');
      return;
    }

    state.writingState = {
      dayNum,
      chars,
      currentIndex: 0,
    };

    renderWriting();
    switchView('writing');
  };

  const renderWriting = () => {
    const ws = state.writingState;
    const char = ws.chars[ws.currentIndex];

    dom.viewWriting.innerHTML = `
      <div class="writing-wrapper">
        <div style="margin-bottom: 1.5rem;">
          <button class="btn-secondary btn-sm" id="btn-writing-back">← Kembali ke Hari ${ws.dayNum}</button>
        </div>

        <h2 class="section-title">
          <span class="section-icon ${char.type === 'Hiragana' ? 'hiragana' : 'katakana'}">${char.type === 'Hiragana' ? 'あ' : 'ア'}</span>
          Latihan Menulis — ${char.type}
        </h2>

        <div class="writing-char-display">
          <div class="writing-reference">
            <div class="writing-ref-char">${char.char}</div>
            <div class="writing-ref-romaji">${char.romaji}</div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.5rem;">${char.strokes} goresan</div>
          </div>

          <div class="canvas-container" id="canvas-container">
            <canvas class="writing-canvas" id="writing-canvas" width="300" height="300"></canvas>
            <div class="canvas-actions">
              <button id="btn-canvas-clear" title="Hapus">🗑</button>
              <button id="btn-canvas-undo" title="Undo">↩</button>
            </div>
          </div>
        </div>

        <div class="char-modal-hint" style="margin-bottom: 1.5rem;">
          <strong>💡 Tips:</strong> ${char.hint}
        </div>

        <div class="writing-nav">
          <button class="btn-secondary btn-sm" id="btn-writing-prev" ${ws.currentIndex === 0 ? 'disabled style="opacity:0.4"' : ''}>← Sebelumnya</button>
          <span class="writing-counter">${ws.currentIndex + 1} / ${ws.chars.length}</span>
          <button class="btn-primary btn-sm" id="btn-writing-next" ${ws.currentIndex >= ws.chars.length - 1 ? 'disabled style="opacity:0.4"' : ''}>Selanjutnya →</button>
        </div>
      </div>
    `;

    initCanvas();

    // Bind nav
    $('#btn-writing-back', dom.viewWriting).addEventListener('click', () => navigateToDay(ws.dayNum));
    const prevBtn = $('#btn-writing-prev', dom.viewWriting);
    if (prevBtn && !prevBtn.disabled) {
      prevBtn.addEventListener('click', () => { ws.currentIndex--; renderWriting(); });
    }
    const nextBtn = $('#btn-writing-next', dom.viewWriting);
    if (nextBtn && !nextBtn.disabled) {
      nextBtn.addEventListener('click', () => { ws.currentIndex++; renderWriting(); });
    }
  };

  // ========== Canvas Drawing ==========
  const initCanvas = () => {
    const canvas = $('#writing-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let paths = [];
    let currentPath = [];

    // High DPI support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);

    // Draw guide grid
    const drawGrid = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
      ctx.lineWidth = 1;
      // Center cross
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(rect.width / 2, 0);
      ctx.lineTo(rect.width / 2, rect.height);
      ctx.moveTo(0, rect.height / 2);
      ctx.lineTo(rect.width, rect.height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Redraw all paths
      for (const path of paths) {
        drawPath(path);
      }
    };

    const drawPath = (pathPoints) => {
      if (pathPoints.length < 2) return;
      ctx.strokeStyle = '#e8729a';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
      for (let i = 1; i < pathPoints.length; i++) {
        ctx.lineTo(pathPoints[i].x, pathPoints[i].y);
      }
      ctx.stroke();
    };

    const getPos = (e) => {
      const canvasRect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return { x: clientX - canvasRect.left, y: clientY - canvasRect.top };
    };

    const startDraw = (e) => {
      e.preventDefault();
      drawing = true;
      currentPath = [getPos(e)];
    };
    const moveDraw = (e) => {
      e.preventDefault();
      if (!drawing) return;
      const pos = getPos(e);
      currentPath.push(pos);
      drawGrid();
      drawPath(currentPath);
    };
    const endDraw = (e) => {
      if (e) e.preventDefault();
      if (!drawing) return;
      drawing = false;
      if (currentPath.length > 1) {
        paths.push([...currentPath]);
      }
      currentPath = [];
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', moveDraw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mouseleave', endDraw);
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', moveDraw, { passive: false });
    canvas.addEventListener('touchend', endDraw, { passive: false });

    drawGrid();

    // Clear / Undo
    const clearBtn = $('#btn-canvas-clear');
    const undoBtn = $('#btn-canvas-undo');
    if (clearBtn) clearBtn.addEventListener('click', () => { paths = []; drawGrid(); });
    if (undoBtn) undoBtn.addEventListener('click', () => { paths.pop(); drawGrid(); });
  };

  // ========== Confetti ==========
  const spawnConfetti = () => {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#e8729a', '#8b5cf6', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = `${6 + Math.random() * 8}px`;
      piece.style.height = `${6 + Math.random() * 8}px`;
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.animationDuration = `${1.5 + Math.random() * 2}s`;
      piece.style.animationDelay = `${Math.random() * 0.5}s`;
      container.appendChild(piece);
    }
    setTimeout(() => container.remove(), 4000);
  };

  // ========== Utility ==========
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // ========== Mobile Sidebar ==========
  const openMobileSidebar = () => {
    dom.sidebar.classList.add('open');
    dom.sidebarOverlay.classList.add('visible');
    dom.btnMenu.classList.add('active');
  };

  const closeMobileSidebar = () => {
    dom.sidebar.classList.remove('open');
    dom.sidebarOverlay.classList.remove('visible');
    dom.btnMenu.classList.remove('active');
  };

  // ========== Init ==========
  const init = () => {
    loadProgress();
    buildNav();
    updateProgress();
    spawnParticles();

    // Start button
    dom.btnStart.addEventListener('click', () => {
      navigateToDay(1);
    });

    // Initialize initial icons
    if (window.lucide) lucide.createIcons();

    // Reset button
    dom.btnReset.addEventListener('click', () => {
      if (confirm('Reset semua progress? Ini tidak bisa dibatalkan.')) {
        state.completedDays.clear();
        saveProgress();
        updateProgress();
        buildNav();
        switchView('landing');
        setActiveNavItem(null);
        showToast('Progress telah direset', 'info');
      }
    });

    // Mobile menu
    dom.btnMenu.addEventListener('click', () => {
      if (dom.sidebar.classList.contains('open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
    dom.sidebarOverlay.addEventListener('click', closeMobileSidebar);

    // Loading screen
    setTimeout(() => {
      dom.loadingScreen.classList.add('fade-out');
      dom.app.classList.remove('hidden');
      dom.app.classList.add('visible');
    }, 2000);
  };

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
