<template>
  <header class="app-header">
    <div class="header-inner">
      <!-- Cooler Brand Logo -->
      <NuxtLink to="/" class="brand-link">
        <div class="brand-symbol">
          <!-- Sleek geometric candlestick terminal glyph -->
          <svg viewBox="0 0 24 24" fill="none" class="symbol-svg">
            <line x1="7" y1="3" x2="7" y2="7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <rect x="4.5" y="7" width="5" height="9" rx="1" fill="currentColor" opacity="0.25" stroke="currentColor" stroke-width="1.8" />
            <line x1="7" y1="16" x2="7" y2="21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />

            <line x1="17" y1="5" x2="17" y2="9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <rect x="14.5" y="9" width="5" height="6" rx="1" fill="currentColor" stroke="currentColor" stroke-width="1.8" />
            <line x1="17" y1="15" x2="17" y2="19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-title">{{ t('brandTitle') }}</span>
        </div>
      </NuxtLink>

      <!-- Right Actions: Home icon, Theme toggle, Language switcher, Account status -->
      <div class="header-actions">
        <!-- Home Icon Button -->
        <NuxtLink to="/" class="icon-btn" :title="t('homeTitle')" :aria-label="t('homeTitle')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="action-icon">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </NuxtLink>

        <!-- Theme Toggle Button -->
        <button
          type="button"
          class="icon-btn"
          :title="theme === 'dark' ? t('themeDark') : t('themeLight')"
          :aria-label="theme === 'dark' ? t('themeDark') : t('themeLight')"
          @click="toggleTheme"
        >
          <!-- Sun (shown when dark) -->
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="action-icon">
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
          <!-- Moon (shown when light) -->
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="action-icon">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <!-- Language Switcher Button -->
        <button
          type="button"
          class="lang-btn"
          :title="t('langToggle')"
          @click="toggleLocale"
        >
          <span :class="{ active: locale === 'km' }">ខ្មែរ</span>
          <span class="lang-slash">/</span>
          <span :class="{ active: locale === 'en' }">EN</span>
        </button>

        <div class="divider"></div>

        <!-- Account Pill or Connect Link -->
        <template v-if="account?.isLoggedIn">
          <div class="user-pill" :title="`${t('connectedTo')} ${account.server}`">
            <span class="live-dot"></span>
            <span class="user-text">{{ account.server.split('-')[0] }} #{{ account.accountNumber }}</span>
          </div>
          <button class="text-btn" @click="handleLogout">
            {{ t('disconnect') }}
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="login-link">
            {{ t('connectMt5') }}
          </NuxtLink>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { account, logout } = useMt5Auth()
const { theme, toggleTheme } = useTheme()
const { locale, toggleLocale, t } = useLocale()

const handleLogout = async () => {
  logout()
  await navigateTo('/login')
}
</script>

<style scoped>
.app-header {
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-header);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(8px);
}

.header-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  color: var(--text-primary);
}

.brand-symbol {
  width: 32px;
  height: 32px;
  background: var(--symbol-bg);
  color: var(--accent);
  border: 1px solid var(--border-color);
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.symbol-svg {
  width: 20px;
  height: 20px;
}

.brand-title {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease;
}

.icon-btn:hover {
  color: var(--text-primary);
  border-color: var(--border-hover);
  background: var(--bg-hover);
}

.action-icon {
  width: 17px;
  height: 17px;
}

.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  height: 34px;
  padding: 0 0.55rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.lang-btn:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
}

.lang-btn span.active {
  color: var(--accent);
  font-weight: 700;
}

.lang-slash {
  opacity: 0.4;
  font-size: 0.7rem;
}

.divider {
  width: 1px;
  height: 18px;
  background: var(--border-color);
  margin: 0 0.35rem;
}

.user-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 0.35rem 0.65rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--text-primary);
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}

.text-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  transition: color 0.15s;
}

.text-btn:hover {
  color: #ef4444;
}

.login-link {
  font-size: 0.825rem;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  transition: all 0.15s;
}

.login-link:hover {
  border-color: var(--accent);
}
</style>
