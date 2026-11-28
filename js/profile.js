// Profiles: cartoon avatars (DiceBear, so there's nothing to moderate), bio, a story for each
// addiction, and people: search, Discover, following, followers, blocking and reporting.
// Profiles are private by default: only buddies and approved followers see them.
import { useState, useEffect, useRef } from '../vendor/preact-htm.js';
import { html, haptic, Icon, openSheet, SheetBar, Group, Row, Toggle, Segmented, toast, Skeleton } from './ui.js';
import * as S from './store.js';
import * as A from './api.js';
import { CheerBar } from './cheers.js';
import { refreshBuddies, useBuddies, openBuddies as openBuddiesSheet } from './social.js';
import { MyStatus, StatusTag, TogetherTag, openShareProfile } from './connect.js';
import { BadgeShelf } from './badges.js';
import { openCredits } from './credits.js';
import { BuddyGarden, gardenOf } from './garden.js';
import { Banner, openBannerPicker } from './banner.js';

const DAY = 864e5;

/* ---------- avatars ---------- */
export const AVATAR_STYLES = [
  { id: 'adventurer', l: 'Adventurer' }, { id: 'avataaars', l: 'Cartoon' }, { id: 'big-smile', l: 'Big smile' },
  { id: 'lorelei', l: 'Lorelei' }, { id: 'notionists', l: 'Sketch' }, { id: 'micah', l: 'Micah' },
  { id: 'open-peeps', l: 'Peeps' }, { id: 'toon-head', l: 'Toon' }, { id: 'personas', l: 'Personas' },
  { id: 'miniavs', l: 'Mini' }, { id: 'big-ears', l: 'Big ears' }, { id: 'dylan', l: 'Dylan' }, { id: 'croodles', l: 'Doodle' },
  { id: 'pixel-art', l: 'Pixel' }, { id: 'fun-emoji', l: 'Emoji' }, { id: 'thumbs', l: 'Thumbs' }, { id: 'bottts', l: 'Robot' },
];
// (The server keeps the same list of styles in novum-push/src/social.js: add new ones there too.)
const BGS = ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf', 'c1f4c5', 'fde68a', 'a7f3d0', 'fbcfe8', 'fecaca', '93c5fd', '3b9bff', '1e293b', ''];
const randSeed = () => Math.random().toString(36).slice(2, 10);
export const avatarURL = (a) => a && `https://api.dicebear.com/9.x/${a.style}/svg?seed=${encodeURIComponent(a.seed)}${a.bg ? `&backgroundColor=${a.bg}` : ''}&radius=50`;
export function Avatar({ a, name = '?', size = 36, className = '' }) {
  const [bad, setBad] = useState(false);
  const style = `width:${size}px;height:${size}px;font-size:${Math.round(size * 0.44)}px`;
  if (a && !bad) return html`<img class="av ${className}" style=${style} src=${avatarURL(a)} alt="" loading="lazy" onError=${() => setBad(true)} />`;
  return html`<span class="av av-txt ${className}" style=${style}>${(name || '?')[0].toUpperCase()}</span>`;
}

export function openAvatarPicker(current, onPick) { openSheet((close) => html`<${AvatarPicker} current=${current} onPick=${onPick} close=${close} />`, { tall: true }); }
function AvatarPicker({ current, onPick, close }) {
  const [style, setStyle] = useState(current?.style || 'adventurer');
  const [bg, setBg] = useState(current?.bg ?? 'b6e3f4');
  const [seeds, setSeeds] = useState(() => [current?.seed || randSeed(), ...Array.from({ length: 11 }, randSeed)]);
  const [pick, setPick] = useState(current?.seed || seeds[0]);
  const chosen = { style, seed: pick, bg };
  const shuffle = () => { haptic(); const next = Array.from({ length: 12 }, randSeed); setSeeds(next); setPick(next[0]); };
  return html`
    <${SheetBar} title="Choose your avatar" left=${html`<button class="link" onClick=${close}>Cancel</button>`}
      right=${html`<button class="link b" onClick=${() => { haptic(12); onPick(chosen); close(); }}>Done</button>`} />
    <div class="sheet-body">
      <div class="avp-hero"><${Avatar} a=${chosen} size=${120} /></div>
      <div class="chip-row avp-styles">${AVATAR_STYLES.map((x) => html`<button class="chip big ${style === x.id ? 'on' : ''}" onClick=${() => { haptic(); setStyle(x.id); }}>${x.l}</button>`)}</div>
      <div class="avp-grid">
        ${seeds.map((sd) => html`<button key=${style + sd} class="avp-opt ${pick === sd ? 'on' : ''}" aria-label="Avatar option" onClick=${() => { haptic(6); setPick(sd); }}>
          <${Avatar} a=${{ style, seed: sd, bg }} size=${64} /></button>`)}
      </div>
      <button class="btn btn-tinted block" onClick=${shuffle}>🎲 Shuffle</button>
      <${Group} header="Background">
        <div class="swatches wrap">${BGS.map((c) => html`<button class="sw ${bg === c ? 'on' : ''} ${c ? '' : 'none'}" style=${c ? `--c:#${c}` : ''} aria-label=${c ? `#${c}` : 'No background'} onClick=${() => { haptic(); setBg(c); }}></button>`)}</div>
      <//>
      <p class="muted center tiny">Avatars drawn by DiceBear from artists’ styles (<button class="link tiny" onClick=${openCredits}>credits</button>). Only a random code for your picture is stored, never a photo.</p>
    </div>`;
}

/* ---------- keep the server's copy of my profile in sync ---------- */
function myProfile(s) {
  return {
    avatar: s.social.avatar || null,
    banner: s.social.banner || null,
    bio: s.social.bio || '',
    visibility: s.social.visibility === 'public' ? 'public' : 'buddies',
    stories: s.quits.filter((q) => q.storyShared && (q.story || '').trim()).map((q) => ({ label: q.label, emoji: q.emoji, text: q.story.trim() })),
  };
}
let unsubProf = null, profTimer = null, lastProf = null;
export function startProfileSync() {
  stopProfileSync();
  const run = async () => {
    if (!A.getSession() || !navigator.onLine) return;
    const body = JSON.stringify(myProfile(S.getState()));
    if (body === lastProf) return;
    try { await A.putProfile(JSON.parse(body)); lastProf = body; } catch { /* next change retries */ }
    // The garden on your profile (unless you've hidden it)
    const s = S.getState();
    const g = JSON.stringify(s.social?.showGarden === false ? null : gardenOf(s));
    if (g !== lastGarden) { try { await A.putGarden(JSON.parse(g)); lastGarden = g; } catch { /* next change retries */ } }
  };
  unsubProf = S.subscribe(() => { clearTimeout(profTimer); profTimer = setTimeout(run, 1500); });
  profTimer = setTimeout(run, 2500);
}
let lastGarden = null;
export function stopProfileSync() { if (unsubProf) unsubProf(); unsubProf = null; clearTimeout(profTimer); lastProf = null; lastGarden = null; }

/* ---------- my profile header (Profile tab) ---------- */
export function ProfileHeader({ s }) {
  const user = A.getSession()?.user || {};
  const [counts, setCounts] = useState(null);
  const bd = useBuddies();
  useEffect(() => { A.follows().then((f) => setCounts({ followers: f.followers.length, following: f.following.length, requests: f.requests.length })).catch(() => {}); }, []);
  const n = (v) => (v == null ? '·' : v);
  return html`<div class="card ph">
    <button class="ph-banner" aria-label="Change banner" onClick=${() => openBannerPicker(s.social.banner, (b) => S.update((d) => { d.social.banner = b; }))}>
      <${Banner} b=${s.social.banner} /><span class="ph-banner-edit">🎨</span>
    </button>
    <div class="ph-top">
      <button class="ph-av" aria-label="Change avatar" onClick=${() => openAvatarPicker(s.social.avatar, (a) => S.update((d) => { d.social.avatar = a; }))}>
        <${Avatar} a=${s.social.avatar} name=${user.firstName} size=${76} />
        <span class="ph-av-edit">${Icon.plus()}</span>
      </button>
      <div class="ph-main">
        <div class="pc-name">${user.firstName} ${user.lastName}</div>
        <div class="ph-handle">@${user.username} <span class="ph-vis">${s.social.visibility === 'public' ? '🌍 Public' : '🔒 Private'}</span></div>
      </div>
    </div>
    <${MyStatus} s=${s} />
    ${s.social.bio && html`<p class="ph-bio">${s.social.bio}</p>`}
    <div class="ph-nums">
      <button onClick=${() => openPeople('followers')}><b>${n(counts?.followers)}</b><span>Followers</span></button>
      <button onClick=${() => openPeople('following')}><b>${n(counts?.following)}</b><span>Following</span></button>
      <button onClick=${openBuddiesSheet}><b>${bd.loaded ? bd.buddies.length : '·'}</b><span>Buddies</span></button>
    </div>
    ${counts?.requests > 0 && html`<button class="ph-req" onClick=${() => openPeople('followers')}>👤 ${counts.requests} follow request${counts.requests === 1 ? '' : 's'} waiting</button>`}
    <div class="ph-actions">
      <button class="btn btn-tinted sm" onClick=${openEditProfile}>Edit profile</button>
      <button class="btn btn-plain sm" onClick=${openShareProfile}>Share</button>
    </div>
  </div>`;
}


/* ---------- edit profile ---------- */
export function openEditProfile() { openSheet((close) => html`<${EditProfile} close=${close} />`, { tall: true }); }
function EditProfile({ close }) {
  const s = S.getState();
  const user = A.getSession()?.user || {};
  const [avatar, setAvatar] = useState(s.social.avatar);
  const [banner, setBanner] = useState(s.social.banner || null);
  const [bio, setBio] = useState(s.social.bio || '');
  const adult = user.adult !== false;
  const [vis, setVis] = useState(adult ? s.social.visibility || 'buddies' : 'buddies');
  const [share, setShare] = useState(s.shareStreaks);
  const [stories, setStories] = useState(() => Object.fromEntries(s.quits.map((q) => [q.id, { text: q.story || '', shared: !!q.storyShared }])));
  const setStory = (id, patch) => setStories({ ...stories, [id]: { ...stories[id], ...patch } });
  const save = () => {
    haptic(15);
    S.update((d) => {
      d.social = { ...d.social, avatar, banner, bio: bio.trim().slice(0, 150), visibility: vis };
      d.shareStreaks = share;
      d.quits.forEach((q) => { const st = stories[q.id]; if (st) { q.story = st.text.slice(0, 1000); q.storyShared = st.shared; } });
    });
    toast('Profile saved');
    close();
  };
  return html`
    <${SheetBar} title="Edit profile" left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" onClick=${save}>Save</button>`} />
    <div class="sheet-body">
      <div class="ep-top">
        <button class="ep-banner" aria-label="Change banner" onClick=${() => openBannerPicker(banner, setBanner)}><${Banner} b=${banner} /><span class="ph-banner-edit">🎨</span></button>
        <button class="ep-av" aria-label="Change avatar" onClick=${() => openAvatarPicker(avatar, setAvatar)}><${Avatar} a=${avatar} name=${user.firstName} size=${92} /></button>
        <div class="ep-links"><button class="link sm" onClick=${() => openAvatarPicker(avatar, setAvatar)}>Change avatar</button><button class="link sm" onClick=${() => openBannerPicker(banner, setBanner)}>Change banner</button></div>
      </div>
      <${Group} header="Bio" footer=${`${bio.length}/150`}>
        <div class="note-wrap"><textarea class="note" rows="3" maxlength="150" placeholder="e.g. Quitting vapes for good. Gym 3× a week. Here for the long run 💙" value=${bio} onInput=${(e) => setBio(e.target.value)}></textarea></div>
      <//>
      <${Group} header="Who can see my profile" footer=${vis === 'public'
        ? 'Anyone on Novum can find you in Discover and follow you straight away.'
        : 'Only your buddies and people you’ve approved to follow you. Others just see your name and avatar.'}>
        ${adult ? html`<div class="pad"><${Segmented} options=${[{ value: 'buddies', label: '🔒 Private' }, { value: 'public', label: '🌍 Public' }]} value=${vis} onChange=${setVis} /></div>`
          : html`<div class="row"><span class="row-main"><span class="row-title">🔒 Private</span><span class="row-sub">Under-18 profiles always stay private. Only your buddies can see them.</span></span></div>`}
        <div class="row">
          <span class="row-main"><span class="row-title">Show my streaks</span><span class="row-sub">How long you’ve been free of each thing</span></span>
          <${Toggle} on=${share} label="Show my streaks" onChange=${setShare} />
        </div>
      <//>
      ${s.quits.length > 0 && html`<${Group} header="My story" footer="Your story is private until you switch on “Show on profile”. Share only what you’re comfortable with.">
        ${s.quits.map((q) => html`<div class="story-ed" key=${q.id}>
          <div class="story-h"><span class="row-ic" style="background:${q.color}">${q.emoji}</span><b>${q.label}</b>
            <span class="story-sw"><span>Show on profile</span><${Toggle} on=${stories[q.id]?.shared} label=${`Show ${q.label} story on profile`} onChange=${(v) => setStory(q.id, { shared: v })} /></span></div>
          <textarea class="note" rows="3" maxlength="1000" placeholder=${`How did ${q.label.toLowerCase()} start for you, and why are you stopping?`}
            value=${stories[q.id]?.text || ''} onInput=${(e) => setStory(q.id, { text: e.target.value })}></textarea>
        </div>`)}
      <//>`}
    </div>`;
}

/* ---------- people: Discover, following, followers ---------- */
export function openPeople(tab = 'discover') { openSheet((close) => html`<${People} tab0=${tab} close=${close} />`, { tall: true }); }
function People({ tab0, close }) {
  const [tab, setTab] = useState(tab0);
  const [q, setQ] = useState('');
  const [list, setList] = useState(null);
  const [f, setF] = useState(null);
  const t = useRef();
  const loadFollows = () => A.follows().then(setF).catch(() => {});
  useEffect(() => { loadFollows(); }, []);
  useEffect(() => {
    if (tab !== 'discover') return;
    clearTimeout(t.current);
    t.current = setTimeout(() => { A.people(q.trim()).then((r) => setList(r.people)).catch(() => setList([])); }, q ? 300 : 0);
    return () => clearTimeout(t.current);
  }, [q, tab]);
  const respond = async (p, accept) => { haptic(); try { await A.followRespond(p.username, accept); toast(accept ? `${p.firstName} can now see your profile` : 'Request declined'); } catch (e) { toast(e.message); } loadFollows(); };
  const rows = tab === 'discover' ? list : tab === 'following' ? f?.following : f?.followers;
  const minor = A.getSession()?.user?.adult === false;
  if (minor) return html`
    <${SheetBar} title="People" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body"><div class="card pad pp-private">🔒 <b>Discover and following are for over-18s.</b><br />To keep you safe, strangers can’t find or follow you. Add friends as buddies with their @username instead.</div></div>`;
  return html`
    <${SheetBar} title="People" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body">
      <div class="pad-x"><${Segmented} options=${[{ value: 'discover', label: 'Discover' }, { value: 'following', label: `Following${f ? ` ${f.following.length}` : ''}` }, { value: 'followers', label: `Followers${f ? ` ${f.followers.length}` : ''}` }]} value=${tab} onChange=${setTab} /></div>
      ${tab === 'discover' && html`<div class="card search"><span>🔎</span><input placeholder="Search by name or @username" autocapitalize="none" autocorrect="off" spellcheck="false" value=${q} onInput=${(e) => setQ(e.target.value)} /></div>`}
      ${tab === 'followers' && f?.requests.length > 0 && html`<${Group} header="Follow requests">
        ${f.requests.map((p) => html`<div class="row" key=${p.username}>
          <${Avatar} a=${p.avatar} name=${p.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${p.firstName}</span><span class="row-sub">@${p.username}</span></span>
          <button class="btn btn-tinted sm" onClick=${() => respond(p, true)}>Accept</button>
          <button class="icon-btn muted" aria-label="Decline" onClick=${() => respond(p, false)}>×</button>
        </div>`)}
      <//>`}
      <${Group} header=${tab === 'discover' ? (q.trim().length >= 2 ? 'Results' : 'Public profiles') : ''}
        footer=${tab === 'discover' && !q ? 'Only people who’ve made their profile public show here. Search to find a friend.' : ''}>
        ${rows == null ? html`<${Skeleton} rows=${3} avatar />`
          : rows.length === 0 ? html`<div class="row"><span class="row-main"><span class="row-sub">${tab === 'discover' ? (q ? 'No one found.' : 'No public profiles yet.') : tab === 'following' ? 'You’re not following anyone yet.' : 'No followers yet.'}</span></span></div>`
          : rows.map((p) => html`<button class="row tap" key=${p.username} onClick=${() => openPerson(p.username, loadFollows)}>
              <${Avatar} a=${p.avatar} name=${p.firstName} size=${40} />
              <span class="row-main"><span class="row-title">${p.firstName}${p.buddy ? ' 🤝' : ''}</span><span class="row-sub">@${p.username} · ${p.public ? '🌍 Public' : '🔒 Private'}</span></span>
              <span class="row-chev">${Icon.chevron()}</span>
            </button>`)}
      <//>
      ${f?.blocked.length > 0 && tab !== 'discover' && html`<${Group} header="Blocked">
        ${f.blocked.map((p) => html`<div class="row" key=${p.username}>
          <${Avatar} a=${p.avatar} name=${p.firstName} size=${36} />
          <span class="row-main"><span class="row-title">${p.firstName}</span><span class="row-sub">@${p.username}</span></span>
          <button class="link sm" onClick=${async () => { await A.unblock(p.username).catch(() => {}); toast(`Unblocked ${p.firstName}`); loadFollows(); }}>Unblock</button>
        </div>`)}
      <//>`}
    </div>`;
}

/* ---------- someone's profile ---------- */
export function openPerson(username, onChange) { openSheet((close) => html`<${Person} username=${username} close=${close} onChange=${onChange} />`, { tall: true }); }
function Person({ username, close, onChange }) {
  const [p, setP] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const bd = useBuddies();
  const load = () => A.person(username).then(setP).catch((e) => setErr(e.message));
  useEffect(() => { load(); }, []);
  const act = async (fn, msg) => { if (busy) return; setBusy(true); haptic(10); try { await fn(); if (msg) toast(msg); } catch (e) { toast(e.message); } setBusy(false); load(); refreshBuddies(); onChange?.(); };
  if (err) return html`<${SheetBar} right=${html`<button class="link b" onClick=${close}>Done</button>`} /><div class="sheet-body"><p class="muted center sheet-intro">${err}</p></div>`;
  if (!p) return html`<${SheetBar} right=${html`<button class="link b" onClick=${close}>Done</button>`} /><div class="sheet-body"><div class="sk sk-banner"></div><div class="pp-top"><i class="sk sk-av big"></i><i class="sk sk-l" style="width:40%"></i><i class="sk sk-s" style="width:30%"></i></div><${Skeleton} rows=${2} /></div>`;
  const r = p.relation;
  const now = Date.now();
  const me = S.getState();
  const bud = r.buddy ? bd.buddies.find((x) => x.username === p.username) : null;
  const followBtn = r.following === 'accepted'
    ? html`<button class="btn btn-plain sm" disabled=${busy} onClick=${() => act(() => A.unfollow(p.username), `Unfollowed ${p.firstName}`)}>Following ✓</button>`
    : r.following === 'pending'
      ? html`<button class="btn btn-plain sm" disabled=${busy} onClick=${() => act(() => A.unfollow(p.username), 'Request cancelled')}>Requested</button>`
      : html`<button class="btn btn-primary sm" disabled=${busy} onClick=${() => act(() => A.follow(p.username), p.public ? `Following ${p.firstName}` : 'Follow request sent')}>Follow</button>`;
  const buddyBtn = r.buddy ? html`<span class="pill ok">🤝 Buddies</span>`
    : r.buddyRequest === 'sent' ? html`<span class="pill">Buddy request sent</span>`
      : r.buddyRequest === 'received' ? html`<button class="btn btn-tinted sm" disabled=${busy} onClick=${() => act(() => A.buddyRespond(p.username, true), `You and ${p.firstName} are buddies 🤝`)}>Accept buddy</button>`
        : html`<button class="btn btn-tinted sm" disabled=${busy} onClick=${() => act(() => A.buddyRequest(p.username), 'Buddy request sent')}>Add buddy</button>`;
  const more = () => openSheet((c2) => html`
    <${SheetBar} title=${`@${p.username}`} right=${html`<button class="link b" onClick=${c2}>Close</button>`} />
    <div class="sheet-body">
      <${Group}>
        ${r.followsMe === 'accepted' && html`<${Row} icon="👤" iconBg="#8E8E93" title="Remove as follower" onClick=${() => { c2(); act(() => A.removeFollower(p.username), 'Follower removed'); }} />`}
        <${Row} icon="🚩" iconBg="#FF9F0A" title="Report" chevron onClick=${() => { c2(); setTimeout(() => openReport(p), 300); }} />
        <${Row} icon="⛔" iconBg="#FF453A" title=${r.blockedByMe ? 'Unblock' : 'Block'} danger onClick=${() => { c2(); act(() => (r.blockedByMe ? A.unblock(p.username) : A.block(p.username)), r.blockedByMe ? 'Unblocked' : `Blocked ${p.firstName}. They can’t find or follow you.`); }} />
      <//>
    </div>`);
  return html`
    <${SheetBar} left=${html`<button class="link" onClick=${more}>•••</button>`} right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body person">
      <${Banner} b=${p.banner} className="pp-banner" />
      <div class="pp-top">
        <${Avatar} a=${p.avatar} name=${p.firstName} size=${96} className="pp-av" />
        <h2 class="auth-title center">${p.firstName}</h2>
        <div class="row-sub center">@${p.username} · ${p.public ? '🌍 Public' : '🔒 Private'}${r.followsMe === 'accepted' ? ' · Follows you' : ''}</div>
        <div class="ph-counts center"><span><b>${p.counts.followers}</b> followers</span><span><b>${p.counts.following}</b> following</span></div>
        ${(p.status || bud) && html`<div class="pp-tags"><${StatusTag} status=${p.status} now=${now} />${bud && html`<${TogetherTag} s=${me} buddy=${bud} now=${now} long />`}</div>`}
        ${!r.blockedByMe && html`<div class="pp-actions">${p.canFollow !== false && followBtn}${buddyBtn}</div>`}
      </div>
      ${!r.blockedByMe && !p.private && p.bio && html`<p class="pp-bio">${p.bio}</p>`}
      ${!r.blockedByMe && p.garden && html`<${BuddyGarden} g=${p.garden} person=${p} />`}
      ${r.blockedByMe ? html`<p class="muted center">You’ve blocked ${p.firstName}. Tap ••• to unblock.</p>`
      : p.private ? html`<div class="card pad pp-private">🔒 <b>${p.firstName}’s profile is private.</b><br />Follow to send a request, or become buddies to see their streaks and story.</div>`
      : html`
        ${p.streaks?.quits?.length > 0 && html`<${Group} header="Streaks">
          ${p.streaks.quits.map((x) => {
            const d = x.startMs > now ? null : Math.floor((now - x.startMs) / DAY);
            return html`<div class="row" key=${x.label}>
              <span class="row-ic" style="background:${x.color}">${x.emoji}</span>
              <span class="row-main"><span class="row-title">${d == null ? 'Quit day coming up' : `${d} day${d === 1 ? '' : 's'} ${x.label.toLowerCase()}-free`}</span>
                ${x.bestMs > 0 && html`<span class="row-sub">Best run ${Math.floor(Math.max(x.bestMs, now - x.startMs) / DAY)} days</span>`}</span>
            </div>`;
          })}
        <//>`}
        ${p.streaks?.badges?.length > 0 && html`<section class="group"><${BadgeShelf} earned=${p.streaks.badges} name=${p.firstName} /></section>`}
        ${p.stories?.length > 0 && html`<${Group} header="Their story">
          ${p.stories.map((x) => html`<div class="story" key=${x.label}><b>${x.emoji} ${x.label}</b><p>${x.text}</p></div>`)}
        <//>`}
        ${r.buddy && html`<${Group} header="Send a cheer" footer=${p.status?.kind === 'tough' ? `${p.firstName}’s having a tough day. A cheer now really helps.` : ''}>
          <div class="pad-y"><${CheerBar} who=${p} class="pp-cheers" /></div>
        <//>`}
        ${!p.bio && !p.streaks && !p.stories?.length && html`<p class="muted center">${p.firstName} hasn’t shared anything yet.</p>`}`}
    </div>`;
}

const REASONS = ['Inappropriate profile', 'Harassment or bullying', 'Spam or fake account', 'Encouraging use', 'Something else'];
function openReport(p) { openSheet((close) => html`<${Report} p=${p} close=${close} />`); }
function Report({ p, close }) {
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [block, setBlock] = useState(true);
  const send = async () => {
    haptic(12);
    try {
      await A.report(p.username, reason, note.trim());
      if (block) await A.block(p.username);
      toast('Thanks. The person who runs Novum will look at it.');
      close();
    } catch (e) { toast(e.message); }
  };
  return html`
    <${SheetBar} title=${`Report @${p.username}`} left=${html`<button class="link" onClick=${close}>Cancel</button>`} right=${html`<button class="link b" disabled=${!reason} onClick=${send}>Send</button>`} />
    <div class="sheet-body">
      <${Group} header="What’s wrong?">
        ${REASONS.map((x) => html`<button class="row tap" key=${x} onClick=${() => { haptic(6); setReason(x); }}>
          <span class="row-main"><span class="row-title">${x}</span></span>${reason === x && html`<span class="row-detail accent">✓</span>`}</button>`)}
      <//>
      <${Group} header="Anything to add? (optional)">
        <div class="note-wrap"><textarea class="note" rows="2" maxlength="500" value=${note} onInput=${(e) => setNote(e.target.value)}></textarea></div>
      <//>
      <${Group}><div class="row"><span class="row-main"><span class="row-title">Also block them</span></span><${Toggle} on=${block} label="Also block" onChange=${setBlock} /></div><//>
    </div>`;
}
