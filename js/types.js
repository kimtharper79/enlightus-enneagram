/**
 * Enneagram Type Descriptions
 * Used on the results screen to display personalized insights
 */

const ENNEAGRAM_TYPES = {
  1: {
    number: 1,
    name: "The Reformer",
    subtitle: "Principled, purposeful, self-controlled, and perfectionistic",
    description: `
      <h3>Core Motivation</h3>
      <p>You are driven by a deep desire to live with integrity and to make the world a better place. Your inner compass is finely tuned, and you hold yourself — and often others — to high standards of excellence. At your best, you bring wisdom, discernment, and moral courage to everything you do.</p>

      <h3>Key Strengths</h3>
      <ul>
        <li>Strong sense of purpose and ethics</li>
        <li>Detail-oriented and thorough</li>
        <li>Reliable, responsible, and disciplined</li>
        <li>Committed to continuous improvement</li>
      </ul>

      <h3>Growth Edge</h3>
      <p>Your invitation is to practice self-compassion and to recognize that imperfection is part of being human. Learning to soften the inner critic and embrace "good enough" can free tremendous energy for joy and creativity.</p>
    `
  },
  2: {
    number: 2,
    name: "The Helper",
    subtitle: "Generous, demonstrative, people-pleasing, and possessive",
    description: `
      <h3>Core Motivation</h3>
      <p>You are motivated by a desire to be loved and needed. Your natural warmth and attentiveness allow you to create deep connections with others. You have an intuitive gift for sensing what people need, and you derive genuine satisfaction from being of service.</p>

      <h3>Key Strengths</h3>
      <ul>
        <li>Deeply empathetic and emotionally intelligent</li>
        <li>Generous with time, energy, and attention</li>
        <li>Skilled at building and nurturing relationships</li>
        <li>Ability to draw out the best in others</li>
      </ul>

      <h3>Growth Edge</h3>
      <p>Your invitation is to turn that same quality of care inward. Recognizing and honoring your own needs — without guilt — is essential for sustainable giving. You are worthy of love not because of what you do, but simply because of who you are.</p>
    `
  },
  3: {
    number: 3,
    name: "The Achiever",
    subtitle: "Adaptable, excelling, driven, and image-conscious",
    description: `
      <h3>Core Motivation</h3>
      <p>You are driven by a desire to be valuable and worthwhile. Your natural energy, focus, and adaptability make you highly effective at setting and reaching goals. You inspire others with your confidence and your ability to get things done.</p>

      <h3>Key Strengths</h3>
      <ul>
        <li>Goal-oriented with strong follow-through</li>
        <li>Highly adaptable and socially skilled</li>
        <li>Energetic, optimistic, and motivating</li>
        <li>Able to rally teams and drive results</li>
      </ul>

      <h3>Growth Edge</h3>
      <p>Your invitation is to slow down long enough to discover who you are beneath the roles and accomplishments. True worth isn't earned through performance — it's inherent. When you connect with your authentic self, your achievements become even more meaningful.</p>
    `
  },
  4: {
    number: 4,
    name: "The Individualist",
    subtitle: "Expressive, dramatic, self-absorbed, and temperamental",
    description: `
      <h3>Core Motivation</h3>
      <p>You are driven by a desire to find yourself and your significance — to create an identity that is authentically your own. Your rich inner world allows you to experience life with depth and beauty. You bring creativity, emotional honesty, and a willingness to sit with the full spectrum of human experience.</p>

      <h3>Key Strengths</h3>
      <ul>
        <li>Deeply creative and original</li>
        <li>Emotionally honest and self-aware</li>
        <li>Comfortable with complexity and nuance</li>
        <li>Brings beauty and meaning to experiences</li>
      </ul>

      <h3>Growth Edge</h3>
      <p>Your invitation is to find equanimity — to experience your emotions without being defined by them. Recognizing that your identity isn't dependent on feeling unique can free you to connect more deeply with others and with the present moment.</p>
    `
  },
  5: {
    number: 5,
    name: "The Investigator",
    subtitle: "Perceptive, innovative, secretive, and isolated",
    description: `
      <h3>Core Motivation</h3>
      <p>You are driven by a desire to be capable, competent, and to understand the world around you. Your mind is your greatest asset — you bring clarity, objectivity, and original thinking to complex problems. You value independence and are energized by mastering subjects that fascinate you.</p>

      <h3>Key Strengths</h3>
      <ul>
        <li>Insightful, analytical, and objective</li>
        <li>Independent thinker and innovator</li>
        <li>Calm and collected under pressure</li>
        <li>Deep expertise in areas of interest</li>
      </ul>

      <h3>Growth Edge</h3>
      <p>Your invitation is to engage more fully with the world — to share your knowledge, connect with others emotionally, and trust that your resources (time, energy, competence) are sufficient. You have more capacity than you think.</p>
    `
  },
  6: {
    number: 6,
    name: "The Loyalist",
    subtitle: "Engaging, responsible, anxious, and suspicious",
    description: `
      <h3>Core Motivation</h3>
      <p>You are driven by a desire for security, support, and guidance. Your gift is the ability to foresee potential problems and prepare for them. You bring loyalty, courage, and a deep commitment to the people and causes you believe in.</p>

      <h3>Key Strengths</h3>
      <ul>
        <li>Deeply loyal and committed in relationships</li>
        <li>Excellent at troubleshooting and risk assessment</li>
        <li>Responsible, hardworking, and dependable</li>
        <li>Courageous when advocating for the underdog</li>
      </ul>

      <h3>Growth Edge</h3>
      <p>Your invitation is to cultivate trust — in yourself, in others, and in life. The security you seek is ultimately an inner quality. When you learn to access your own inner guidance and courage, you become a powerful, grounded presence.</p>
    `
  },
  7: {
    number: 7,
    name: "The Enthusiast",
    subtitle: "Spontaneous, versatile, acquisitive, and scattered",
    description: `
      <h3>Core Motivation</h3>
      <p>You are driven by a desire to be happy, stimulated, and free from pain and limitation. Your natural optimism, quick mind, and zest for life are infectious. You bring joy, creativity, and vision to everything you touch.</p>

      <h3>Key Strengths</h3>
      <ul>
        <li>Optimistic, enthusiastic, and future-oriented</li>
        <li>Highly creative with a quick, synthesizing mind</li>
        <li>Adventurous and open to new experiences</li>
        <li>Ability to reframe challenges positively</li>
      </ul>

      <h3>Growth Edge</h3>
      <p>Your invitation is to stay present — especially with the difficult or uncomfortable feelings you naturally want to avoid. True satisfaction comes not from the next experience, but from fully inhabiting the one you're in. Depth, not just breadth, is your path to fulfillment.</p>
    `
  },
  8: {
    number: 8,
    name: "The Challenger",
    subtitle: "Self-confident, decisive, willful, and confrontational",
    description: `
      <h3>Core Motivation</h3>
      <p>You are driven by a desire to be strong, to protect yourself and those you care about, and to make an impact. Your natural intensity, directness, and willingness to take charge make you a powerful leader and advocate. You bring vitality, decisiveness, and a commitment to justice.</p>

      <h3>Key Strengths</h3>
      <ul>
        <li>Decisive, confident, and action-oriented</li>
        <li>Protective and loyal to inner circle</li>
        <li>Honest, direct, and forthright</li>
        <li>Natural leader who empowers others</li>
      </ul>

      <h3>Growth Edge</h3>
      <p>Your invitation is to embrace vulnerability as a form of strength. Allowing yourself to be tender, to need others, and to surrender control can open you to a deeper experience of love and connection. Your power is most magnetic when paired with openheartedness.</p>
    `
  },
  9: {
    number: 9,
    name: "The Peacemaker",
    subtitle: "Receptive, reassuring, agreeable, and complacent",
    description: `
      <h3>Core Motivation</h3>
      <p>You are driven by a desire for inner and outer peace — to maintain harmony and avoid conflict. Your gift is the ability to see all perspectives, to create a calm and inclusive atmosphere, and to bring people together. You have a gentle strength that is both grounding and healing for those around you.</p>

      <h3>Key Strengths</h3>
      <ul>
        <li>Excellent mediator and bridge-builder</li>
        <li>Patient, accepting, and non-judgmental</li>
        <li>Calm, steady, and grounding presence</li>
        <li>Able to see and hold multiple perspectives</li>
      </ul>

      <h3>Growth Edge</h3>
      <p>Your invitation is to wake up to your own desires, opinions, and priorities. Your voice and your presence matter. Learning to say "this is what I want" — even when it creates friction — is essential for stepping into your full power and living a life that is truly your own.</p>
    `
  }
};

const TYPE_NAMES = {
  1: "The Reformer",
  2: "The Helper",
  3: "The Achiever",
  4: "The Individualist",
  5: "The Investigator",
  6: "The Loyalist",
  7: "The Enthusiast",
  8: "The Challenger",
  9: "The Peacemaker"
};
