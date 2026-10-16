const C='signscout-v17';const SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png','https://unpkg.com/leaflet@1.9.4/dist/leaflet.css','https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).catch(()=>{}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=e.request.url;if(u.includes('openstreetmap.org')||u.includes('openfreemap.org')||u.includes('arcgis.com')||u.includes('censusreporter.org')||u.includes('census.gov'))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok&&(u.startsWith(self.location.origin)||u.includes('unpkg.com'))){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request)))});
