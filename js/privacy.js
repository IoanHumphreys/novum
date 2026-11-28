// Privacy notice: what Novum stores, who can see it, and how to get it or delete it.
// Plain English on purpose. Shown at sign-up (with a consent tick box), on the welcome screen and in Profile.
import { html, openSheet, SheetBar } from './ui.js';

export function openPrivacy() {
  openSheet((close) => html`<${Privacy} close=${close} />`, { tall: true });
}

const UPDATED = '27 November 2026';

function Privacy({ close }) {
  return html`
    <${SheetBar} title="Privacy" right=${html`<button class="link b" onClick=${close}>Done</button>`} />
    <div class="sheet-body privacy">
      <p class="pv-lead">Novum is a small, free app run by one person for friends. This explains, in plain English, what it stores and who can see it. Last updated ${UPDATED}.</p>

      <h3>What Novum stores</h3>
      <ul>
        <li><b>Your account:</b> name, username, email, date of birth and a scrambled (hashed) version of your password. Your actual password is never stored.</li>
        <li><b>What you track:</b> what you’re quitting and when, money it cost, check-ins (mood, cravings, sleep, notes), goals, reasons, slips and weight.</li>
        <li><b>Your profile:</b> cartoon avatar, bio and any stories you choose to share.</li>
        <li><b>Notifications:</b> if you turn them on, your phone’s notification address and reminder times, plus the dates (not the names or plans) of tough days you plan for and when your letters to future you unlock (never what’s in them), so Novum can remind you.</li>
        <li><b>Craving SOS:</b> when you open it or beat a craving, Novum adds one to an anonymous count (just the time, nothing about you) so it can say how many people rode one out today.</li>
        <li><b>Logins:</b> which devices are logged in and when they were last used.</li>
      </ul>
      <p>What you’re quitting, your check-ins and your weight are <b>health information</b>, which the law treats as extra sensitive. Novum only uses it to run the app for you, and only with your agreement (the tick box when you sign up).</p>

      <h3>Who can see it</h3>
      <ul>
        <li><b>You.</b> Everything.</li>
        <li><b>Your buddies and approved followers:</b> only your name, avatar, bio, streaks (if “Show my streaks” is on) and any stories you switched on. Buddies also hear about your milestones, and round money-saved amounts like £100 or £500, but only if you turn those on in Buddies. Never your check-ins, notes, exact spending, weight or slips.</li>
        <li><b>Everyone on Novum:</b> only if you set your profile to Public (over-18s only). Otherwise, just your first name and avatar.</li>
        <li><b>The person who runs Novum:</b> your tracking data is encrypted in the database, but the server holds the key so it can send reminders and recaps. So technically the admin could read it. They won’t, and the Admin page only shows names, usernames, emails, last-seen times and reports.</li>
      </ul>

      <h3>Under 18</h3>
      <p>You must be 16 or over to join. If you’re 16 or 17, your profile always stays private: strangers can’t find you, follow you or see you in Discover. Only buddies you accept can see your streaks.</p>

      <h3>Where it’s kept, and who helps</h3>
      <ul>
        <li><b>Cloudflare</b> runs the server and database, and checks sign-ups for bots (Turnstile).</li>
        <li><b>Brevo</b> sends the emails with your codes. It sees your email address and name.</li>
        <li><b>GitHub</b> hosts the app’s code (no personal data).</li>
        <li><b>DiceBear</b> draws the cartoon avatars. It only gets a random code, never your name.</li>
        <li><b>Apple or Google</b> deliver notifications to your phone.</li>
      </ul>
      <p>Nothing is sold, used for ads or shared with anyone else.</p>

      <h3>How it’s protected</h3>
      <ul>
        <li>Passwords are hashed with a secret extra key, so even a stolen database couldn’t reveal them.</li>
        <li>Your tracking data is encrypted in the database (AES-256).</li>
        <li>Logging in and deleting your account need a code from your email.</li>
        <li>Everything travels over HTTPS.</li>
      </ul>

      <h3>Your choices</h3>
      <ul>
        <li><b>See or download everything:</b> Profile → Your data → Export a copy.</li>
        <li><b>Change who sees you:</b> Profile → Edit profile.</li>
        <li><b>Delete everything:</b> Profile → Account → Delete account. It’s removed from the server straight away, including buddies, follows and reports about you.</li>
        <li><b>Questions, or to ask what’s held about you:</b> email <a href="mailto:hello@novumdaily.com">hello@novumdaily.com</a>.</li>
      </ul>
      <p class="muted tiny">If you’re unhappy with how your data is handled you can complain to the Information Commissioner’s Office (ico.org.uk).</p>
    </div>`;
}
