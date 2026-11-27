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

// What people can quit. Colours follow the entity everywhere (cards, charts, rings).
export const ADDICTIONS = [
  { kind: 'vape', label: 'Vaping', emoji: '💨', color: '#3B9BFF' },
  { kind: 'weed', label: 'Weed', emoji: '🌿', color: '#28B84C' },
  { kind: 'cigarettes', label: 'Smoking', emoji: '🚬', color: '#FF9F0A' },
  { kind: 'alcohol', label: 'Alcohol', emoji: '🍺', color: '#BF5AF2' },
  { kind: 'gambling', label: 'Gambling', emoji: '🎰', color: '#FF375F' },
  { kind: 'snus', label: 'Snus & pouches', emoji: '🫙', color: '#64D2FF' },
  { kind: 'energy', label: 'Energy drinks', emoji: '⚡', color: '#FFD60A' },
  { kind: 'other', label: 'Something else', emoji: '✨', color: '#5AC8FA', custom: true },
];
export const addictionByKind = (k) => ADDICTIONS.find((a) => a.kind === k) || ADDICTIONS[ADDICTIONS.length - 1];

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
  cigarettes: [
    { h: 0.33, area: 'Heart', title: 'Pulse settles', text: 'Heart rate and blood pressure start dropping back towards normal.' },
    { h: 8, area: 'Blood', title: 'Oxygen recovers', text: 'Carbon monoxide in your blood has halved and oxygen levels are returning to normal.' },
    { h: 48, area: 'Senses', title: 'Carbon monoxide gone', text: 'Carbon monoxide has left your body. Your lungs start clearing mucus, and taste and smell improve.' },
    { h: 72, area: 'Breathing', title: 'Breathing easier', text: 'Your airways relax and breathing feels easier. Energy often picks up.' },
    { h: 336, area: 'Circulation', title: 'Circulation improves', text: 'Blood flow improves, making walking and exercise easier.' },
    { h: 2160, area: 'Lungs', title: 'Lungs up to 10% better', text: 'Coughs, wheezing and breathing problems improve as lung function increases.' },
    { h: 8760, area: 'Heart', title: 'Heart risk halved', text: 'After a year, your risk of a heart attack is about half that of someone who still smokes.' },
  ],
  alcohol: [
    { h: 0, area: 'Safety', title: 'A note first', text: 'If you drank heavily every day, stopping suddenly can be dangerous. Talk to your GP or call NHS 111 before you stop.' },
    { h: 24, area: 'Body', title: 'Blood sugar settles', text: 'Your blood sugar starts to stabilise. You might feel restless or shaky. Drink plenty of water.' },
    { h: 72, area: 'Mood', title: 'Toughest days', text: 'Withdrawal and cravings usually peak in the first few days. Poor sleep and anxiety are common.' },
    { h: 168, area: 'Sleep', title: 'Better sleep', text: 'You spend more time in deep, restoring sleep, so you wake up feeling fresher.' },
    { h: 336, area: 'Stomach', title: 'Gut calms down', text: 'Your stomach lining starts to recover, with less reflux and fewer stomach problems.' },
    { h: 720, area: 'Liver', title: 'Liver repairs', text: 'Liver fat can start to reduce, and skin and energy often look and feel better.' },
    { h: 2160, area: 'Mind', title: 'Steadier mood', text: 'Mood, focus and memory are usually noticeably better than when drinking.' },
    { h: 8760, area: 'Long term', title: 'One year alcohol-free', text: 'Lower blood pressure and lower risks for your liver and heart.' },
  ],
  energy: [
    { h: 12, area: 'Body', title: 'Caffeine clearing', text: 'Most of the caffeine has left your system. A dip in energy is normal.' },
    { h: 36, area: 'Head', title: 'Headaches peak', text: 'Caffeine withdrawal headaches and tiredness usually peak around day one or two. Water and sleep help.' },
    { h: 216, area: 'Energy', title: 'Natural energy back', text: 'For most people withdrawal is over within nine days, and energy levels are steadier.' },
    { h: 720, area: 'Sleep', title: 'Deeper sleep', text: 'Sleep quality improves without late caffeine and sugar crashes.' },
  ],
};
// Same nicotine timeline applies to pouches
HEALTH.snus = HEALTH.vape;
export const healthFor = (q) => HEALTH[q.kind || q.id] || null;

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
// "Stay quit" presets are generated per addiction (see quitPresets)
export const quitPresets = (s) => s.quits.map((q) => ({
  key: `stay-${q.id}`,
  make: () => ({ name: `Stay ${q.label.toLowerCase()}-free through 2027`, emoji: q.emoji, color: q.color, category: 'health', type: 'quit', quitId: q.id, period: '2027' }),
}));

export const PRESETS = [
  {
    key: 'save', make: (s) => {
      // You log what you put away; the target suggests what quitting frees up
      const yearly = s.quits.reduce((a, q) => a + (q.monthly || 0) * 12, 0);
      const target = yearly > 0 ? Math.max(100, Math.floor(yearly / 100) * 100) : 500;
      return { name: `Save £${target.toLocaleString('en-GB')}`, emoji: '💷', color: '#FFD60A', category: 'money', type: 'numeric', mode: 'sum', unit: '£', target, period: '2027' };
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

export const TRIGGERS = ['Stress', 'Boredom', 'Friends', 'After food', 'Alcohol', 'Evening', 'Tired', 'Routine', 'Anxious', 'Celebrating', 'Other'];

export const DISTRACTIONS = [
  { e: '💧', t: 'Drink a full glass of cold water, slowly.' },
  { e: '🚶', t: 'Walk outside or round the block for five minutes.' },
  { e: '💪', t: 'Do 20 push-ups or 30 squats. Right now.' },
  { e: '🪥', t: 'Brush your teeth. Nothing tastes good after.' },
  { e: '📱', t: 'Text a mate. You don’t have to mention the craving.' },
  { e: '🍬', t: 'Chew gum or eat something crunchy.' },
  { e: '🚿', t: 'Splash cold water on your face or take a quick shower.' },
  { e: '🎧', t: 'Put one song on loud and do nothing else until it ends.' },
  { e: '🧊', t: 'Hold an ice cube. The cold resets your focus.' },
  { e: '📝', t: 'Write down exactly what you feel. Naming it shrinks it.' },
];

export const REASON_IDEAS = [
  'Save money for things I actually want',
  'Sleep properly and wake up clear',
  'Breathe better when I train',
  'Be in control, not the habit',
  'Sharper memory and focus for study',
  'Feel calmer without needing a hit',
  'Be proud of myself',
];

export const MOODS = [
  { v: 1, e: '😣', l: 'Awful' },
  { v: 2, e: '😕', l: 'Low' },
  { v: 3, e: '😐', l: 'Okay' },
  { v: 4, e: '🙂', l: 'Good' },
  { v: 5, e: '😄', l: 'Great' },
];

// Ideas for "what your money could buy" (prices are rough UK guides; edit them to suit you)
export const WISH_IDEAS = [
  { emoji: '🍔', name: 'A takeaway with mates', price: 25 },
  { emoji: '🎮', name: 'A new game', price: 60 },
  { emoji: '👟', name: 'New trainers', price: 90 },
  { emoji: '🎟️', name: 'Gig or festival tickets', price: 120 },
  { emoji: '🎧', name: 'Wireless earbuds', price: 130 },
  { emoji: '🏋️', name: 'A year of gym membership', price: 300 },
  { emoji: '✈️', name: 'A weekend away', price: 350 },
  { emoji: '📱', name: 'A new phone', price: 800 },
];

// Mood colours for the check-in calendar (awful → great)
export const MOOD_COLORS = ['#FF453A', '#FF9F0A', '#FFD60A', '#7DDB5A', '#30D158'];

// Cheers you can send a buddy (the server words the notification)
export const CHEER_KINDS = [
  { kind: 'keepgoing', e: '💪', l: 'Keep going' },
  { kind: 'proud', e: '🙌', l: 'Proud of you' },
  { kind: 'strong', e: '🔥', l: 'Stay strong' },
  { kind: 'heart', e: '💙', l: 'Thinking of you' },
];
