const CACHE_NAME = 'planet-image-cache-v1';
const urlsToCache = [
  'https://cryptospro.com.br/planetas/planeta_0000_tatooine.png',
  'https://cryptospro.com.br/planetas/planeta_0001_naboo.png',
  'https://cryptospro.com.br/planetas/planeta_0000_tatooine.png',
  'https://cryptospro.com.br/planetas/planeta_0001_naboo.png',
  'https://cryptospro.com.br/planetas/planeta_0002_mustafar.png',
  'https://cryptospro.com.br/planetas/planeta_0003_kashyyyk.png',
  'https://cryptospro.com.br/planetas/planeta_0004_hoth.png',
  'https://cryptospro.com.br/planetas/planeta_0005_endor.png',
  'https://cryptospro.com.br/planetas/planeta_0006_dagobah.png',
  'https://cryptospro.com.br/planetas/planeta_0007_coruscant.png',
  'https://cryptospro.com.br/planetas/planeta_0008_bespin.png',
  'https://cryptospro.com.br/planetas/planeta_0009_alderaan.png',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(response => {
                    if(!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    return response;
                });
            })
    );
});
