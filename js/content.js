// Novum's slogan
export const SLOGAN_WORDS = ['Turn', 'intentions', 'into', 'transformation.'];
export const SLOGAN = SLOGAN_WORDS.join(' ');

// Static content: milestones, health timelines, goal presets, pickers.

export const MILESTONES = [
  { days: 1, label: '1 day', short: '1d' },
  { days: 3, label: '3 days', short: '3d' },
  { days: 7, label: '1 week', short: '1w' },
  { days: 14, label: '2 weeks', short: '2w' },
  { days: 30, label: '1 month', short: '1m' },
  { days: 90, label: '3 months', short: '3m' },
  { days: 100, label: '100 days', short: '100' },
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

// Money milestones (total saved across quits). Buddies hear about these only with "Tell buddies about money saved" on.
export const MONEY_MILESTONES = [50, 100, 250, 500, 1000, 2000, 5000];

// Tip of the day on Home. Each quit gets its own tips; "any" tips suit everyone. Practical, not medical advice.
// kind: a quit kind from ADDICTIONS (vape, weed, …), 'nicotine' for vape, snus and smoking, or 'any'.
export const TIPS = [
  // vaping and nicotine
  { kind: 'nicotine', e: '⏱️', t: 'A nicotine craving peaks and fades in about 3 to 5 minutes. You only ever have to outlast this one.' },
  { kind: 'nicotine', e: '🧠', t: 'Nicotine doesn’t calm you down. It eases the withdrawal it caused. After a few weeks off, most people feel less anxious than before.' },
  { kind: 'vape', e: '🗑️', t: 'Got a spare vape “just in case”? Bin it. Keeping a backup makes it a plan, not a quit.' },
  { kind: 'vape', e: '✋', t: 'Your hands miss the habit as much as your brain. Keep something to fiddle with, like a pen, a ring or a stress ball.' },
  { kind: 'vape', e: '🌬️', t: 'Miss the feeling of the inhale? Take one slow, deep breath through pursed lips. It hits the same reflex.' },
  { kind: 'vape', e: '🍬', t: 'Mint gum, sugar-free sweets or ice water give your mouth the flavour hit it’s looking for.' },
  { kind: 'vape', e: '🚗', t: 'Notice where you always vaped: the car, the walk to college, after food. Change one tiny thing about that moment.' },
  { kind: 'cigarettes', e: '☕', t: 'Smoking makes your body clear caffeine faster. Now that you’ve stopped, your usual coffee can hit harder, so cut back a bit if you feel jittery.' },
  { kind: 'nicotine', e: '😴', t: 'Sleep may feel strange for the first week or two. It settles, and it’s usually deeper after.' },
  { kind: 'vape', e: '💬', t: 'Tell people you’ve stopped. Saying it out loud makes it harder to quietly start again.' },
  // weed
  { kind: 'weed', e: '🌙', t: 'Can’t sleep without it? Keep a set bedtime, no screens for the last half hour, and get up at the same time every day. It gets easier within a couple of weeks.' },
  { kind: 'weed', e: '💭', t: 'Vivid dreams are normal after stopping. Your REM sleep is coming back, which is a good sign.' },
  { kind: 'weed', e: '🍳', t: 'Appetite low? Eat small and often, even if you’re not hungry. It usually comes back within two weeks.' },
  { kind: 'weed', e: '🏃', t: 'Exercise is one of the best things for weed withdrawal. Even a 15-minute walk helps with restlessness and mood.' },
  { kind: 'weed', e: '📵', t: 'Delete your dealer’s number, or at least mute it. Taking away the easy option takes away half the craving.' },
  { kind: 'weed', e: '🎮', t: 'Boredom is a big trigger. Plan your evenings ahead, especially the ones when you used to smoke.' },
  { kind: 'weed', e: '😤', t: 'Feeling irritable? That’s withdrawal, not you. It usually peaks in the first week and then eases off.' },
  { kind: 'weed', e: '🧠', t: 'Memory and focus usually sharpen after about a month off. Notice it when it happens.' },
  { kind: 'weed', e: '👥', t: 'If your mates still smoke, it’s okay to say “not tonight” or leave early. Real friends will get it.' },
  { kind: 'weed', e: '🛁', t: 'Night sweats are common early on. Keep water by your bed and a spare T-shirt nearby. They pass.' },
  // smoking, alcohol, others
  { kind: 'cigarettes', e: '🫁', t: 'A bit more coughing at first is your lungs clearing out. It usually eases after a few weeks.' },
  { kind: 'alcohol', e: '🍹', t: 'Going out? Order a soft drink first so you have something in your hand. Fewer people ask.' },
  { kind: 'gambling', e: '🔒', t: 'Use GAMSTOP and your bank’s gambling block. Make it hard for future-you to place a bet on autopilot.' },
  { kind: 'energy', e: '💧', t: 'Swap the can for cold water or sparkling water. Withdrawal headaches usually pass within a few days.' },
  // anyone
  { kind: 'any', e: '🌊', t: 'Urge surfing: notice the craving, rate it from 1 to 10, and watch it rise and fall like a wave. You don’t have to act on it.' },
  { kind: 'any', e: '🧭', t: 'HALT: when a craving hits, ask whether you’re Hungry, Angry, Lonely or Tired. Fix that first.' },
  { kind: 'any', e: '📝', t: 'Write your reasons for quitting in Novum. Reading them during a craving works better than willpower.' },
  { kind: 'any', e: '🏅', t: 'Slipping up doesn’t erase your progress. What counts is what you do in the next hour.' },
  { kind: 'any', e: '🎯', t: 'Don’t think “forever”. Think “not today”. Today is the only one you have to win.' },
  { kind: 'any', e: '💷', t: 'Move the money you would have spent into a savings pot each week. Watching it grow is motivating.' },
  { kind: 'any', e: '🤝', t: 'People who quit with a friend are more likely to stick with it. Add a buddy and cheer each other on.' },
  { kind: 'any', e: '🔁', t: 'Swap the ritual, not just the substance. Give the times you used to use a new routine: tea, a walk, a game.' },
  { kind: 'any', e: '☀️', t: 'Get outside in daylight early in the day. It helps your sleep, mood and energy while your body adjusts.' },
  { kind: 'any', e: '💬', t: 'Every quit that sticks was built on attempts that didn’t. A slip is information, not a verdict. Try again, a little wiser.' },
  { kind: 'any', e: '🔥', t: 'Every craving you ride out weakens the habit a little. Today’s hard moment is building tomorrow’s easier one.' },
];
const NICOTINE = new Set(['vape', 'snus', 'cigarettes']);
// The tips that fit someone's quits (always includes the general ones)
export function tipsFor(quits) {
  const kinds = new Set((quits || []).map((q) => q.kind));
  return TIPS.filter((x) => x.kind === 'any' || kinds.has(x.kind) || (x.kind === 'nicotine' && [...kinds].some((k) => NICOTINE.has(k))));
}

// Today's status, shown to buddies for 24 hours
export const STATUSES = [
  { kind: 'strong', e: '💪', l: 'Feeling strong', c: '#30D158' },
  { kind: 'okay', e: '🙂', l: 'Doing okay', c: '#5AC8FA' },
  { kind: 'tough', e: '😮‍💨', l: 'Tough day', c: '#FF9F0A' },
  { kind: 'distract', e: '🎮', l: 'Need a distraction', c: '#BF5AF2' },
];
export const statusOf = (st, now = Date.now()) => (st && now - st.at < 24 * 3600e3 ? STATUSES.find((x) => x.kind === st.kind) || null : null);

// If-then plan ideas for each trigger (Profile → Plan ahead, and SOS)
export const PLAN_IDEAS = {
  Stress: ['Do the 5-minute breathing in SOS', 'Go for a 10-minute walk', 'Write down what’s stressing me', 'Text a buddy'],
  Boredom: ['Play the SOS puzzle', 'Go outside for 10 minutes', 'Put a song on and tidy one thing', 'Start something with my hands'],
  Friends: ['Say “I’ve stopped” and change the subject', 'Hold a drink or chew gum', 'Step away for 5 minutes', 'Leave early if it gets too much'],
  'After food': ['Get up and brush my teeth', 'Have a mint or gum', 'Wash up straight away', 'Go for a short walk'],
  Alcohol: ['Have a soft drink between each drink', 'Tell a mate to call me out', 'Keep my hands busy', 'Go home before I’m drunk'],
  Evening: ['Plan something for 9pm', 'Have a hot drink', 'Do the breathing in SOS', 'Go to bed a bit earlier'],
  Tired: ['Have a glass of cold water', 'Take a 20-minute nap', 'Go to bed instead', 'Step outside for fresh air'],
  Routine: ['Change one small part of the routine', 'Take a different route', 'Do 20 squats instead', 'Have a drink of water first'],
  Anxious: ['Breathe in for 4, out for 6', 'Name 5 things I can see', 'Message someone I trust', 'Go for a walk'],
  Celebrating: ['Treat myself with the money I saved', 'Celebrate with food or a film instead', 'Tell a buddy my win', 'Remind myself how far I’ve come'],
  Other: ['Do the 5-minute breathing in SOS', 'Go for a walk', 'Text a buddy', 'Read my reasons'],
};
export const EVENT_EMOJIS = ['🎉', '🍻', '🎓', '📚', '✈️', '🎵', '⚽', '💼', '🏠', '😬'];

// Roughly how many minutes a day each habit took (a starting guess for "time reclaimed"; editable per quit).
// Nicotine usually takes 10–30 minutes a day and cannabis 10–45, so the defaults sit in the middle of those.
export const MINUTES_PER_DAY = { vape: 20, weed: 30, cigarettes: 20, alcohol: 120, gambling: 60, snus: 20, energy: 5, other: 20 };
export const MINUTES_RANGE = { vape: '10–30', cigarettes: '10–30', snus: '10–30', weed: '10–45' };
// The first defaults (v39), so people who only ever saw those get the new ones
export const OLD_MINUTES = { vape: 30, weed: 60, cigarettes: 50 };
export const minutesFor = (q) => (Number.isFinite(q.minutes) ? q.minutes : MINUTES_PER_DAY[q.kind] ?? 20);
