self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open("life-os-cache").then(cache=>{
      return cache.addAll([
        "./",
        "bomberbroyt61-hash/Life-os",
        "manifest.json",
        "icon-192.png",
        "icon-512.png"
      ]);
    })
  );
});
self.addEventListener("fetch",e=>{
  e.respondWith(
    caches.match(e.request).then(response=>response||fetch(e.request))
  );
});
