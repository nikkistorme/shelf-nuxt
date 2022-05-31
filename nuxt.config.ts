import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: [
    '@pinia/nuxt',
    '@nuxtjs/supabase'
  ],
  css: [
    '~/assets/css/_variables.css',
    '~/assets/css/layout.css',
    '~/assets/css/spacing.css',
    '~/assets/css/typography.css',
    '~/assets/css/ui.css',
    '~/assets/css/utilities.css',
    '~/assets/css/main.css',
  ],
  head: {
    link: [
      { rel: 'icon', href: '/favicon.svg' }
    ]
  },
})
