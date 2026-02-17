/**
 * Enneagram Assessment Questions
 * 27 questions — 3 per type, randomized order
 * Each question has 5 Likert-scale response options
 *
 * Scoring: Each question maps to a type (1-9).
 * Responses: 1 = Rarely, 2 = Sometimes, 3 = Often, 4 = Usually, 5 = Almost Always
 */

const QUESTIONS = [
  // --- Type 1: The Reformer ---
  {
    id: 1,
    type: 1,
    text: "I have a strong inner sense of what is right and wrong, and I hold myself to high standards."
  },
  {
    id: 2,
    type: 1,
    text: "I notice mistakes and imperfections that others tend to overlook."
  },
  {
    id: 3,
    type: 1,
    text: "I feel a sense of responsibility to improve things and make them the way they should be."
  },

  // --- Type 2: The Helper ---
  {
    id: 4,
    type: 2,
    text: "I naturally tune in to what others need, often before they ask."
  },
  {
    id: 5,
    type: 2,
    text: "I feel most fulfilled when I know I've made a meaningful difference in someone's life."
  },
  {
    id: 6,
    type: 2,
    text: "I sometimes find it easier to express care for others than to acknowledge my own needs."
  },

  // --- Type 3: The Achiever ---
  {
    id: 7,
    type: 3,
    text: "I am highly motivated by goals and feel energized when I'm making progress."
  },
  {
    id: 8,
    type: 3,
    text: "I naturally adapt how I present myself depending on the situation or audience."
  },
  {
    id: 9,
    type: 3,
    text: "Being seen as competent and successful is important to how I feel about myself."
  },

  // --- Type 4: The Individualist ---
  {
    id: 10,
    type: 4,
    text: "I often feel that something important is missing from my life, even when things are going well."
  },
  {
    id: 11,
    type: 4,
    text: "I experience emotions more intensely than most people around me."
  },
  {
    id: 12,
    type: 4,
    text: "Authenticity and self-expression are deeply important to me — I resist being ordinary."
  },

  // --- Type 5: The Investigator ---
  {
    id: 13,
    type: 5,
    text: "I need significant time alone to recharge and process my thoughts."
  },
  {
    id: 14,
    type: 5,
    text: "I prefer to observe and understand a situation thoroughly before getting involved."
  },
  {
    id: 15,
    type: 5,
    text: "I tend to minimize my needs and guard my time, energy, and personal space carefully."
  },

  // --- Type 6: The Loyalist ---
  {
    id: 16,
    type: 6,
    text: "I tend to anticipate what could go wrong and prepare for potential problems."
  },
  {
    id: 17,
    type: 6,
    text: "Trust and loyalty are central to my relationships — once committed, I'm deeply devoted."
  },
  {
    id: 18,
    type: 6,
    text: "I often question authority or seek reassurance before making important decisions."
  },

  // --- Type 7: The Enthusiast ---
  {
    id: 19,
    type: 7,
    text: "I am energized by new ideas, possibilities, and future plans."
  },
  {
    id: 20,
    type: 7,
    text: "I find it challenging to stay with uncomfortable feelings — I prefer to move toward something positive."
  },
  {
    id: 21,
    type: 7,
    text: "I tend to keep my options open and resist anything that feels limiting or confining."
  },

  // --- Type 8: The Challenger ---
  {
    id: 22,
    type: 8,
    text: "I have a strong presence and I'm not afraid to take charge when the situation calls for it."
  },
  {
    id: 23,
    type: 8,
    text: "I value directness and can become frustrated when people are indirect or withhold the truth."
  },
  {
    id: 24,
    type: 8,
    text: "I instinctively protect the people and things I care about, and I stand up against injustice."
  },

  // --- Type 9: The Peacemaker ---
  {
    id: 25,
    type: 9,
    text: "I tend to go along with others to maintain harmony, even if I have a different preference."
  },
  {
    id: 26,
    type: 9,
    text: "I can see multiple perspectives easily and often have trouble knowing what I truly want."
  },
  {
    id: 27,
    type: 9,
    text: "Inner peace and stability are what I value most — I avoid conflict whenever possible."
  }
];

// Likert scale options
const LIKERT_OPTIONS = [
  { value: 1, label: "Rarely" },
  { value: 2, label: "Sometimes" },
  { value: 3, label: "Often" },
  { value: 4, label: "Usually" },
  { value: 5, label: "Almost Always" }
];

// Shuffle questions for each session (Fisher-Yates)
function shuffleQuestions() {
  const shuffled = [...QUESTIONS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
