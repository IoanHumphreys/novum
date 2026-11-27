// Static content: milestones, health timelines, goal presets, pickers.

export const MILESTONES = [
  { days: 1, label: '1 day', short: '1d' },
  { days: 3, label: '3 days', short: '3d' },
  { days: 7, label: '1 week', short: '1w' },
  { days: 14, label: '2 weeks', short: '2w' },
  { days: 30, label: '1 month', short: '1m' },
  { days: 90, label: '3 months', short: '3m' },
  { days: 182, label: '6 months', short: '6m' },
  { days: 365, label: '1 year', short: '1y' },
];

export const HEALTH_NOTE =
  'General information drawn from public health sources, not medical advice. Everyone is different, and timings vary with how much and how long you used. If withdrawal, low mood or anxiety feels like too much, talk to your GP or call NHS 111.';

// hours from quit time
export const HEALTH = {
  vape: [
    { h: 0.33, area: 'Heart', title: 'Heart rate settles', text: 'Pulse and blood pressure start to come down from their nicotine-raised levels.' },
    { h: 12, area: 'Body', title: 'Nicotine dropping fast', text: 'Most nicotine has cleared from your blood. Cravings can feel sharp. That means it is working.' },
    { h: 72, area: 'Senses', title: 'Nicotine-free', text: 'Nicotine is out of your system. Withdrawal usually peaks around now, and taste and smell often start to sharpen.' },
    { h: 168, area: 'Mood', title: 'Cravings get shorter', text: 'Urges come less often and pass faster, usually within a few minutes. Irritability starts to ease.' },
    { h: 336, area: 'Fitness', title: 'Circulation improves', text: 'Blood flow improves and exercise can start to feel easier. Your airways are calming down.' },
    { h: 720, area: 'Sleep & mood', title: 'Steadier mood and sleep', text: 'Anxiety and stress are often lower than when you vaped, because the cycle of withdrawal between hits has stopped. Sleep usually settles.' },
    { h: 2160, area: 'Lungs', title: 'Lungs working better', text: 'Coughing and shortness of breath usually improve, and your brain’s reward system has largely readjusted.' },
    { h: 4380, area: 'Energy', title: 'More energy', text: 'Breathing and stamina keep improving, and most people find cravings are rare and easy to ride out.' },
    { h: 8760, area: 'Long term', title: 'One year free', text: 'A real milestone. Your risk of going back is far lower than it was in the first few months.' },
  ],
  weed: [
    { h: 24, area: 'Mood', title: 'Withdrawal begins', text: 'Irritability, restlessness and a low appetite are common from day one. Uncomfortable, but not dangerous.' },
    { h: 72, area: 'Sleep', title: 'Peak withdrawal', text: 'Days 2–6 are usually the hardest: poor sleep, night sweats, anxiety and strong cravings. Hold on.' },
    { h: 168, area: 'Dreams', title: 'Dream rebound', text: 'THC suppresses REM sleep, so when you stop, very vivid or strange dreams are common. It is a sign your sleep is resetting.' },
    { h: 336, area: 'Appetite', title: 'Worst is over', text: 'Most physical symptoms fade by around two weeks. Appetite and energy come back.' },
    { h: 672, area: 'Brain', title: 'Receptors recover', text: 'Research shows cannabinoid (CB1) receptors largely return to normal after about four weeks. Focus and short-term memory often sharpen.' },
    { h: 2160, area: 'Sleep', title: 'Sleep normalises', text: 'Dreams settle down and sleep is usually more restful than it was while using. Motivation often improves.' },
    { h: 4380, area: 'Mind', title: 'Clearer thinking', text: 'Many people notice better memory, steadier mood and more drive. Cravings are mostly triggered by situations now, not your body.' },
    { h: 8760, area: 'Long term', title: 'One year clear', text: 'A full year. Your lungs, sleep and mental clarity have had a full year to recover.' },
  ],
};

export const CATEGORIES = [
  { id: 'health', label: 'Health', color: '#FF375F' },
  { id: 'fitness', label: 'Fitness', color: '#30D158' },
  { id: 'money', label: 'Money', color: '#FFD60A' },
  { id: 'study', label: 'Study', color: '#BF5AF2' },
  { id: 'habits', label: 'Habits', color: '#3B9BFF' },
];
export const catById = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[4];

export const COLORS = ['#3B9BFF', '#5AC8FA', '#30D158', '#FFD60A', '#FF9F0A', '#FF453A', '#FF375F', '#BF5AF2'];
export const EMOJIS = ['🎯', '💨', '🌿', '💪', '🏋️', '🏃', '🚴', '🧘', '💧', '😴', '🥗', '🍎', '💷', '🏦', '📚', '📖', '🎓', '🧠', '✍️', '🎸', '🧹', '☀️', '🌙', '❤️', '🔥', '⭐', '🏆', '✈️'];

// Presets for the New Year screen. f(state) => goal fields
export const PRESETS = [
  { key: 'stay-vape', make: () => ({ name: 'Stay vape-free all of 2027', emoji: '💨', color: '#3B9BFF', category: 'health', type: 'quit', quitId: 'vape', period: '2027' }) },
  { key: 'stay-weed', make: () => ({ name: 'Stay weed-free all of 2027', emoji: '🌿', color: '#30D158', category: 'health', type: 'quit', quitId: 'weed', period: '2027' }) },
  {
    key: 'save', make: (s) => {
      const yearly = s.quits.reduce((a, q) => a + (q.monthly || 0) * 12, 0);
      const target = Math.max(100, Math.floor(yearly / 100) * 100);
      return { name: `Save £${target.toLocaleString('en-GB')} from quitting`, emoji: '💷', color: '#FFD60A', category: 'money', type: 'numeric', auto: 'money', quitId: 'all', unit: '£', target, period: '2027' };
    },
  },
  { key: 'gym', make: () => ({ name: 'Gym 3× a week', emoji: '🏋️', color: '#30D158', category: 'fitness', type: 'habit', perWeek: 3, period: '2027' }) },
  { key: 'run', make: () => ({ name: 'Run 500 km', emoji: '🏃', color: '#FF9F0A', category: 'fitness', type: 'numeric', mode: 'sum', unit: 'km', target: 500, period: '2027' }) },
  { key: 'water', make: () => ({ name: 'Drink 2 litres of water', emoji: '💧', color: '#5AC8FA', category: 'health', type: 'habit', perWeek: 7, period: '2027' }) },
  { key: 'sleep', make: () => ({ name: 'In bed by 11pm', emoji: '🌙', color: '#BF5AF2', category: 'habits', type: 'habit', perWeek: 5, period: '2027' }) },
  { key: 'study', make: () => ({ name: 'Study for an hour', emoji: '📖', color: '#BF5AF2', category: 'study', type: 'habit', perWeek: 5, period: '2027' }) },
  { key: 'read', make: () => ({ name: 'Read 12 books', emoji: '📚', color: '#FF9F0A', category: 'study', type: 'numeric', mode: 'sum', unit: 'books', target: 12, period: '2027' }) },
  {
    key: 'weight', make: (s) => {
      const w = s.profile.weights.length ? s.profile.weights[s.profile.weights.length - 1].kg : 70;
      return { name: 'Reach my target weight', emoji: '💪', color: '#FF375F', category: 'fitness', type: 'numeric', auto: 'weight', mode: 'level', unit: 'kg', startValue: +w.toFixed(1), target: Math.round(w + 3), period: '2027' };
    },
  },
  { key: 'meditate', make: () => ({ name: 'Meditate 10 minutes', emoji: '🧘', color: '#5AC8FA', category: 'habits', type: 'habit', perWeek: 7, period: '2027' }) },
  { key: '10k', make: () => ({ name: 'Run a 10K', emoji: '🏆', color: '#FF9F0A', category: 'fitness', type: 'milestone', period: '2027' }) },
];

export const MOODS = [
  { v: 1, e: '😣', l: 'Awful' },
  { v: 2, e: '😕', l: 'Low' },
  { v: 3, e: '😐', l: 'Okay' },
  { v: 4, e: '🙂', l: 'Good' },
  { v: 5, e: '😄', l: 'Great' },
];
