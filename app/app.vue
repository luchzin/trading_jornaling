<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-150 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme()
const { initLocale } = useLocale()

onMounted(() => {
  initTheme()
  initLocale()
})
</script>
