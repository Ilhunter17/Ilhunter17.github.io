
const cacheName = "my-pwa";
const precached = [
    "/index.html",
    "/css/animate.css",
    "/css/bootstrap.min.css",
    "/css/font-awesome.min.css",
    "/css/templatemo.style.css",
    "/fonts/fontawesome.webfont.eot",
    "/fonts/fontawesome.webfont.svg",
    "/fonts/fontawesome.webfont.ttf",
    "/fonts/fontawesome.webfont.woff",
    "/fonts/fontawesome.webfont.woff2",
    "/fonts/FontAwesome.otf",
    "/js/bootstrap.min.js",
    "/js/custom.js",
    "/js/jquery.js",
    "/js/jquery.parallax.js",
    "/js/smoothscroll.js",
    "/js/wow.min.js",
    "/images/icon-pwa-192x192.png",
    "/images/icon-pwa-512x512.png",
    "/images/education-img.jpg",
    "/images/experience-img.jpg",
    "/images/profile1.jpg",
    "/images/profile2.jpg",
    "/images/profile3.jpg",
    "/images/quotes-bg.jpg",
    "/firebase-messaging-sw.js",
    "/indexedDB.js"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll(precached))
    );
});

// Event 'activate': cleaning up old caches
self.addEventListener("activate", (event) => {
    const cacheAllowlist = [cacheName]; // Only allow current cache

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (!cacheAllowlist.includes(name)) {
                        console.log(`Deleting old cache: ${name}`);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});

// Event 'fetch': serve cached files or fallback to network
self.addEventListener('fetch',(event)=>{
    event.respondWith(caches.open(cacheName).then((cache)=>{
        return fetch(event.request.url).then((fetchResponse)=>{
            cache.put(event.request, fetchResponse.clone());

            return fetchResponse;
        }).catch(()=>{
            return cache.match(event.request.url);
        });
    }));

});