// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  telemetry: false,
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [

      tailwindcss(),
    ],
  },
  app: {
    head: {
      title: 'MT5 Trading Journal',
      meta: [
        { name: 'description', content: 'Clean, precision MetaTrader 5 trading journal and performance tracker' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  }
})
