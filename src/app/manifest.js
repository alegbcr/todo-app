export default function manifest() {
  return {
    name: 'My Notes',
    short_name: 'My Notes',
    description: 'Great app to remember notes',
    start_url: '/',
    lang: 'es-US',
    theme_color: '#eeeeee',
    background_color: '#eeeeee',
    display: 'standalone',
    icons: [
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
