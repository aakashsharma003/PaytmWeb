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
    name: 'My Vite React App',
    short_name: 'ViteReact',
    description: 'My awesome Vite + React application',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'not-found-image.jpg',
        sizes: '192x192',
        type: 'image/jpeg'
      },
      {
        src: 'Paytm-Logo.wine.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})
