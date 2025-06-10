// Service Worker for Clashy PWA
const CACHE_NAME = 'clashy-v5.0.0';
const STATIC_CACHE = 'clashy-static-v5.0.0';
const DYNAMIC_CACHE = 'clashy-dynamic-v5.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/js/app.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/supabase/2.39.3/umd/supabase.min.js'
];

// URLs that require network-first strategy
const NETWORK_FIRST_URLS = [
  'https://wgvkbrmcgejscgsyapcs.supabase.co',
  '/api/'
];

// URLs that require cache-first strategy
const CACHE_FIRST_URLS = [
  'https://cdnjs.cloudflare.com',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('📦 Service Worker: Caching static files');
      return cache.addAll(STATIC_FILES);
    }).then(() => {
      console.log('✅ Service Worker: Static files cached successfully');
      return self.skipWaiting();
    }).catch((error) => {
      console.error('❌ Service Worker: Error caching static files:', error);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker: Activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch event - handle requests with different strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Handle different types of requests
  if (isNetworkFirst(request.url)) {
    event.respondWith(networkFirstStrategy(request));
  } else if (isCacheFirst(request.url)) {
    event.respondWith(cacheFirstStrategy(request));
  } else if (request.destination === 'image') {
    event.respondWith(imageStrategy(request));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Network-first strategy for dynamic content
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('🌐 Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return createOfflinePage();
    }
    
    throw error;
  }
}

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Cache-first strategy failed:', error);
    throw error;
  }
}

// Stale-while-revalidate strategy for general content
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, return cached version if available
    return cachedResponse;
  });
  
  // Return cached version immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

// Special strategy for images
async function imageStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return placeholder image for failed image requests
    return createPlaceholderImage();
  }
}

// Helper functions
function isNetworkFirst(url) {
  return NETWORK_FIRST_URLS.some(pattern => url.includes(pattern));
}

function isCacheFirst(url) {
  return CACHE_FIRST_URLS.some(pattern => url.includes(pattern));
}

// Create offline page
function createOfflinePage() {
  const offlineHTML = `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>كلاشي - غير متصل</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          color: #F1F5F9;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }
        .offline-container {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          padding: 40px;
          max-width: 500px;
          width: 100%;
        }
        .offline-icon {
          font-size: 4rem;
          margin-bottom: 20px;
          animation: pulse 2s infinite;
        }
        .offline-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .offline-message {
          font-size: 1.1rem;
          color: #CBD5E1;
          margin-bottom: 30px;
          line-height: 1.6;
        }
        .retry-btn {
          background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 12px 24px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .retry-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <div class="offline-icon">📶</div>
        <h1 class="offline-title">غير متصل</h1>
        <p class="offline-message">
          عذراً، لا يوجد اتصال بالإنترنت حالياً. 
          <br>يمكنك تصفح المحتوى المحفوظ أو المحاولة مرة أخرى.
        </p>
        <button class="retry-btn" onclick="window.location.reload()">
          🔄 إعادة المحاولة
        </button>
      </div>
    </body>
    </html>
  `;
  
  return new Response(offlineHTML, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

// Create placeholder image
function createPlaceholderImage() {
  // Simple SVG placeholder
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#1E293B"/>
      <text x="200" y="150" text-anchor="middle" fill="#8B5CF6" font-size="24" font-family="Arial">
        🖼️ صورة غير متاحة
      </text>
    </svg>
  `;
  
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' }
  });
}

// Handle background sync
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync-stores') {
    event.waitUntil(syncStores());
  }
});

// Sync stores in background
async function syncStores() {
  try {
    console.log('📦 Syncing stores in background...');
    
    // This would typically sync with Supabase
    const response = await fetch('/api/stores');
    if (response.ok) {
      const stores = await response.json();
      
      // Cache the updated stores data
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put('/api/stores', new Response(JSON.stringify(stores)));
      
      console.log('✅ Background sync completed successfully');
      
      // Notify all clients about the update
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'STORES_UPDATED',
          data: stores
        });
      });
    }
  } catch (error) {
    console.error('❌ Background sync failed:', error);
  }
}

// Handle push notifications (for future use)
self.addEventListener('push', (event) => {
  console.log('🔔 Push notification received:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'تحديث جديد متاح في كلاشي',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'clashy-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: 'فتح التطبيق',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'إغلاق',
        icon: '/icons/icon-96x96.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('كلاشي', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
  console.log('💬 Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  console.log('⏰ Periodic sync triggered:', event.tag);
  
  if (event.tag === 'stores-sync') {
    event.waitUntil(syncStores());
  }
});

// Log service worker lifecycle
console.log('🚀 Clashy Service Worker v5.0.0 loaded');
console.log('📱 PWA features: Offline support, Background sync, Push notifications');
console.log('🔧 Cache strategy: Network-first for API, Cache-first for assets');
console.log('⚡ Performance: Optimized for mobile and desktop');
