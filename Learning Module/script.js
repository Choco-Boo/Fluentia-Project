const matchData = [
  { word: 'Airport', trans: 'Aeropuerto' },
  { word: 'Passport', trans: 'Pasaporte' },
  { word: 'Suitcase', trans: 'Maleta' },
  { word: 'Hotel', trans: 'Hotel' },
  { word: 'Ticket', trans: 'Billete' },
];

const passage = `María is planning her first trip abroad. She packs her suitcase carefully — clothes for warm weather, her camera, and her passport. At the airport, she checks in at the counter and gets her boarding pass. The flight takes off on time. When she arrives, she takes a taxi to her hotel. The receptionist greets her warmly and hands over the room key. María smiles: the adventure has finally begun.`;

const questions = [
  {
    q: 'What does María remember to pack before her trip?',
    options: ['Her laptop', 'Her passport', 'Her bicycle'],
    answer: 1,
  },
  {
    q: 'Where does María get her boarding pass?',
    options: ['At the hotel', 'On the plane', 'At the check-in counter'],
    answer: 2,
  },
  {
    q: 'How does María feel when she arrives at the hotel?',
    options: ['Nervous and tired', 'Happy and excited', 'Confused and lost'],
    answer: 1,
  },
];

/* ════════════════════════════════════
MIX & MATCH LOGIC
════════════════════════════════════ */

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const wordsRow = document.getElementById('words-row');
const transRow = document.getElementById('trans-row');
const matchBtn = document.getElementById('match-btn');
const matchFb = document.getElementById('match-feedback');
const matchScore = document.getElementById('match-score');
const matchProg = document.getElementById('match-progress');

let selectedWord = null;
let selectedTrans = null;
let matchedCount = 0;

const shuffledWords = shuffle(matchData);
const shuffledTrans = shuffle(matchData);

shuffledWords.forEach(({ word }) => {
  const el = document.createElement('div');
  el.className = 'match-card';
  el.textContent = word;
  el.dataset.word = word;
  el.dataset.type = 'word';
  el.addEventListener('click', () => handleCardClick(el));
  wordsRow.appendChild(el);
});

shuffledTrans.forEach(({ trans, word }) => {
  const el = document.createElement('div');
  el.className = 'match-card';
  el.textContent = trans;
  el.dataset.word = word;
  el.dataset.type = 'trans';
  el.addEventListener('click', () => handleCardClick(el));
  transRow.appendChild(el);
});

function handleCardClick(el) {
  if (el.classList.contains('matched')) return;

  const type = el.dataset.type;

  if (type === 'word') {
    if (selectedWord) selectedWord.classList.remove('selected');
    selectedWord = el;
    el.classList.add('selected');
  } else {
    if (selectedTrans) selectedTrans.classList.remove('selected');
    selectedTrans = el;
    el.classList.add('selected');
  }

  if (selectedWord && selectedTrans) matchBtn.disabled = false;
}

matchBtn.addEventListener('click', () => {
  if (!selectedWord || !selectedTrans) return;

  const isMatch =
    selectedWord.dataset.word === selectedTrans.dataset.word;

  if (isMatch) {
    selectedWord.classList.add('matched');
    selectedTrans.classList.add('matched');

    selectedWord.classList.remove('selected');
    selectedTrans.classList.remove('selected');

    matchedCount++;

    const pct = Math.round(
      (matchedCount / matchData.length) * 100
    );

    matchProg.style.width = pct + '%';

    matchScore.innerHTML =
      `⭐ ${matchedCount} / ${matchData.length} pairs matched`;

    showFeedback(matchFb, '✓ Great match!', true);

    if (matchedCount === matchData.length) {
      matchBtn.textContent = '🎉 Continue';
      matchBtn.disabled = false;

      matchBtn.onclick = () => {
        document.getElementById('screen-1').style.display = 'none';
        document.getElementById('screen-2').style.display = 'block';
      };
    } else {
      matchBtn.disabled = true;
    }
  } else {
    showFeedback(matchFb, '✗ Try again', false);
  }

  selectedWord = null;
  selectedTrans = null;
});

/* ════════════════════════════════════
READING LOGIC
════════════════════════════════════ */

document.getElementById('passage-text').textContent = passage;
document.getElementById('q-total').textContent =
  questions.length;

const readBtn = document.getElementById('read-btn');
const readFb = document.getElementById('read-feedback');
const readProg = document.getElementById('read-progress');

let currentQ = 0;
let selectedAns = null;

function renderQuestion(idx) {
  const { q, options } = questions[idx];

  document.getElementById('q-num').textContent = idx + 1;
  document.getElementById('question-text').textContent = q;

  const grid = document.getElementById('answer-grid');
  grid.innerHTML = '';

  selectedAns = null;
  readBtn.disabled = true;
  readFb.classList.remove('show');

  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = opt;

    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.answer-btn')
        .forEach((b) => b.classList.remove('selected'));

      btn.classList.add('selected');
      selectedAns = i;
      readBtn.disabled = false;
    });

    grid.appendChild(btn);
  });
}

readBtn.addEventListener('click', () => {
  const { answer } = questions[currentQ];

  const correct = selectedAns === answer;

  showFeedback(
    readFb,
    correct ? '✓ Correct!' : '✗ Try again',
    correct
  );

  if (correct) {

    document.getElementById('answer-grid').innerHTML = '';
    document.getElementById('question-text').textContent = '';

    currentQ++;

    setTimeout(() => {
      if (currentQ < questions.length) {

        readProg.style.width =
          (currentQ / questions.length) * 100 + '%';

        renderQuestion(currentQ);

      } else {

        readProg.style.width = '100%';

        showFeedback(
          readFb,
          '🏆 Lesson Complete!',
          true
        );

        readBtn.style.display = 'none';
      }
    }, 600);

  } else {
    setTimeout(() => {
      renderQuestion(currentQ);
    }, 800);
  }
});

renderQuestion(0);

/* ════════════════════════════════════
UTIL
════════════════════════════════════ */

function showFeedback(el, msg, good) {
  el.textContent = msg;
  el.className =
    'feedback show ' + (good ? 'correct-fb' : 'wrong-fb');
}