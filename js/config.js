// Push notification server settings.
// Fill these in after deploying the novum-push Cloudflare Worker (see its README).
export const PUSH = {
  // e.g. 'https://novum-push.your-name.workers.dev'
  server: 'https://novum-push.ioanrhyshumph.workers.dev',
  // The VAPID public key printed by `node gen-vapid.mjs`
  vapidPublicKey: 'BMMZgulp2BsTfdhVLc6-XERQ_b1PW2vRcwOG4QyWB1XJkuHDQMItBfHScaRxuAjO4UO4qHb0gi-VyussBHPN55U',
};
