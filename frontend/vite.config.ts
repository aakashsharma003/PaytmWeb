import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: [
    "not-found-image.jpg",
    "paytm_payment_tune.mp3",
    "Paytm-Logo.wine.png",
    "https://www.paytmbank.com/_next/static/media/paytmbank-logo.4ba3db09.svg"
  ],
  manifest: {
    name: 'Paytm Web Application',
    short_name: 'Paytm-Web',
    description: 'A Paytm PWA for demonstration of transactions on paytm',
    theme_color: '#cbd5e1',
    icons: [
      {
        src: 'not-found-image.jpg',
        sizes: '192x192',
        type: 'image/jpeg'
      },
      {
        src: 'Paytm-Logo.wine.png',
        sizes: '512x512',
        type: 'image/png',
        purpose:"maskable"
      }
    ],
    start_url: '/',
    display: 'standalone',
    background_color: '#cbd5e1'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})
