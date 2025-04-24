const cacheName = 'musicPlayer-v1';
const staticAssets = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'covers/1.png',
  'covers/2.jpg',
  'covers/3.avif',
  'covers/4.jpg',
  "songs/1-Alibi.m4a",
  "songs/10-Millionaire.m4a",
  "songs/11-Sau Tarah ke.webm",
  "songs/12-Move.m4a",
  "songs/13-Paro.m4a",
  "songs/14-Toh Dishoom.webm",
  "songs/15-Ek Aisa Woh Jaha tha.webm",
  "songs/16-Popular.m4a",
  "songs/17-Choose Your Fighter.webm",
  "songs/18-SweetHeart.m4a",
  "songs/19-People.webm",
  "songs/2-Blood Water.webm",
  "songs/20-Night.m4a",
  "songs/21-Blue Bird.webm",
  "songs/22-We'll Be Alright.webm",
  "songs/23-Grand Escape.webm",
  "songs/24-Shinunoga E-wa.webm",
  "songs/25-Suzume.webm",
  "songs/26-Die with a Smile.webm",
  "songs/27-HoneyPie.webm",
  "songs/28-Rise UP.webm",
  "songs/29-Dard Aur Dava.webm",
  "songs/3-I wanna be yours.webm",
  "songs/30-Perfect.webm",
  "songs/31-Favorite.webm",
  "songs/32-Line without a Hook.webm",
  "songs/33-Zindagi bata de.webm",
  "songs/34-Jhol.webm",
  "songs/35-Khata.webm",
  "songs/36-Soulmate.webm",
  "songs/37-Zinda.webm",
  "songs/38-Aakhri Saans.webm",
  "songs/39-Paaro.webm",
  "songs/4-Sparkle.m4a",
  "songs/40-Paro by Aditya Rikhari.webm",
  "songs/41-Krishna ki Chetavani.webm",
  "songs/42-Izhaar.webm",
  "songs/43-Izhaar Valentine Special.webm",
  "songs/44-She Dont Give A.webm",
  "songs/45-Suniyan Suniyan.webm",
  "songs/46-Sahiba.webm",
  "songs/47-Katsuri.webm",
  "songs/48-Pal.webm",
  "songs/49-Cheap Thrills X  Saathiyaa.webm",
  "songs/5-Courtesy Call.webm",
  "songs/50- Saathiyaa.webm",
  "songs/51-Let me down Slowly.webm",
  "songs/52-Let Me Love You x Tum Hi Ho.webm",
  "songs/53-Tum Hi ho.webm",
  "songs/54-Kya Mujhe Pyaar hai.webm",
  "songs/55-Mann Mera.webm",
  "songs/56-Tu Junooniyat.webm",
  "songs/57-Maan Meri Jaan.webm",
  "songs/6-Cherri Cherri Lady.m4a",
  "songs/7-I wanna be your Slave.m4a",
  "songs/8-Jalebi Baby.m4a",
  "songs/9-Sanson ki Mala.webm"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(staticAssets))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== cacheName)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
