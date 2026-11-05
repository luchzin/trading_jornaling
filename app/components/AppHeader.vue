<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-950/85">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
      <!-- Cool Brand Logo & Mark -->
      <div class="flex items-center gap-6">
        <NuxtLink to="/" class="flex items-center gap-2.5 transition opacity-90 hover:opacity-100">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-600/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
            <!-- Sleek geometric candlestick terminal glyph -->
            <svg viewBox="0 0 24 24" fill="none" class="h-4.5 w-4.5">
              <line x1="7" y1="3" x2="7" y2="7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              <rect x="4.5" y="7" width="5" height="9" rx="1" fill="currentColor" opacity="0.25" stroke="currentColor" stroke-width="1.8" />
              <line x1="7" y1="16" x2="7" y2="21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />

              <line x1="17" y1="5" x2="17" y2="9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              <rect x="14.5" y="9" width="5" height="6" rx="1" fill="currentColor" stroke="currentColor" stroke-width="1.8" />
              <line x1="17" y1="15" x2="17" y2="19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </div>
          <span class="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {{ t('brandTitle') }}
          </span>
        </NuxtLink>

        <!-- Navigation Links: Home & Trade Logs -->
        <nav class="hidden sm:flex items-center gap-1">
          <NuxtLink
            to="/"
            class="rounded-md px-2.5 py-1 text-xs font-medium transition"
            :class="route.path === '/'
              ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 font-semibold'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'"
          >
            {{ t('navHome') }}
          </NuxtLink>

          <NuxtLink
            to="/logs"
            class="rounded-md px-2.5 py-1 text-xs font-medium transition"
            :class="route.path === '/logs'
              ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 font-semibold'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'"
          >
            {{ t('navLogs') }}
          </NuxtLink>
        </nav>
      </div>

      <!-- Right Actions: Nav shortcuts, Theme toggle, Language switcher, Account status -->
      <div class="flex items-center gap-1.5 sm:gap-2">
        <!-- Mobile Log Link -->
        <NuxtLink
          to="/logs"
          class="sm:hidden inline-flex h-8 items-center px-2 rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          :class="route.path === '/logs' ? 'border-emerald-500 text-emerald-600' : ''"
        >
          {{ t('navLogs') }}
        </NuxtLink>

        <!-- Theme Toggle Button -->
        <button
          type="button"
          class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          :title="theme === 'dark' ? t('themeDark') : t('themeLight')"
          :aria-label="theme === 'dark' ? t('themeDark') : t('themeLight')"
          @click="toggleTheme"
        >
          <!-- Sun (shown in dark mode) -->
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-amber-400">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <!-- Moon (shown in light mode) -->
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <!-- Language Switcher Button -->
        <button
          type="button"
          class="inline-flex h-8 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700"
          :title="t('langToggle')"
          @click="toggleLocale"
        >
          <span :class="locale === 'km' ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'opacity-70'">ខ្មែរ</span>
          <span class="opacity-40">/</span>
          <span :class="locale === 'en' ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'opacity-70'">EN</span>
        </button>

        <div class="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-0.5"></div>

        <!-- Account Pill or Connect Link -->
        <template v-if="account?.isLoggedIn">
          <div class="hidden sm:inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300" :title="`${t('connectedTo')} ${account.server}`">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span class="font-mono">{{ account.server.split('-')[0] }} #{{ account.accountNumber }}</span>
          </div>
          <button
            type="button"
            class="px-2 py-1 text-xs text-slate-500 transition hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400"
            @click="handleLogout"
          >
            {{ t('disconnect') }}
          </button>
        </template>
        <template v-else>
          <NuxtLink
            to="/login"
            class="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-emerald-600 transition hover:border-emerald-600 dark:border-slate-800 dark:bg-slate-900 dark:text-emerald-400 dark:hover:border-emerald-500"
          >
            {{ t('connectMt5') }}
          </NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const { account, logout } = useMt5Auth()
const { theme, toggleTheme } = useTheme()
const { locale, toggleLocale, t } = useLocale()

const handleLogout = async () => {
  logout()
  await navigateTo('/login')
}
</script>
