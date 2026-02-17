/**
 * EnlightUs Enneagram Assessment — Main Application
 * Handles navigation, scoring, email capture (Mailchimp), and results display
 */

// ======================== STATE ========================
let currentQuestionIndex = 0;
let answers = {};        // { questionId: selectedValue }
let shuffledQuestions = [];

// ======================== SCREEN MANAGEMENT ========================
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  screen.classList.add('active');
  window.scrollTo(0, 0);
}

// ======================== LANDING ========================
function startAssessment() {
  shuffledQuestions = shuffleQuestions();
  currentQuestionIndex = 0;
  answers = {};
  showScreen('screen-assessment');
  renderQuestion();
}

// ======================== ASSESSMENT ========================
function renderQuestion() {
  const q = shuffledQuestions[currentQuestionIndex];
  const total = shuffledQuestions.length;

  // Update counter and progress
  document.getElementById('question-counter').textContent =
    `${currentQuestionIndex + 1} of ${total}`;
  document.getElementById('progress-fill').style.width =
    `${((currentQuestionIndex + 1) / total) * 100}%`;

  // Update prompt with fade
  const prompt = document.getElementById('question-prompt');
  prompt.style.opacity = 0;
  setTimeout(() => {
    prompt.textContent = q.text;
    prompt.style.opacity = 1;
  }, 150);

  // Render Likert options
  const optionsContainer = document.getElementById('answer-options');
  optionsContainer.innerHTML = '';

  LIKERT_OPTIONS.forEach(opt => {
    const div = document.createElement('div');
    div.className = 'answer-option';
    if (answers[q.id] === opt.value) {
      div.classList.add('selected');
    }
    div.innerHTML = `
      <span class="option-indicator"></span>
      <span>${opt.label}</span>
    `;
    div.addEventListener('click', () => selectAnswer(q.id, opt.value));
    optionsContainer.appendChild(div);
  });

  // Update nav buttons
  document.getElementById('btn-back').disabled = currentQuestionIndex === 0;
  updateNextButton();
}

function selectAnswer(questionId, value) {
  answers[questionId] = value;

  // Update visual selection
  const options = document.querySelectorAll('.answer-option');
  options.forEach((opt, i) => {
    opt.classList.toggle('selected', LIKERT_OPTIONS[i].value === value);
  });

  updateNextButton();

  // Auto-advance after short delay
  setTimeout(() => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      nextQuestion();
    }
  }, 350);
}

function updateNextButton() {
  const q = shuffledQuestions[currentQuestionIndex];
  const btn = document.getElementById('btn-next');
  const isLast = currentQuestionIndex === shuffledQuestions.length - 1;

  btn.disabled = !answers[q.id];
  btn.textContent = isLast ? 'See Results →' : 'Next →';
}

function nextQuestion() {
  const q = shuffledQuestions[currentQuestionIndex];
  if (!answers[q.id]) return;

  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    // Assessment complete — show email gate
    showScreen('screen-email');
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

// ======================== EMAIL CAPTURE (MAILCHIMP) ========================
async function submitEmail(e) {
  e.preventDefault();

  const name = document.getElementById('input-name').value.trim();
  const email = document.getElementById('input-email').value.trim();
  const btn = document.getElementById('btn-submit-email');

  if (!name || !email) return;

  // Calculate results before submitting
  const scores = calculateScores();
  const topType = getTopType(scores);

  btn.textContent = 'Loading...';
  btn.disabled = true;

  // Attempt Mailchimp submission via embedded form POST
  try {
    await submitToMailchimp(name, email, topType, scores);
  } catch (err) {
    // Silently continue — don't block results if Mailchimp fails
    console.log('Mailchimp submission note:', err.message);
  }

  // Show results regardless
  showResults(scores, topType);
}

/**
 * Submit to Mailchimp via their embedded form endpoint.
 *
 * SETUP INSTRUCTIONS:
 * 1. In Mailchimp, go to Audience > Signup forms > Embedded forms
 * 2. Copy the form action URL (looks like: https://xxxxx.us1.list-manage.com/subscribe/post?u=XXXXX&id=XXXXX)
 * 3. Replace MAILCHIMP_URL below with your form action URL
 * 4. Optional: Add merge tags in Mailchimp for ETYPE (text) and ESCORE (text) to capture results
 */
const MAILCHIMP_URL = ''; // <-- PASTE YOUR MAILCHIMP FORM ACTION URL HERE

async function submitToMailchimp(name, email, topType, scores) {
  if (!MAILCHIMP_URL) {
    console.log('Mailchimp URL not configured — skipping submission. See setup instructions in app.js.');
    return;
  }

  // Build the Mailchimp-compatible URL with JSONP (to avoid CORS)
  // Mailchimp embedded forms use /post to /post-json for JSONP
  const url = MAILCHIMP_URL
    .replace('/post?', '/post-json?')
    + `&EMAIL=${encodeURIComponent(email)}`
    + `&FNAME=${encodeURIComponent(name)}`
    + `&ETYPE=${encodeURIComponent(`Type ${topType.number}: ${topType.name}`)}`
    + `&ESCORE=${encodeURIComponent(formatScoresForEmail(scores))}`
    + `&c=mailchimpCallback`;

  return new Promise((resolve, reject) => {
    // JSONP approach for cross-origin Mailchimp
    window.mailchimpCallback = function(response) {
      if (response.result === 'success') {
        resolve(response);
      } else {
        reject(new Error(response.msg || 'Mailchimp error'));
      }
      // Cleanup
      delete window.mailchimpCallback;
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    const script = document.createElement('script');
    script.src = url;
    script.onerror = () => {
      reject(new Error('Network error'));
      delete window.mailchimpCallback;
      if (script.parentNode) script.parentNode.removeChild(script);
    };
    document.body.appendChild(script);

    // Timeout after 5s
    setTimeout(() => {
      if (window.mailchimpCallback) {
        reject(new Error('Timeout'));
        delete window.mailchimpCallback;
        if (script.parentNode) script.parentNode.removeChild(script);
      }
    }, 5000);
  });
}

function formatScoresForEmail(scores) {
  return Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .map(([type, score]) => `Type ${type} (${TYPE_NAMES[type]}): ${score}`)
    .join(', ');
}

// ======================== SCORING ========================
function calculateScores() {
  const scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  for (const q of QUESTIONS) {
    if (answers[q.id]) {
      scores[q.type] += answers[q.id];
    }
  }

  return scores;
}

function getTopType(scores) {
  let topScore = 0;
  let topTypeNum = 1;

  for (const [type, score] of Object.entries(scores)) {
    if (score > topScore) {
      topScore = score;
      topTypeNum = parseInt(type);
    }
  }

  return ENNEAGRAM_TYPES[topTypeNum];
}

// ======================== RESULTS ========================
function showResults(scores, topType) {
  document.getElementById('result-type-number').textContent = topType.number;
  document.getElementById('result-type-name').textContent = topType.name;
  document.getElementById('result-type-description').innerHTML = topType.description;

  renderScoreBreakdown(scores, topType.number);
  showScreen('screen-results');
}

function renderScoreBreakdown(scores, topTypeNum) {
  const container = document.getElementById('type-scores');
  const maxScore = 15; // 3 questions * 5 max per question

  const sorted = Object.entries(scores)
    .map(([type, score]) => ({ type: parseInt(type), score }))
    .sort((a, b) => b.score - a.score);

  let html = '<h3>Your Score Breakdown</h3>';

  sorted.forEach(({ type, score }) => {
    const pct = (score / maxScore) * 100;
    const isTop = type === topTypeNum;

    html += `
      <div class="score-row ${isTop ? 'top' : ''}">
        <span class="score-label">Type ${type}: ${TYPE_NAMES[type]}</span>
        <div class="score-bar-track">
          <div class="score-bar-fill ${isTop ? 'top-score' : ''}" style="width: ${pct}%"></div>
        </div>
        <span class="score-value">${score}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ======================== RETAKE ========================
function retakeAssessment() {
  answers = {};
  currentQuestionIndex = 0;
  showScreen('screen-landing');
}

// ======================== KEYBOARD SUPPORT ========================
document.addEventListener('keydown', (e) => {
  // Number keys 1-5 to select answer during assessment
  if (document.getElementById('screen-assessment').classList.contains('active')) {
    const num = parseInt(e.key);
    if (num >= 1 && num <= 5) {
      const q = shuffledQuestions[currentQuestionIndex];
      selectAnswer(q.id, num);
    }
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      nextQuestion();
    }
    if (e.key === 'ArrowLeft') {
      prevQuestion();
    }
  }
});
