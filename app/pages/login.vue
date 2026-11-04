<template>
  <div class="login-wrapper">
    <div class="login-card">
      <!-- Header -->
      <div class="header">
        <div class="icon-badge">
          <svg viewBox="0 0 24 24" class="badge-svg" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h1 class="title">MetaTrader 5 Connect</h1>
        <p class="subtitle">Enter your MT5 broker credentials to access your trading journal</p>
      </div>

      <!-- Quick Server Suggestions -->
      <div class="quick-servers">
        <span class="quick-label">Popular Servers:</span>
        <div class="chips">
          <button
            v-for="srv in popularServers"
            :key="srv"
            type="button"
            class="chip-btn"
            :class="{ active: form.server === srv }"
            @click="form.server = srv"
          >
            {{ srv }}
          </button>
        </div>
      </div>

      <!-- Form -->
      <form class="auth-form" @submit.prevent="handleSubmit">
        <!-- Error Alert -->
        <div v-if="errorMessage" class="alert-box alert-error">
          <svg viewBox="0 0 20 20" fill="currentColor" class="alert-icon">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Success Alert -->
        <div v-if="successMessage" class="alert-box alert-success">
          <svg viewBox="0 0 20 20" fill="currentColor" class="alert-icon">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span>{{ successMessage }}</span>
        </div>

        <!-- Server Field -->
        <div class="form-group">
          <label for="server">MT5 Server Name</label>
          <div class="input-container">
            <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
            <input
              id="server"
              v-model="form.server"
              type="text"
              placeholder="e.g. MetaQuotes-Demo or ICMarketsSC-Live"
              required
              autocomplete="off"
            />
          </div>
        </div>

        <!-- Account Number Field -->
        <div class="form-group">
          <label for="accountNumber">MT5 Account Number / Login ID</label>
          <div class="input-container">
            <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              id="accountNumber"
              v-model="form.accountNumber"
              type="text"
              inputmode="numeric"
              placeholder="e.g. 50198234"
              required
              autocomplete="username"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <div class="label-row">
            <label for="password">MT5 Trader Password</label>
            <span class="hint-text">Master or Investor password</span>
          </div>
          <div class="input-container">
            <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your MT5 password"
              required
              autocomplete="current-password"
            />
            <button
              type="button"
              class="toggle-pwd-btn"
              tabindex="-1"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pwd-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pwd-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Keep Session Option -->
        <div class="form-extras">
          <label class="checkbox-container">
            <input v-model="rememberMe" type="checkbox" />
            <span class="checkbox-label">Keep connected for 7 days</span>
          </label>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="submit-btn"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="spinner"></span>
          <span>{{ isSubmitting ? 'Authenticating with MT5...' : 'Connect & Go to Journal' }}</span>
          <svg v-if="!isSubmitting" viewBox="0 0 20 20" fill="currentColor" class="arrow-icon">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </form>

      <!-- Footer Info -->
      <div class="footer-note">
        <div class="security-badge">
          <svg viewBox="0 0 24 24" class="sec-icon" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Direct MT5 Terminal Bridge &bull; Read-only Journal Sync Available</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const popularServers = [
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
const rememberMe = ref(true)
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

    successMessage.value = 'Authenticated successfully! Redirecting to journal...'

    // Redirect to / page
    setTimeout(async () => {
      await navigateTo('/')
    }, 600)
  } catch (err: any) {
    errorMessage.value = err?.message || 'Failed to authenticate MT5 account. Please verify credentials.'
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 10%, #172437 0%, #0c1017 60%, #07090e 100%);
  padding: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #e2e8f0;
}

.login-card {
  width: 100%;
  max-width: 480px;
  background: rgba(18, 26, 38, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(0, 210, 106, 0.05);
  padding: 2.25rem 2rem;
}

.header {
  text-align: center;
  margin-bottom: 1.75rem;
}

.icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  background: linear-gradient(135deg, rgba(0, 210, 106, 0.15), rgba(0, 180, 216, 0.15));
  border: 1px solid rgba(0, 210, 106, 0.35);
  border-radius: 14px;
  margin-bottom: 1rem;
}

.badge-svg {
  width: 28px;
  height: 28px;
  color: #00d26a;
}

.title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #ffffff;
  margin: 0 0 0.4rem 0;
}

.subtitle {
  font-size: 0.875rem;
  color: #94a3b8;
  margin: 0;
  line-height: 1.4;
}

.quick-servers {
  margin-bottom: 1.5rem;
  background: rgba(12, 17, 24, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0.75rem;
  border-radius: 10px;
}

.quick-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.chip-btn {
  background: rgba(255, 255, 255, 0.04);
  color: #cbd5e1;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 0.3rem 0.65rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip-btn:hover {
  background: rgba(0, 210, 106, 0.1);
  border-color: rgba(0, 210, 106, 0.3);
  color: #00d26a;
}

.chip-btn.active {
  background: rgba(0, 210, 106, 0.2);
  border-color: #00d26a;
  color: #ffffff;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.alert-box {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
}

.alert-error {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: #fca5a5;
}

.alert-success {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #6ee7b7;
}

.alert-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #cbd5e1;
}

.hint-text {
  font-size: 0.75rem;
  color: #64748b;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.field-icon {
  position: absolute;
  left: 0.9rem;
  width: 18px;
  height: 18px;
  color: #64748b;
  pointer-events: none;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  background: rgba(10, 14, 21, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 9px;
  padding: 0.75rem 1rem 0.75rem 2.6rem;
  font-size: 0.925rem;
  color: #f8fafc;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #00d26a;
  background: rgba(10, 14, 21, 0.95);
  box-shadow: 0 0 0 3px rgba(0, 210, 106, 0.15);
}

input::placeholder {
  color: #475569;
}

.toggle-pwd-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  padding: 0.25rem;
  display: flex;
  align-items: center;
}

.toggle-pwd-btn:hover {
  color: #94a3b8;
}

.pwd-icon {
  width: 18px;
  height: 18px;
}

.form-extras {
  display: flex;
  align-items: center;
}

.checkbox-container {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.825rem;
  color: #94a3b8;
}

.checkbox-container input {
  accent-color: #00d26a;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.submit-btn {
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #00d26a 0%, #00b475 100%);
  color: #071910;
  border: none;
  border-radius: 9px;
  padding: 0.85rem 1.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 14px rgba(0, 210, 106, 0.25);
  transition: all 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #05e073 0%, #00c480 100%);
  box-shadow: 0 6px 20px rgba(0, 210, 106, 0.35);
  transform: translateY(-1px);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.arrow-icon {
  width: 18px;
  height: 18px;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(7, 25, 16, 0.3);
  border-top-color: #071910;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.footer-note {
  margin-top: 1.75rem;
  text-align: center;
}

.security-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: #64748b;
}

.sec-icon {
  width: 15px;
  height: 15px;
  color: #00d26a;
}
</style>

