import{d as L,f as T}from"./c-ZFXIPNDX.js";import{E as F,F as S,G as D,H as E,I as R,J as M}from"./c-HECOZTOP.js";import{Ea as g,Ha as A,La as u,Ma as v,Ra as m,Sa as C,b as c,c as B,f as t,ya as w}from"./c-VMQ5LPX3.js";var f=e=>{if(!e)return"never";let a=Math.floor((Date.now()-e)/6e4);if(a<2)return"just now";if(a<60)return`${a} min ago`;let r=Math.floor(a/60);if(r<24)return`${r} hr${r===1?"":"s"} ago`;let n=Math.floor(r/24);return`${n} day${n===1?"":"s"} ago`},b=e=>new Date(e).toLocaleString("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}),N={delivered:"✅ Delivered",requests:"📤 Sent",opened:"👀 Opened",clicks:"👆 Clicked",softBounces:"⚠️ Soft bounce",hardBounces:"❌ Bounced",blocked:"⛔ Blocked",spam:"🚫 Marked spam",error:"❌ Error",deferred:"⏳ Delayed",invalid:"❌ Invalid address"};function Q(){g(e=>t`<${O} close=${e} />`,{tall:!0})}function O({close:e}){let[a,r]=c(null),[n,i]=c(""),[l,d]=c(!1),p=async()=>{i("");try{r(await F()),d(!1)}catch(s){s.data?.adminCode?d(!0):i(s.message)}};return B(()=>{p()},[]),t`
    <${A} title="Admin" left=${t`<button class="link" onClick=${p}>Refresh</button>`} right=${t`<button class="link b" onClick=${e}>Done</button>`} />
    <div class="sheet-body">
      ${l&&t`<${P} onDone=${p} />`}
      ${n&&t`<p class="auth-err center">${n}</p>`}
      ${!a&&!n&&!l&&t`<${C} rows=${4} avatar />`}
      ${a&&t`
        ${a.health&&t`<${I} h=${a.health} />`}
        <div class="tiles admin-tiles">
          <div class="tile"><span class="tile-k">👥 Accounts</span><b>${a.users.length}/${a.maxUsers}</b><span class="tile-u">spaces used</span></div>
          <div class="tile"><span class="tile-k">✉️ Email codes</span><b>${a.emailCodes?"On":"Off"}</b><span class="tile-u">Brevo</span></div>
          <div class="tile"><span class="tile-k">🤖 Bot check</span><b>${a.turnstile?"On":"Off"}</b><span class="tile-u">Turnstile</span></div>
          <div class="tile ${a.errorsToday?"warn":""}"><span class="tile-k">⚠️ Errors</span><b>${a.errorsToday??0}</b><span class="tile-u">in the last 24 hours</span></div>
          <div class="tile"><span class="tile-k">🚩 Reports</span><b>${a.reports?.length??0}</b><span class="tile-u">to look at</span></div>
        </div>

        <${u} header="People" footer="Tap someone to reset their password if they’re locked out.">
          ${a.users.map(s=>t`<${v} key=${s.id} icon=${(s.name||"?")[0]} iconBg="#3B9BFF" title=${`${s.name} · @${s.username}`}
            sub=${`Seen ${f(s.lastSeen)} · ${s.devices} notif. device${s.devices===1?"":"s"} · ${s.buddies} buddies`} chevron onClick=${()=>J(s)} />`)}
        <//>

        ${a.reports?.length>0&&t`<${u} header="Reports" footer="Reported people are blocked for the reporter if they chose to. Reset a password or ask them to delete their account if needed.">
          ${a.reports.map((s,o)=>t`<div class="row" key=${o}>
            <span class="row-ic" style="background:#FF9F0A">🚩</span>
            <span class="row-main"><span class="row-title">@${s.reported} · ${s.reason}</span><span class="row-sub">From @${s.reporter} · ${b(s.at)}${s.note?` · “${s.note}”`:""}</span></span>
          </div>`)}
        <//>`}

        ${a.versions?.length>0&&t`<${u} header="App errors by version (7 days)" footer="Newest release first. If a new version suddenly has lots of errors from several people, something in that update broke.">
          ${a.versions.map((s,o)=>{let h=o===0&&(s.people>=3||s.startup>=2);return t`<div class="row" key=${s.version}>
              <span class="row-ic" style=${`background:${h?"#FF453A":s.n?"#FF9F0A":"#30D158"}`}>${h?"🔥":"🏷️"}</span>
              <span class="row-main"><span class="row-title">${s.version.replace("novum-","")} · ${s.n} error${s.n===1?"":"s"} from ${s.people||"no"} ${s.people===1?"person":"people"}${s.startup?` · ${s.startup} startup`:""}</span>
                <span class="row-sub">${s.top?`Most common: ${s.top}`:""}${s.top?" · ":""}last ${f(s.last)}</span></span>
            </div>`})}
        <//>`}

        <${H} list=${a.backups||[]} />

        ${a.errors?.length>0&&t`<${u} header="Errors (last 14 days)" footer="“App” errors happened on someone’s phone; “server” errors on Novum’s server. Send me the message if one keeps happening.">
          ${a.errors.map((s,o)=>t`<div class="row" key=${o}>
            <span class="row-ic" style="background:${s.side==="server"?"#FF453A":"#FF9F0A"}">⚠️</span>
            <span class="row-main"><span class="row-title">${s.message}</span><span class="row-sub">${s.side==="server"?"Server":"App"} · ${s.place||"?"} · ${b(s.at)}</span></span>
          </div>`)}
        <//>`}

        <${u} header="Recent emails (7 days)" footer="Codes are hidden. If someone says a code never came, look for their address here.">
          ${a.mail.length?a.mail.map((s,o)=>t`<div class="row" key=${o}>
            <span class="row-main"><span class="row-title">${N[s.event]||s.event} · ${s.to}</span><span class="row-sub">${b(s.at)} · ${s.subject}</span></span>
          </div>`):t`<div class="row"><span class="row-main"><span class="row-sub">No emails in the last week.</span></span></div>`}
        <//>`}
    </div>`}var j=e=>e==null?"–":`${Math.round(e*100)}%`,z=e=>new Date(`${e}T12:00:00Z`).toLocaleDateString("en-GB",{weekday:"short"});function I({h:e}){let a=!e.issues.length,r=Math.max(1,...e.push.days.map(n=>n.ok+n.failed+n.gone));return t`<section class="group first">
    <div class="ah-status ${a?"ok":"warn"}">
      <span class="ah-ic">${a?"✅":"⚠️"}</span>
      <span class="row-main"><b>${a?"All good":"Needs a look"}</b>
        <span>${a?"No startup problems today and notifications are getting through.":e.issues.join(" · ")}</span></span>
    </div>
    <div class="tiles admin-tiles">
      <div class="tile"><span class="tile-k">🟢 Active</span><b>${e.active.day}</b><span class="tile-u">today · ${e.active.week} this week · ${e.active.month} this month</span></div>
      <div class="tile ${e.push.rate!=null&&e.push.rate<.9?"warn":""}"><span class="tile-k">🔔 Delivered</span><b>${j(e.push.rate)}</b><span class="tile-u">${e.push.tracked?`${e.push.ok} of ${e.push.ok+e.push.failed} notifications, 7 days`:"starts after the server update"}</span></div>
      <div class="tile ${e.startup.day?"warn":""}"><span class="tile-k">🚀 Startup problems</span><b>${e.startup.day}</b><span class="tile-u">today · ${e.startup.total} in 14 days</span></div>
      <div class="tile"><span class="tile-k">📱 Phones</span><b>${e.devices.total}</b><span class="tile-u">with notifications, ${e.devices.people} people</span></div>
    </div>
    ${e.push.tracked&&t`<div class="card pad ah-push">
      <div class="ah-h">Notifications, last 7 days</div>
      <div class="ah-bars">${e.push.days.map(n=>{let i=n.ok+n.failed+n.gone;return t`<div class="ah-bar" key=${n.day} title=${`${n.ok} delivered, ${n.failed} failed, ${n.gone} expired`}>
          <span class="ah-n">${i||""}</span>
          <span class="ah-col" style=${`height:${i/r*100}%`}>
            ${n.gone>0&&t`<i class="g" style=${`flex:${n.gone}`}></i>`}${n.failed>0&&t`<i class="f" style=${`flex:${n.failed}`}></i>`}${n.ok>0&&t`<i class="o" style=${`flex:${n.ok}`}></i>`}
          </span>
          <span class="ah-d">${z(n.day)}</span>
        </div>`})}</div>
      <div class="ah-key"><span><i class="o"></i>Delivered</span><span><i class="f"></i>Failed</span><span><i class="g"></i>Expired phone</span></div>
    </div>`}
    ${e.startup.list.length>0&&t`<${u} header="Startup problems (14 days)" footer="Sent when the app couldn’t start on someone’s phone. Lots from the same device after a release usually means a bad offline copy: ask them to close and reopen Novum twice.">
      ${e.startup.list.map((n,i)=>t`<div class="row" key=${i}>
        <span class="row-ic" style="background:#FF9F0A">🚀</span>
        <span class="row-main"><span class="row-title">${n.message}</span><span class="row-sub">${n.device} · ${b(n.at)}</span></span>
      </div>`)}
    <//>`}
  </section>`}var G=e=>e>=1048576?`${(e/1048576).toFixed(1)} MB`:`${Math.max(1,Math.round(e/1024))} KB`;function H({list:e}){let[a,r]=c(e),[n,i]=c(""),l=async()=>{i("new");try{let o=await R();r([o.backup,...a]),w(15),m("Backup made")}catch(o){m(o.message)}i("")},d=async o=>{i(o.id);try{let h=await M(o.id),$=Uint8Array.from(atob(h.data),U=>U.charCodeAt(0)),y=URL.createObjectURL(new Blob([$],{type:"application/gzip"})),k=document.createElement("a");k.href=y,k.download=`novum-backup-${o.id}.json.gz`,document.body.appendChild(k),k.click(),k.remove(),setTimeout(()=>URL.revokeObjectURL(y),5e3),m("Backup saved")}catch(h){m(h.message)}i("")},p=a[0],s=!p||Date.now()-p.at>8*864e5;return t`<${u} header="Backups" footer="Every table in the database, made each Monday at 3am and kept for 5 weeks. App data inside is still encrypted. To restore one, save it and follow “Restoring a backup” in the server’s README.">
    ${a.length?a.map(o=>t`<div class="row" key=${o.id}>
      <span class="row-ic" style="background:#30D158">💾</span>
      <span class="row-main"><span class="row-title">${b(o.at)}</span><span class="row-sub">${G(o.bytes)} · ${o.rows} rows · ${f(o.at)}</span></span>
      <button class="link sm" disabled=${!!n} onClick=${()=>d(o)}>${n===o.id?"Saving…":"Save"}</button>
    </div>`):t`<div class="row"><span class="row-main"><span class="row-sub">No backups yet. The first one is made next Monday, or tap below.</span></span></div>`}
    <div class="row">
      <span class="row-ic" style=${`background:${s?"#FF9F0A":"#8E8E93"}`}>${s?"⚠️":"➕"}</span>
      <span class="row-main"><span class="row-title">${s&&a.length?"Last backup is over a week old":"Back up now"}</span></span>
      <button class="link sm b" disabled=${!!n} onClick=${l}>${n==="new"?"Backing up…":"Back up"}</button>
    </div>
  <//>`}function P({onDone:e}){let[a,r]=c(""),[n,i]=c(""),[l,d]=c(!1),[p,s]=c(""),o=async()=>{d(!0),s("");try{let $=await D();r($.emailHint),w(10)}catch($){s($.message)}d(!1)},h=async($=n)=>{if(!($.length!==6||l)){d(!0),s("");try{await E($),w(20),m("Admin unlocked for 30 minutes"),e()}catch(y){s(y.message),i("")}d(!1)}};return t`<div class="admin-lock">
    <div class="wiz-emoji">🔐</div>
    <h2 class="auth-title center">${a?"Check your email":"Admin is locked"}</h2>
    <p class="wiz-sub center">${a?t`We sent a 6-digit code to <b class="wiz-em">${a}</b>.`:"To keep everyone’s details safe, Admin needs a code from your email. It then stays open on this device for 30 minutes."}</p>
    ${a?t`<${T} email=${a} /><${L} value=${n} onChange=${$=>{s(""),i($)}} onComplete=${h} />
      <button class="link center-link" disabled=${l} onClick=${o}>Send a new code</button>`:t`<button class="btn btn-primary block" disabled=${l} onClick=${o}>${l?"Sending…":"Email me a code"}</button>`}
    ${p&&t`<p class="auth-err center">${p}</p>`}
  </div>`}function J(e){g(a=>t`<${q} u=${e} close=${a} />`)}function q({u:e,close:a}){let[r,n]=c(""),[i,l]=c(!1),d=async()=>{l(!0);try{let s=await S(e.id);n(s.password),w(15)}catch(s){m(s.data?.adminCode?"Admin locked again. Close Admin and unlock it.":s.message)}l(!1)},p=async()=>{try{await navigator.clipboard.writeText(r),m("Copied")}catch{m(r)}};return t`
    <${A} title=${e.name} right=${t`<button class="link b" onClick=${a}>Done</button>`} />
    <div class="sheet-body">
      <${u}>
        <${v} title="Username" detail=${`@${e.username}`} />
        <${v} title="Email" detail=${e.email} />
        <${v} title="Joined" detail=${new Date(e.createdAt).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})} />
        <${v} title="Last seen" detail=${f(e.lastSeen)} />
        <${v} title="Logged in on" detail=${`${e.sessions} device${e.sessions===1?"":"s"}`} />
      <//>
      ${r?t`<div class="card pad admin-pw">
          <p class="muted">Temporary password for @${e.username}. Send it to them privately. They’re logged out everywhere and should change it in Account after logging in.</p>
          <div class="admin-pw-v">${r}</div>
          <button class="btn btn-tinted block" onClick=${p}>Copy</button>
        </div>`:t`<button class="btn btn-danger block" disabled=${i} onClick=${d}>${i?"Resetting…":"Reset password"}</button>
        <p class="muted center tiny mt8">Makes a temporary password and logs them out of every device.</p>`}
    </div>`}export{Q as openAdmin};
