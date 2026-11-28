// Fitness data: the exercise library, starter plans, and the maths for workouts (personal bests, volume,
// "last time" numbers). Everything here is written for Novum. Workouts themselves live in the user's
// data under s.fitness (see store.js).

/* ---------- muscles and equipment ---------- */
export const MUSCLES = {
  chest: 'Chest', shoulders: 'Shoulders', biceps: 'Biceps', triceps: 'Triceps', forearms: 'Forearms',
  abs: 'Abs', obliques: 'Obliques', traps: 'Traps', lats: 'Lats', upperback: 'Upper back', lowerback: 'Lower back',
  glutes: 'Glutes', quads: 'Quads', hamstrings: 'Hamstrings', adductors: 'Inner thighs', calves: 'Calves',
};
// Groups for filtering the library
export const GROUPS = [
  { id: 'chest', label: 'Chest', m: ['chest'] },
  { id: 'back', label: 'Back', m: ['lats', 'upperback', 'lowerback', 'traps'] },
  { id: 'shoulders', label: 'Shoulders', m: ['shoulders'] },
  { id: 'arms', label: 'Arms', m: ['biceps', 'triceps', 'forearms'] },
  { id: 'legs', label: 'Legs', m: ['quads', 'hamstrings', 'adductors', 'calves'] },
  { id: 'glutes', label: 'Glutes', m: ['glutes'] },
  { id: 'core', label: 'Core', m: ['abs', 'obliques'] },
];
export const EQUIPMENT = {
  barbell: 'Barbell', dumbbell: 'Dumbbell', machine: 'Machine', cable: 'Cable', smith: 'Smith machine',
  kettlebell: 'Kettlebell', bodyweight: 'Bodyweight', band: 'Band', other: 'Other',
};
// How a set is logged: w = weight × reps, b = bodyweight reps (extra weight optional), t = time (weight optional)
export const TYPES = { w: 'Weight and reps', b: 'Bodyweight reps', t: 'Time' };

/* ---------- the library ---------- */
// [id, name, primary muscle, secondary muscles, equipment, set type, how-to steps separated by |]
const RAW = [
  // chest
  ['bench', 'Bench press', 'chest', 'triceps,shoulders', 'barbell', 'w', 'Lie on the bench with your eyes under the bar, feet flat and shoulder blades squeezed together.|Lower the bar to your lower chest with elbows about 45° from your sides.|Press back up until your arms are straight, keeping your back and feet still.'],
  ['incbench', 'Incline bench press', 'chest', 'shoulders,triceps', 'barbell', 'w', 'Set the bench to about 30°. Grip the bar a little wider than your shoulders.|Lower it to your upper chest, just under the collarbones.|Press up and slightly back so the bar finishes over your shoulders.'],
  ['decbench', 'Decline bench press', 'chest', 'triceps', 'barbell', 'w', 'Hook your legs under the pads on a decline bench.|Lower the bar to the bottom of your chest.|Press straight up, keeping your wrists stacked over your elbows.'],
  ['dbbench', 'Dumbbell bench press', 'chest', 'triceps,shoulders', 'dumbbell', 'w', 'Sit with the dumbbells on your knees, then lie back and bring them to your chest.|Press up until they nearly touch over your chest.|Lower slowly until you feel a stretch across your chest.'],
  ['incdb', 'Incline dumbbell press', 'chest', 'shoulders,triceps', 'dumbbell', 'w', 'Set the bench to 30–45° and start with the dumbbells at your shoulders.|Press up and slightly in over your upper chest.|Lower under control, elbows slightly tucked.'],
  ['dbfly', 'Dumbbell fly', 'chest', 'shoulders', 'dumbbell', 'w', 'Lie flat with the dumbbells above your chest, palms facing each other and elbows soft.|Open your arms in a wide arc until you feel a stretch across your chest.|Squeeze them back together as if hugging a tree.'],
  ['incfly', 'Incline dumbbell fly', 'chest', 'shoulders', 'dumbbell', 'w', 'Set the bench to about 30°, dumbbells above your upper chest.|Lower them out wide with a slight bend in the elbows.|Bring them back up along the same arc.'],
  ['cablecross', 'Cable crossover', 'chest', 'shoulders', 'cable', 'w', 'Set both pulleys high and take a step forward with a staggered stance.|With soft elbows, sweep the handles down and together in front of your hips.|Let them return slowly until your chest stretches.'],
  ['lowfly', 'Low-to-high cable fly', 'chest', 'shoulders', 'cable', 'w', 'Set both pulleys low and stand in the middle.|Sweep the handles up and together to chin height.|Lower slowly. This one works the upper chest.'],
  ['chestpress', 'Machine chest press', 'chest', 'triceps,shoulders', 'machine', 'w', 'Set the seat so the handles line up with your mid-chest.|Press forward until your arms are almost straight.|Let the handles come back until you feel a stretch, then press again.'],
  ['pecdeck', 'Pec deck', 'chest', 'shoulders', 'machine', 'w', 'Sit tall with your back against the pad and elbows level with your shoulders.|Squeeze the handles together in front of you.|Open slowly without letting the weights touch.'],
  ['pushup', 'Push-up', 'chest', 'triceps,shoulders,abs', 'bodyweight', 'b', 'Hands just wider than your shoulders, body in a straight line from head to heels.|Lower until your chest is a fist from the floor, elbows at about 45°.|Push the floor away until your arms are straight.'],
  ['incpushup', 'Incline push-up', 'chest', 'triceps,shoulders', 'bodyweight', 'b', 'Put your hands on a bench or box, body straight.|Lower your chest to the edge.|Press back up. The higher the hands, the easier it is.'],
  ['decpushup', 'Decline push-up', 'chest', 'shoulders,triceps', 'bodyweight', 'b', 'Put your feet on a bench and hands on the floor.|Keep your hips in line and lower your chest to the floor.|Press up. This shifts the work to your upper chest.'],
  ['chestdip', 'Chest dip', 'chest', 'triceps,shoulders', 'bodyweight', 'b', 'Hold the bars, lean your body forward and bend your knees.|Lower until your shoulders are just below your elbows.|Press back up, staying leaned forward.'],
  ['smithbench', 'Smith machine bench press', 'chest', 'triceps,shoulders', 'smith', 'w', 'Set the bench so the bar lands on your lower chest.|Unrack, lower under control.|Press up. Good for training hard without a spotter.'],
  // back
  ['deadlift', 'Deadlift', 'lowerback', 'glutes,hamstrings,traps,forearms', 'barbell', 'w', 'Stand with the bar over your mid-foot and grip just outside your legs.|Brace, flatten your back and push the floor away until you stand tall.|Lower by pushing your hips back, keeping the bar close to your legs.'],
  ['pullup', 'Pull-up', 'lats', 'biceps,upperback', 'bodyweight', 'b', 'Hang from the bar with palms facing away, hands just outside your shoulders.|Pull your chest towards the bar, driving your elbows down.|Lower all the way until your arms are straight.'],
  ['chinup', 'Chin-up', 'lats', 'biceps', 'bodyweight', 'b', 'Hang with palms facing you, hands shoulder-width apart.|Pull until your chin clears the bar.|Lower slowly to a full hang.'],
  ['assistpull', 'Assisted pull-up', 'lats', 'biceps,upperback', 'machine', 'w', 'Kneel on the pad. More weight means more help.|Pull up until your chin is over the bar.|Lower slowly. Use less help as you get stronger.'],
  ['pulldown', 'Lat pulldown', 'lats', 'biceps,upperback', 'cable', 'w', 'Sit with your thighs under the pads and grip the bar wide.|Pull it to your upper chest, leading with your elbows.|Let it rise until your arms are straight and your lats stretch.'],
  ['cgpulldown', 'Close-grip pulldown', 'lats', 'biceps', 'cable', 'w', 'Use a V-handle and sit tall.|Pull the handle to your upper chest, elbows close to your sides.|Return slowly to a full stretch.'],
  ['bbrow', 'Barbell row', 'upperback', 'lats,biceps,lowerback', 'barbell', 'w', 'Hinge at the hips until your chest is about 45° to the floor, back flat.|Row the bar to your lower ribs.|Lower it under control without standing up.'],
  ['pendlay', 'Pendlay row', 'upperback', 'lats,lowerback', 'barbell', 'w', 'Bend over until your back is nearly flat, with the bar on the floor.|Pull it explosively to your lower chest.|Put it back on the floor and reset each rep.'],
  ['dbrow', 'One-arm dumbbell row', 'lats', 'upperback,biceps', 'dumbbell', 'w', 'Put one hand and knee on a bench, back flat.|Row the dumbbell towards your hip.|Lower until your arm is straight and your shoulder stretches.'],
  ['cablerow', 'Seated cable row', 'upperback', 'lats,biceps', 'cable', 'w', 'Sit tall with knees soft and hold the handle with straight arms.|Pull it to your stomach, squeezing your shoulder blades together.|Let your arms straighten without rounding your back.'],
  ['tbar', 'T-bar row', 'upperback', 'lats,biceps', 'barbell', 'w', 'Straddle the bar, hinge forward and grip the handle.|Row it to your chest.|Lower slowly with a flat back.'],
  ['csrow', 'Chest-supported row', 'upperback', 'lats,biceps', 'dumbbell', 'w', 'Lie face down on an incline bench with a dumbbell in each hand.|Row them up and back, squeezing your shoulder blades.|Lower to a full stretch. No swinging possible.'],
  ['machrow', 'Machine row', 'upperback', 'lats,biceps', 'machine', 'w', 'Set the chest pad so you can just reach the handles.|Pull back, driving your elbows past your body.|Return slowly.'],
  ['straightpull', 'Straight-arm pulldown', 'lats', 'triceps', 'cable', 'w', 'Stand facing a high pulley with a bar or rope, arms straight.|Sweep it down to your thighs, keeping your arms straight.|Let it rise to shoulder height.'],
  ['invrow', 'Inverted row', 'upperback', 'lats,biceps', 'bodyweight', 'b', 'Lie under a bar set at waist height and grip it.|Keep your body straight and pull your chest to the bar.|Lower until your arms are straight.'],
  ['rackpull', 'Rack pull', 'lowerback', 'traps,glutes', 'barbell', 'w', 'Set the bar in a rack just below your knees.|Grip it and stand up tall, squeezing your glutes.|Lower it back to the pins.'],
  ['backext', 'Back extension', 'lowerback', 'glutes,hamstrings', 'bodyweight', 'b', 'Set the pad at your hips with your feet locked in.|Lower your upper body with a flat back.|Rise until your body is in a straight line. Hold a plate to make it harder.'],
  ['goodmorning', 'Good morning', 'hamstrings', 'lowerback,glutes', 'barbell', 'w', 'Bar on your upper back, knees slightly bent.|Push your hips back and lower your chest until you feel your hamstrings.|Drive your hips forward to stand. Start light.'],
  ['shrug', 'Barbell shrug', 'traps', 'forearms', 'barbell', 'w', 'Hold the bar in front of your thighs.|Lift your shoulders straight up towards your ears.|Pause, then lower. Don’t roll your shoulders.'],
  ['dbshrug', 'Dumbbell shrug', 'traps', 'forearms', 'dumbbell', 'w', 'Hold a dumbbell at each side.|Shrug straight up as high as you can.|Pause at the top, then lower slowly.'],
  // shoulders
  ['ohp', 'Overhead press', 'shoulders', 'triceps,upperback', 'barbell', 'w', 'Hold the bar at your collarbones, grip just outside your shoulders.|Squeeze your glutes and press it straight up, moving your head back out of the way.|Finish with the bar over your mid-foot, then lower to your collarbones.'],
  ['dbpress', 'Seated dumbbell shoulder press', 'shoulders', 'triceps', 'dumbbell', 'w', 'Sit upright with the dumbbells at shoulder height.|Press them up until your arms are straight.|Lower until they reach your ears.'],
  ['arnold', 'Arnold press', 'shoulders', 'triceps', 'dumbbell', 'w', 'Start with the dumbbells in front of your face, palms facing you.|Rotate your palms forward as you press up.|Reverse the turn on the way down.'],
  ['machpress', 'Machine shoulder press', 'shoulders', 'triceps', 'machine', 'w', 'Set the seat so the handles are at shoulder height.|Press up until your arms are straight.|Lower under control.'],
  ['latraise', 'Lateral raise', 'shoulders', 'traps', 'dumbbell', 'w', 'Stand with a light dumbbell at each side.|Raise them out to the side until they reach shoulder height, elbows soft.|Lower slowly. Lead with your elbows, not your hands.'],
  ['cablelat', 'Cable lateral raise', 'shoulders', '', 'cable', 'w', 'Stand side-on to a low pulley and hold the handle with your far hand.|Raise your arm out to shoulder height.|Lower slowly. The cable keeps the tension on the whole way.'],
  ['frontraise', 'Front raise', 'shoulders', 'chest', 'dumbbell', 'w', 'Hold the dumbbells in front of your thighs.|Raise them in front of you to shoulder height.|Lower slowly without swinging.'],
  ['reardelt', 'Rear delt fly', 'shoulders', 'upperback', 'dumbbell', 'w', 'Bend forward at the hips with light dumbbells hanging down.|Raise them out to the sides, leading with your elbows.|Lower under control.'],
  ['revpec', 'Reverse pec deck', 'shoulders', 'upperback', 'machine', 'w', 'Sit facing the pad with the handles at shoulder height.|Sweep your arms back until they line up with your body.|Return slowly.'],
  ['uprow', 'Upright row', 'shoulders', 'traps,biceps', 'barbell', 'w', 'Hold the bar with a grip just wider than your shoulders.|Pull it up along your body until your elbows reach shoulder height.|Lower slowly.'],
  ['facepull', 'Face pull', 'shoulders', 'upperback,traps', 'cable', 'w', 'Set a rope at face height and grip it with your thumbs back.|Pull towards your face, separating the rope ends beside your ears.|Return slowly. Great for posture.'],
  ['landmine', 'Landmine press', 'shoulders', 'chest,triceps', 'barbell', 'w', 'Hold the end of a barbell anchored in a landmine at your shoulder.|Press it up and forward until your arm is straight.|Lower back to your shoulder.'],
  ['pushpress', 'Push press', 'shoulders', 'triceps,quads', 'barbell', 'w', 'Start like an overhead press.|Dip at the knees, then drive up and use that push to press the bar overhead.|Lower to your shoulders and reset.'],
  ['pikepush', 'Pike push-up', 'shoulders', 'triceps', 'bodyweight', 'b', 'Start in a push-up with your hips high, making an upside-down V.|Lower the top of your head towards the floor between your hands.|Press back up.'],
  ['hspu', 'Handstand push-up', 'shoulders', 'triceps,traps', 'bodyweight', 'b', 'Kick up into a handstand against a wall.|Lower your head gently to the floor.|Press back up. Use a pike push-up until you are ready.'],
  // biceps
  ['bbcurl', 'Barbell curl', 'biceps', 'forearms', 'barbell', 'w', 'Hold the bar at shoulder width, palms up.|Curl it up keeping your elbows by your sides.|Lower fully. No swinging.'],
  ['ezcurl', 'EZ-bar curl', 'biceps', 'forearms', 'barbell', 'w', 'Hold the angled part of the EZ bar.|Curl up to your chest.|Lower slowly. Easier on the wrists than a straight bar.'],
  ['dbcurl', 'Dumbbell curl', 'biceps', 'forearms', 'dumbbell', 'w', 'Hold the dumbbells at your sides, palms forward.|Curl them up, turning your little finger slightly upwards at the top.|Lower all the way down.'],
  ['hammer', 'Hammer curl', 'biceps', 'forearms', 'dumbbell', 'w', 'Hold the dumbbells with palms facing each other.|Curl up, keeping that grip.|Lower slowly. Builds the forearms too.'],
  ['inccurl', 'Incline dumbbell curl', 'biceps', '', 'dumbbell', 'w', 'Lie back on a bench set at about 45° with your arms hanging.|Curl up without moving your elbows forward.|Lower to a full stretch.'],
  ['preacher', 'Preacher curl', 'biceps', '', 'barbell', 'w', 'Rest the backs of your arms on the preacher pad.|Curl the bar up.|Lower until your arms are almost straight.'],
  ['cablecurl', 'Cable curl', 'biceps', 'forearms', 'cable', 'w', 'Stand facing a low pulley holding a bar.|Curl it up, elbows fixed.|Lower slowly against the cable.'],
  ['conccurl', 'Concentration curl', 'biceps', '', 'dumbbell', 'w', 'Sit and rest the back of your arm on your inner thigh.|Curl the dumbbell to your shoulder.|Lower slowly and fully.'],
  ['spidercurl', 'Spider curl', 'biceps', '', 'dumbbell', 'w', 'Lie chest-down on an incline bench with your arms hanging straight.|Curl the dumbbells up.|Squeeze, then lower.'],
  // triceps
  ['cgbench', 'Close-grip bench press', 'triceps', 'chest,shoulders', 'barbell', 'w', 'Grip the bar at shoulder width.|Lower to your lower chest with elbows close to your body.|Press up, focusing on your triceps.'],
  ['pushdown', 'Triceps pushdown', 'triceps', '', 'cable', 'w', 'Stand facing a high pulley with a straight bar.|Push it down until your arms are straight, elbows by your sides.|Let it rise to chest height.'],
  ['ropepush', 'Rope pushdown', 'triceps', '', 'cable', 'w', 'Hold a rope on a high pulley.|Push down and pull the rope ends apart at the bottom.|Return slowly.'],
  ['ohcable', 'Overhead cable extension', 'triceps', '', 'cable', 'w', 'Face away from the pulley holding a rope behind your head.|Straighten your arms forward and up.|Bend your elbows to a deep stretch.'],
  ['ohdb', 'Overhead dumbbell extension', 'triceps', '', 'dumbbell', 'w', 'Hold one dumbbell overhead with both hands.|Lower it behind your head by bending your elbows.|Straighten your arms back up.'],
  ['skull', 'Skull crusher', 'triceps', '', 'barbell', 'w', 'Lie on a bench holding an EZ bar over your chest.|Bend your elbows to bring the bar to your forehead.|Straighten your arms without moving your elbows.'],
  ['kickback', 'Dumbbell kickback', 'triceps', '', 'dumbbell', 'w', 'Hinge forward with your upper arm by your side.|Straighten your arm behind you.|Lower slowly to 90°.'],
  ['benchdip', 'Bench dip', 'triceps', 'chest,shoulders', 'bodyweight', 'b', 'Put your hands on a bench behind you, legs out in front.|Lower your hips until your elbows reach 90°.|Press back up.'],
  ['dip', 'Triceps dip', 'triceps', 'chest,shoulders', 'bodyweight', 'b', 'Hold the bars and stay upright.|Lower until your elbows reach 90°.|Press up to straight arms.'],
  ['diamond', 'Diamond push-up', 'triceps', 'chest', 'bodyweight', 'b', 'Put your hands together under your chest, making a diamond with thumbs and fingers.|Lower your chest to your hands.|Press back up.'],
  // forearms
  ['wristcurl', 'Wrist curl', 'forearms', '', 'dumbbell', 'w', 'Rest your forearms on a bench, palms up, wrists over the edge.|Curl your wrists up.|Lower slowly.'],
  ['revwrist', 'Reverse wrist curl', 'forearms', '', 'dumbbell', 'w', 'Rest your forearms on a bench, palms down.|Lift the backs of your hands up.|Lower slowly.'],
  ['revcurl', 'Reverse curl', 'forearms', 'biceps', 'barbell', 'w', 'Hold the bar with palms facing down.|Curl it up, elbows by your sides.|Lower slowly.'],
  ['farmer', 'Farmer’s carry', 'forearms', 'traps,abs', 'dumbbell', 't', 'Pick up a heavy weight in each hand.|Walk tall with your shoulders back.|Log how long you carried it.'],
  ['deadhang', 'Dead hang', 'forearms', 'lats', 'bodyweight', 't', 'Hang from a pull-up bar with straight arms.|Keep your shoulders active, not shrugged up.|Hold as long as you can.'],
  // quads
  ['squat', 'Back squat', 'quads', 'glutes,adductors,lowerback', 'barbell', 'w', 'Bar on your upper back, feet shoulder-width, toes slightly out.|Brace and sit down between your heels until your hips are below your knees.|Drive up through your whole foot, knees tracking over your toes.'],
  ['frontsquat', 'Front squat', 'quads', 'glutes,abs', 'barbell', 'w', 'Rest the bar on the front of your shoulders, elbows high.|Squat down keeping your chest up.|Stand up, keeping your elbows high.'],
  ['goblet', 'Goblet squat', 'quads', 'glutes,abs', 'dumbbell', 'w', 'Hold a dumbbell or kettlebell against your chest.|Squat down between your knees, chest tall.|Drive up through your heels. A great first squat.'],
  ['hack', 'Hack squat', 'quads', 'glutes', 'machine', 'w', 'Stand on the platform with your back against the pad.|Lower until your thighs are at least parallel.|Push back up without locking your knees.'],
  ['legpress', 'Leg press', 'quads', 'glutes,hamstrings', 'machine', 'w', 'Sit with your feet shoulder-width on the platform.|Lower it until your knees reach about 90°.|Press away without locking your knees out.'],
  ['legext', 'Leg extension', 'quads', '', 'machine', 'w', 'Sit with the pad on your lower shins.|Straighten your legs and squeeze your quads.|Lower slowly.'],
  ['bulgarian', 'Bulgarian split squat', 'quads', 'glutes,adductors', 'dumbbell', 'w', 'Put your back foot on a bench, front foot well forward.|Lower straight down until your back knee nearly touches the floor.|Drive up through your front foot. Log the reps for one leg.'],
  ['walklunge', 'Walking lunge', 'quads', 'glutes,hamstrings', 'dumbbell', 'w', 'Hold dumbbells at your sides.|Step forward and lower your back knee towards the floor.|Push off and step through into the next lunge.'],
  ['revlunge', 'Reverse lunge', 'quads', 'glutes', 'dumbbell', 'w', 'Stand tall and step one foot back.|Lower until both knees reach 90°.|Drive through your front heel to stand. Easier on the knees.'],
  ['stepup', 'Step-up', 'quads', 'glutes', 'dumbbell', 'w', 'Stand facing a box or bench.|Step up with one foot and stand tall on top.|Step down slowly with control.'],
  ['smithsquat', 'Smith machine squat', 'quads', 'glutes', 'smith', 'w', 'Set the bar on your upper back, feet slightly forward.|Squat down under control.|Stand back up.'],
  ['sissy', 'Sissy squat', 'quads', '', 'bodyweight', 'b', 'Hold something for balance and rise onto your toes.|Lean back as your knees travel forward and down.|Return to standing.'],
  ['bwsquat', 'Bodyweight squat', 'quads', 'glutes', 'bodyweight', 'b', 'Feet shoulder-width, arms out in front.|Sit down until your thighs are parallel.|Stand up tall.'],
  ['jumpsquat', 'Jump squat', 'quads', 'glutes,calves', 'bodyweight', 'b', 'Squat down to parallel.|Jump up as high as you can.|Land softly and go straight into the next rep.'],
  ['wallsit', 'Wall sit', 'quads', 'glutes', 'bodyweight', 't', 'Slide down a wall until your knees reach 90°.|Keep your back flat against the wall.|Hold.'],
  ['pistol', 'Pistol squat', 'quads', 'glutes,abs', 'bodyweight', 'b', 'Stand on one leg with the other straight out in front.|Squat down on the standing leg as low as you can.|Stand back up. Hold a post to help.'],
  ['beltsquat', 'Belt squat', 'quads', 'glutes', 'machine', 'w', 'Attach the belt at your hips.|Squat down with your chest up.|Stand. No load on your back.'],
  // hamstrings
  ['rdl', 'Romanian deadlift', 'hamstrings', 'glutes,lowerback', 'barbell', 'w', 'Stand holding the bar, knees slightly bent.|Push your hips back and slide the bar down your legs until you feel a strong stretch.|Squeeze your glutes to stand.'],
  ['dbrdl', 'Dumbbell Romanian deadlift', 'hamstrings', 'glutes,lowerback', 'dumbbell', 'w', 'Hold dumbbells in front of your thighs.|Hinge at the hips, keeping your back flat, until they reach mid-shin.|Drive your hips forward to stand.'],
  ['sldl', 'Stiff-leg deadlift', 'hamstrings', 'lowerback,glutes', 'barbell', 'w', 'Stand with legs nearly straight.|Lower the bar towards the floor with a flat back.|Stand back up.'],
  ['lyingcurl', 'Lying leg curl', 'hamstrings', 'calves', 'machine', 'w', 'Lie face down with the pad on your lower calves.|Curl your heels towards your glutes.|Lower slowly.'],
  ['seatedcurl', 'Seated leg curl', 'hamstrings', '', 'machine', 'w', 'Sit with the pad behind your lower legs and the thigh pad locked down.|Curl your heels down and back.|Return slowly.'],
  ['nordic', 'Nordic curl', 'hamstrings', '', 'bodyweight', 'b', 'Kneel with your ankles held down.|Lower your body forward as slowly as you can.|Catch yourself, then push back up.'],
  ['slrdl', 'Single-leg Romanian deadlift', 'hamstrings', 'glutes', 'dumbbell', 'w', 'Stand on one leg holding a dumbbell.|Hinge forward as your free leg rises behind you.|Return to standing. Log the reps for one leg.'],
  ['ghr', 'Glute-ham raise', 'hamstrings', 'glutes', 'machine', 'b', 'Lock your feet in the GHD with your knees on the pad.|Lower your body until it is straight.|Curl yourself back up with your hamstrings.'],
  // glutes
  ['hipthrust', 'Hip thrust', 'glutes', 'hamstrings', 'barbell', 'w', 'Sit with your upper back against a bench and a padded bar over your hips.|Drive your hips up until your body is flat from shoulders to knees.|Squeeze, then lower.'],
  ['bridge', 'Glute bridge', 'glutes', 'hamstrings', 'bodyweight', 'b', 'Lie on your back with your knees bent and feet flat.|Push your hips up and squeeze your glutes.|Lower slowly.'],
  ['slbridge', 'Single-leg glute bridge', 'glutes', 'hamstrings', 'bodyweight', 'b', 'Lie on your back with one foot planted and the other leg raised.|Drive your hips up through the planted foot.|Lower slowly. Log the reps for one leg.'],
  ['kickbackc', 'Cable glute kickback', 'glutes', 'hamstrings', 'cable', 'w', 'Attach an ankle strap to a low pulley.|Kick your leg straight back, squeezing your glute.|Return slowly without arching your back.'],
  ['abduct', 'Hip abduction', 'glutes', '', 'machine', 'w', 'Sit with the pads on the outside of your knees.|Push your knees apart.|Return slowly.'],
  ['sumo', 'Sumo deadlift', 'glutes', 'quads,adductors,lowerback', 'barbell', 'w', 'Take a wide stance with toes turned out and grip the bar inside your knees.|Push your knees out and stand up tall.|Lower with control.'],
  ['kbswing', 'Kettlebell swing', 'glutes', 'hamstrings,lowerback,shoulders', 'kettlebell', 'w', 'Hinge and hike the kettlebell back between your legs.|Snap your hips forward to swing it to chest height.|Let it fall back and go straight into the next rep.'],
  ['cablepull', 'Cable pull-through', 'glutes', 'hamstrings', 'cable', 'w', 'Face away from a low pulley holding a rope between your legs.|Hinge forward, then drive your hips through to stand.|Squeeze your glutes at the top.'],
  // inner thighs
  ['adduct', 'Hip adduction', 'adductors', '', 'machine', 'w', 'Sit with the pads on the inside of your knees.|Squeeze your legs together.|Return slowly.'],
  ['copenhagen', 'Copenhagen plank', 'adductors', 'obliques', 'bodyweight', 't', 'Lie on your side with your top foot on a bench.|Lift your hips so your body is straight.|Hold.'],
  // calves
  ['calfraise', 'Standing calf raise', 'calves', '', 'machine', 'w', 'Stand with the balls of your feet on the edge of a step.|Rise as high as you can onto your toes.|Lower until your heels drop below the step.'],
  ['seatedcalf', 'Seated calf raise', 'calves', '', 'machine', 'w', 'Sit with the pad on your knees and the balls of your feet on the platform.|Push your heels up.|Lower to a full stretch.'],
  ['lpcalf', 'Leg press calf raise', 'calves', '', 'machine', 'w', 'Sit on the leg press with only the balls of your feet on the bottom edge.|Push through your toes.|Let your heels come back slowly.'],
  ['slcalf', 'Single-leg calf raise', 'calves', '', 'bodyweight', 'b', 'Stand on one foot on the edge of a step.|Rise as high as you can.|Lower slowly. Hold a dumbbell to make it harder.'],
  ['donkey', 'Donkey calf raise', 'calves', '', 'machine', 'w', 'Bend forward at the hips with the pad on your lower back.|Rise onto your toes.|Lower to a deep stretch.'],
  // core
  ['plank', 'Plank', 'abs', 'shoulders,obliques', 'bodyweight', 't', 'Rest on your forearms and toes.|Keep your body in one straight line, squeezing your glutes.|Hold. Stop when your hips start to sag.'],
  ['sideplank', 'Side plank', 'obliques', 'abs,shoulders', 'bodyweight', 't', 'Lie on your side, propped on one forearm.|Lift your hips so your body is straight.|Hold, then switch sides.'],
  ['crunch', 'Crunch', 'abs', '', 'bodyweight', 'b', 'Lie on your back with knees bent.|Curl your shoulders off the floor, ribs towards your hips.|Lower slowly.'],
  ['cablecrunch', 'Cable crunch', 'abs', '', 'cable', 'w', 'Kneel facing a high pulley, holding a rope by your head.|Curl down, bringing your elbows towards your knees.|Return slowly. Move from your spine, not your hips.'],
  ['hangleg', 'Hanging leg raise', 'abs', 'obliques,forearms', 'bodyweight', 'b', 'Hang from a bar.|Raise your straight legs to hip height or higher.|Lower slowly without swinging.'],
  ['hangknee', 'Hanging knee raise', 'abs', 'forearms', 'bodyweight', 'b', 'Hang from a bar.|Bring your knees up to your chest.|Lower slowly.'],
  ['lyingleg', 'Lying leg raise', 'abs', '', 'bodyweight', 'b', 'Lie flat with your hands under your hips.|Raise your straight legs to vertical.|Lower slowly without arching your back.'],
  ['abwheel', 'Ab wheel rollout', 'abs', 'lats,shoulders', 'other', 'b', 'Kneel holding the wheel under your shoulders.|Roll forward as far as you can with a flat back.|Pull back with your abs.'],
  ['deadbug', 'Dead bug', 'abs', '', 'bodyweight', 'b', 'Lie on your back with arms up and knees at 90°.|Lower the opposite arm and leg towards the floor, back pressed down.|Return and switch sides.'],
  ['climber', 'Mountain climber', 'abs', 'shoulders,quads', 'bodyweight', 't', 'Start in a push-up position.|Drive your knees towards your chest one at a time, quickly.|Keep your hips low.'],
  ['russian', 'Russian twist', 'obliques', 'abs', 'bodyweight', 'b', 'Sit leaning back with your feet up.|Twist your hands from side to side.|Hold a weight to make it harder.'],
  ['bicycle', 'Bicycle crunch', 'obliques', 'abs', 'bodyweight', 'b', 'Lie on your back with your hands by your head.|Bring each elbow towards the opposite knee in turn.|Keep it slow and controlled.'],
  ['pallof', 'Pallof press', 'obliques', 'abs', 'cable', 'w', 'Stand side-on to a cable at chest height, holding it at your chest.|Press it straight out without letting it twist you.|Bring it back in.'],
  ['hollow', 'Hollow hold', 'abs', '', 'bodyweight', 't', 'Lie on your back, press your lower back down.|Lift your arms, shoulders and legs off the floor.|Hold the banana shape.'],
  ['vup', 'V-up', 'abs', '', 'bodyweight', 'b', 'Lie flat with your arms overhead.|Lift your arms and legs to meet in the middle.|Lower slowly.'],
  ['situp', 'Sit-up', 'abs', '', 'bodyweight', 'b', 'Lie on your back with knees bent and feet anchored.|Sit all the way up.|Lower slowly.'],
  ['chop', 'Cable woodchopper', 'obliques', 'abs,shoulders', 'cable', 'w', 'Set a cable high and hold it with both hands.|Pull it down and across your body, turning through your trunk.|Return slowly, then switch sides.'],
  // full body and conditioning
  ['burpee', 'Burpee', 'quads', 'chest,shoulders,abs', 'bodyweight', 'b', 'Squat down and put your hands on the floor.|Jump your feet back, do a push-up, then jump them forward.|Jump up with your arms overhead.'],
  ['clean', 'Power clean', 'traps', 'glutes,hamstrings,quads,shoulders', 'barbell', 'w', 'Start like a deadlift.|Pull hard, extend your hips and shrug, pulling yourself under the bar.|Catch it on the front of your shoulders. Learn with a coach.'],
  ['thruster', 'Thruster', 'quads', 'shoulders,glutes,triceps', 'barbell', 'w', 'Hold the bar on the front of your shoulders.|Front squat down, then drive up and press it overhead in one move.|Lower to your shoulders and go again.'],
  ['ropes', 'Battle ropes', 'shoulders', 'abs,forearms', 'other', 't', 'Hold one rope end in each hand, knees bent.|Whip the ropes up and down in fast waves.|Keep going for the time.'],
  ['boxjump', 'Box jump', 'quads', 'glutes,calves', 'other', 'b', 'Stand facing a sturdy box.|Swing your arms and jump up, landing softly.|Step back down.'],
  ['sled', 'Sled push', 'quads', 'glutes,calves', 'other', 't', 'Lean into the sled handles with straight arms.|Drive with short, powerful steps.|Log the time.'],
  ['jumprope', 'Skipping', 'calves', 'shoulders', 'other', 't', 'Hold the handles by your hips.|Turn the rope with your wrists and jump just high enough to clear it.|Keep going for the time.'],
  ['bearcrawl', 'Bear crawl', 'shoulders', 'abs,quads', 'bodyweight', 't', 'Get on hands and feet with your knees just off the floor.|Crawl forward, moving opposite hand and foot together.|Keep your back flat.'],
  ['kbgoblet', 'Kettlebell clean and press', 'shoulders', 'glutes,triceps', 'kettlebell', 'w', 'Swing the kettlebell up into the rack position at your shoulder.|Press it overhead.|Lower back to the rack, then to the floor. Log reps for one side.'],
  ['turkish', 'Turkish get-up', 'shoulders', 'abs,glutes', 'kettlebell', 'b', 'Lie down holding a kettlebell straight up.|Stand up in stages, keeping it overhead.|Reverse the steps back down. Log reps for one side.'],
  ['bandpull', 'Band pull-apart', 'upperback', 'shoulders', 'band', 'b', 'Hold a band in front of you at shoulder height.|Pull it apart until it touches your chest.|Return slowly.'],
  ['bandsquat', 'Banded squat', 'quads', 'glutes', 'band', 'b', 'Stand on a band with the ends at your shoulders.|Squat down.|Stand up against the band.'],
];

export const EXERCISES = RAW.map(([id, n, m, s, eq, t, how]) => ({ id, n, m, s: s ? s.split(',') : [], eq, t, how: how.split('|') }));
const BY_ID = Object.fromEntries(EXERCISES.map((e) => [e.id, e]));

// An exercise by id, including the user's own (s.fitness.custom). Unknown ids still get a name so old data never breaks.
export function exById(id, s) {
  return BY_ID[id] || s?.fitness?.custom?.find((x) => x.id === id) || { id, n: 'Removed exercise', m: 'abs', s: [], eq: 'other', t: 'w', how: [] };
}
export const allExercises = (s) => [...EXERCISES, ...(s?.fitness?.custom || [])];

/* ---------- starter plans (gym first; home and full-body options too) ---------- */
// Each routine: { name, ex: [[exerciseId, sets, reps]] }. Reps are a target range, shown as a hint.
export const PROGRAMMES = [
  {
    id: 'beginner', name: 'Full body for beginners', e: '🌱', days: '3 days a week',
    d: 'Two workouts you alternate (A, B, A…). Learn the main lifts with weights you can control.',
    r: [
      { name: 'Full body A', ex: [['goblet', 3, '8–12'], ['dbbench', 3, '8–12'], ['pulldown', 3, '8–12'], ['dbrdl', 3, '8–12'], ['latraise', 2, '12–15'], ['plank', 3, '30 s']] },
      { name: 'Full body B', ex: [['legpress', 3, '10–12'], ['dbpress', 3, '8–12'], ['cablerow', 3, '8–12'], ['bridge', 3, '12–15'], ['dbcurl', 2, '10–12'], ['pushdown', 2, '10–12']] },
    ],
  },
  {
    id: 'strength', name: 'Strength basics', e: '🏋️', days: '3 days a week',
    d: 'Heavy barbell work with five sets of five. Add a little weight each session when you hit every rep.',
    r: [
      { name: 'Strength A', ex: [['squat', 5, '5'], ['bench', 5, '5'], ['bbrow', 5, '5']] },
      { name: 'Strength B', ex: [['squat', 5, '5'], ['ohp', 5, '5'], ['deadlift', 1, '5']] },
    ],
  },
  {
    id: 'ppl', name: 'Push, pull, legs', e: '🔁', days: '3–6 days a week',
    d: 'Train chest, shoulders and triceps; then back and biceps; then legs. Run it once or twice a week.',
    r: [
      { name: 'Push', ex: [['bench', 4, '6–8'], ['incdb', 3, '8–10'], ['dbpress', 3, '8–10'], ['latraise', 3, '12–15'], ['ropepush', 3, '10–12'], ['ohcable', 2, '10–12']] },
      { name: 'Pull', ex: [['deadlift', 3, '5'], ['pullup', 3, '6–10'], ['cablerow', 3, '8–10'], ['facepull', 3, '12–15'], ['ezcurl', 3, '8–10'], ['hammer', 2, '10–12']] },
      { name: 'Legs', ex: [['squat', 4, '6–8'], ['rdl', 3, '8–10'], ['legpress', 3, '10–12'], ['lyingcurl', 3, '10–12'], ['calfraise', 4, '10–15'], ['hangleg', 3, '10–12']] },
    ],
  },
  {
    id: 'ul', name: 'Upper and lower', e: '⚖️', days: '4 days a week',
    d: 'Upper body and lower body on separate days, twice a week each.',
    r: [
      { name: 'Upper', ex: [['bench', 4, '6–8'], ['bbrow', 4, '6–8'], ['dbpress', 3, '8–10'], ['pulldown', 3, '8–10'], ['dbcurl', 2, '10–12'], ['pushdown', 2, '10–12']] },
      { name: 'Lower', ex: [['squat', 4, '6–8'], ['rdl', 3, '8–10'], ['bulgarian', 3, '8–10'], ['legext', 2, '12–15'], ['seatedcurl', 2, '12–15'], ['calfraise', 3, '10–15']] },
    ],
  },
  {
    id: 'home', name: 'Home, no equipment', e: '🏠', days: '3 days a week',
    d: 'Bodyweight only. Make it harder by slowing down, adding reps or raising your feet.',
    r: [
      { name: 'Home full body', ex: [['pushup', 3, '8–15'], ['bwsquat', 3, '15–20'], ['revlunge', 3, '10 each'], ['pikepush', 3, '6–10'], ['bridge', 3, '15'], ['plank', 3, '30–45 s'], ['climber', 2, '30 s']] },
    ],
  },
];

/* ---------- workout maths ---------- */
// Estimated one-rep max (Epley). Only for weight × reps sets.
export const e1rm = (kg, r) => (kg > 0 && r > 0 ? (r === 1 ? kg : kg * (1 + r / 30)) : 0);
export const fmtKg = (v) => `${+Number(v).toFixed(v >= 100 ? 0 : 1)}`;
export const fmtSecs = (s) => (s >= 60 ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}` : `${Math.round(s)} s`);
// "60 kg × 8", "12 reps", "+10 kg × 8", "45 s"
export function setText(x, t) {
  if (t === 't') return `${fmtSecs(x.s || 0)}${x.kg ? ` · ${fmtKg(x.kg)} kg` : ''}`;
  if (t === 'b') return x.kg ? `+${fmtKg(x.kg)} kg × ${x.r || 0}` : `${x.r || 0} reps`;
  return `${fmtKg(x.kg || 0)} kg × ${x.r || 0}`;
}
// A set's score for personal bests: estimated max for weight sets, reps (weighted dips count more) or seconds
export function setScore(x, t) {
  if (t === 't') return (x.s || 0) * (1 + (x.kg || 0) / 50);
  if (t === 'b') return (x.r || 0) * (1 + (x.kg || 0) / 50);
  return e1rm(x.kg || 0, x.r || 0);
}
export const setVolume = (x, t) => (t === 'w' || (t === 'b' && x.kg) ? (x.kg || 0) * (x.r || 0) : 0);
export function workoutStats(w, s) {
  let sets = 0, volume = 0;
  for (const e of w.ex) {
    const t = exById(e.x, s).t;
    for (const x of e.sets) if (x.d && !x.w) { sets++; volume += setVolume(x, t); }
  }
  return { sets, volume, mins: w.end ? Math.max(1, Math.round((w.end - w.start) / 60000)) : 0 };
}
// Finished workouts, newest first
export const history = (s) => [...(s.fitness?.workouts || [])].sort((a, b) => b.start - a.start);
// The sets from the last finished workout that had this exercise (for the "previous" column)
export function lastSets(s, exId) {
  for (const w of history(s)) { const e = w.ex.find((y) => y.x === exId); if (e) return e.sets.filter((x) => x.d); }
  return [];
}
// Best set ever for an exercise (from finished workouts, optionally before a time)
export function bestSet(s, exId, before = Infinity) {
  const t = exById(exId, s).t;
  let best = null, score = 0;
  for (const w of s.fitness?.workouts || []) {
    if (w.start >= before) continue;
    for (const e of w.ex) if (e.x === exId) for (const x of e.sets) if (x.d && !x.w) { const v = setScore(x, t); if (v > score) { score = v; best = { ...x, at: w.start }; } }
  }
  return best ? { set: best, score } : null;
}
// Every time an exercise was done: [{ at, best set, sets }], newest first
export function exerciseLog(s, exId) {
  const t = exById(exId, s).t;
  return history(s).flatMap((w) => {
    const e = w.ex.find((y) => y.x === exId);
    if (!e) return [];
    const done = e.sets.filter((x) => x.d && !x.w);
    if (!done.length) return [];
    const top = done.reduce((a, x) => (setScore(x, t) > setScore(a, t) ? x : a), done[0]);
    return [{ at: w.start, top, sets: done.length, pb: done.some((x) => x.pb) }];
  });
}
// Workouts in the week (Monday start) containing `d`
export function weekWorkouts(s, weekStartMs) {
  const end = weekStartMs + 7 * 864e5;
  return (s.fitness?.workouts || []).filter((w) => w.start >= weekStartMs && w.start < end);
}
// Routine to suggest next: the one done least recently
export function nextRoutine(s) {
  const rs = s.fitness?.routines || [];
  if (!rs.length) return null;
  const last = (r) => Math.max(0, ...history(s).filter((w) => w.rid === r.id).map((w) => w.start));
  return [...rs].sort((a, b) => last(a) - last(b))[0];
}
