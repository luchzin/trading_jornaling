<template>
  <div class="login-page">
    <div class="login-box">
      <!-- Title & Context -->
      <div class="box-header">
        <h1 class="box-title">MT5 Trader Login</h1>
        <p class="box-desc">Connect your MetaTrader 5 account to view and journal your trades.</p>
      </div>

      <!-- Quick Server Fill Chips -->
      <div class="server-chips">
        <span class="chips-title">Quick select:</span>
        <button
          v-for="srv in quickServers"
          :key="srv"
          type="button"
          class="chip"
          :class="{ selected: form.server === srv }"
          @click="form.server = srv"
        >
          {{ srv }}
        </button>
      </div>

      <!-- Messages -->
      <div v-if="errorMessage" class="notice notice-error">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="notice notice-success">
        {{ successMessage }}
      </div>

      <!-- Form -->
      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="field">
          <label for="server">Server Name</label>
          <input
            id="server"
            v-model="form.server"
            type="text"
            placeholder="e.g. ICMarketsSC-Live or FTMO-Demo"
            required
            autocomplete="off"
          />
        </div>

        <div class="field">
          <label for="accountNumber">Account Number / Login ID</label>
          <input
            id="accountNumber"
            v-model="form.accountNumber"
            type="text"
            inputmode="numeric"
            placeholder="e.g. 5092143"
            required
            autocomplete="username"
          />
        </div>

        <div class="field">
          <div class="field-label-row">
            <label for="password">Password</label>
            <button
              type="button"
              class="reveal-btn"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Trader or investor password"
            required
            autocomplete="current-password"
          />
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Connecting...' : 'Connect to MT5' }}
        </button>
      </form>

      <div class="box-footer">
        <NuxtLink to="/" class="back-link">
          &larr; Back to Dashboard
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const quickServers = [
  'MetaQuotes-Demo',
  'FTMO-Demo',
  'ICMarketsSC-Live',
  'Exness-Real'
]

const form = reactive({
  server: '',
  accountNumber: '',
  password: ''
})

const showPassword = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const { login } = useMt5Auth()

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.server.trim()) {
    errorMessage.value = 'Please provide your MT5 Server Name.'
    return
  }
  if (!form.accountNumber.trim()) {
    errorMessage.value = 'Please enter your MT5 Account Number.'
    return
  }
  if (!form.password.trim()) {
    errorMessage.value = 'Please enter your MT5 Password.'
    return
  }

  isSubmitting.value = true

  try {
    await login({
      server: form.server,
      accountNumber: form.accountNumber,
      password: form.password
    })

    successMessage.value = 'Connected! Redirecting to /'

    // Redirect to / page
    setTimeout(async () => {
      await navigateTo('/')
    }, 400)
  } catch (err: any) {
    errorMessage.value = err?.message || 'Connection failed. Please check credentials.'
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 55px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.login-box {
  width: 100%;
  max-width: 420px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.75rem;
}

.box-header {
  margin-bottom: 1.25rem;
}

.box-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.box-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.server-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1.25rem;
  padding: 0.5rem 0.65rem;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.chips-title {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-right: 0.2rem;
}

.chip {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.75rem;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
}

.chip:hover {
  color: var(--text-primary);
  border-color: var(--border-hover);
}

.chip.selected {
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 500;
}

.notice {
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  font-size: 0.825rem;
  margin-bottom: 1rem;
}

.notice-error {
  background: var(--danger-bg);
  border: 1px solid var(--danger-border);
  color: var(--danger);
}

.notice-success {
  background: var(--success-bg);
  border: 1px solid var(--success-border);
  color: var(--accent);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field label {
  font-size: 0.825rem;
  font-weight: 500;
  color: var(--text-primary);
}

.field-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reveal-btn {
  background: none;
  border: none;
  font-size: 0.75rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
}

.reveal-btn:hover {
  color: var(--text-primary);
}

input {
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 6px;
  padding: 0.55rem 0.75rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.15s;
}

input:focus {
  border-color: var(--accent);
}

input::placeholder {
  color: var(--text-muted);
}

.submit-btn {
  margin-top: 0.5rem;
  background: var(--accent);
  color: var(--accent-text);
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 0.6rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

.submit-btn:hover:not(:disabled) {
  background: var(--accent-hover);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.box-footer {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.back-link {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-decoration: none;
}

.back-link:hover {
  color: var(--text-primary);
}
</style>
