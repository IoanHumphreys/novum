// Push notification server settings.
// Fill these in after deploying the novum-push Cloudflare Worker (see its README).
export const PUSH = {
  // e.g. 'https://novum-push.your-name.workers.dev'
  server: 'https://novum-push.ioanrhyshumph.workers.dev',
  // The VAPID public key printed by `node gen-vapid.mjs`
  vapidPublicKey: 'BMQcoC3nylJ79_MMfB9VwRLwvnj8bpi9ONY1HPOsfc-wbPw1FMml6BiuPRfi_GoN8L_p_fWfZYRqBum0qGUpGR8',
};
