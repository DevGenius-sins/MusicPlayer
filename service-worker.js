const cacheName = 'musicPlayer-v1';
const staticAssets = [
  '/MusicPlayer/',
  '/MusicPlayer/index.html',
  '/MusicPlayer/stye.css',
  '/MusicPlayer/script.js',
  '/MusicPlayer/manifest.json',
  '/MusicPlayer/Logo.png',
  '/MusicPlayer/icons/icon-192x192.png',
  '/MusicPlayer/icons/icon-512x512.png',
  '/MusicPlayer/covers/1.png',
  '/MusicPlayer/covers/2.jpg',
  '/MusicPlayer/covers/3.avif',
  '/MusicPlayer/covers/4.jpg',
  '/MusicPlayer/songs/1-Alibi.m4a',
  '/MusicPlayer/songs/10-Millionaire.m4a',
  '/MusicPlayer/songs/11-Sau Tarah ke.webm',
  '/MusicPlayer/songs/12-Move.m4a',
  '/MusicPlayer/songs/13-Paro.m4a',
  '/MusicPlayer/songs/14-Toh Dishoom.webm',
  '/MusicPlayer/songs/15-Ek Aisa Woh Jaha tha.webm',
  '/MusicPlayer/songs/16-Popular.m4a',
  '/MusicPlayer/songs/17-Choose Your Fighter.webm',
  '/MusicPlayer/songs/18-SweetHeart.m4a',
  '/MusicPlayer/songs/19-People.webm',
  '/MusicPlayer/songs/2-Blood Water.webm',
  '/MusicPlayer/songs/20-Night.m4a',
  '/MusicPlayer/songs/21-Blue Bird.webm',
  '/MusicPlayer/songs/22-We\'ll Be Alright.webm',
  '/MusicPlayer/songs/23-Grand Escape.webm',
  '/MusicPlayer/songs/24-Shinunoga E-wa.webm',
  '/MusicPlayer/songs/25-Suzume.webm',
  '/MusicPlayer/songs/26-Die with a Smile.webm',
  '/MusicPlayer/songs/27-HoneyPie.webm',
  '/MusicPlayer/songs/28-Rise UP.webm',
  '/MusicPlayer/songs/29-Dard Aur Dava.webm',
  '/MusicPlayer/songs/3-I wanna be yours.webm',
  '/MusicPlayer/songs/30-Perfect.webm',
  '/MusicPlayer/songs/31-Favorite.webm',
  '/MusicPlayer/songs/32-Line without a Hook.webm',
  '/MusicPlayer/songs/33-Zindagi bata de.webm',
  '/MusicPlayer/songs/34-Jhol.webm',
  '/MusicPlayer/songs/35-Khata.webm',
  '/MusicPlayer/songs/36-Soulmate.webm',
  '/MusicPlayer/songs/37-Zinda.webm',
  '/MusicPlayer/songs/38-Aakhri Saans.webm',
  '/MusicPlayer/songs/39-Paaro.webm',
  '/MusicPlayer/songs/4-Sparkle.m4a',
  '/MusicPlayer/songs/40-Paro by Aditya Rikhari.webm',
  '/MusicPlayer/songs/41-Krishna ki Chetavani.webm',
  '/MusicPlayer/songs/42-Izhaar.webm',
  '/MusicPlayer/songs/43-Izhaar Valentine Special.webm',
  '/MusicPlayer/songs/44-She Dont Give A.webm',
  '/MusicPlayer/songs/45-Suniyan Suniyan.webm',
  '/MusicPlayer/songs/46-Sahiba.webm',
  '/MusicPlayer/songs/47-Katsuri.webm',
  '/MusicPlayer/songs/48-Pal.webm',
  '/MusicPlayer/songs/49-Cheap Thrills X  Saathiyaa.webm',
  '/MusicPlayer/songs/5-Courtesy Call.webm',
  '/MusicPlayer/songs/50- Saathiyaa.webm',
  '/MusicPlayer/songs/51-Let me down Slowly.webm',
  '/MusicPlayer/songs/52-Let Me Love You x Tum Hi Ho.webm',
  '/MusicPlayer/songs/53-Tum Hi ho.webm',
  '/MusicPlayer/songs/54-Kya Mujhe Pyaar hai.webm',
  '/MusicPlayer/songs/55-Mann Mera.webm',
  '/MusicPlayer/songs/56-Tu Junooniyat.webm',
  '/MusicPlayer/songs/57-Maan Meri Jaan.webm',
  '/MusicPlayer/songs/6-Cherri Cherri Lady.m4a',
  '/MusicPlayer/songs/7-I wanna be your Slave.m4a',
  '/MusicPlayer/songs/8-Jalebi Baby.m4a',
  '/MusicPlayer/songs/9-Sanson ki Mala.webm'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(staticAssets);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
