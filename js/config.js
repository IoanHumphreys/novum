// Push notification server settings.
// Fill these in after deploying the novum-push Cloudflare Worker (see its README).
export const PUSH = {
  // e.g. 'https://novum-push.your-name.workers.dev'
  server: '',
  // The VAPID public key printed by `node gen-vapid.mjs`
  vapidPublicKey: '',
};
