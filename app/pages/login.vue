<template>
  <div class="flex min-h-[calc(100vh-53px)] items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <!-- Title & Context -->
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {{ t('loginTitle') }}
        </h1>
        <p class="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
          {{ t('loginSubtitle') }}
        </p>
      </div>

      <!-- Quick Server Fill Chips -->
      <div class="mt-4 flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-200/80 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-950">
        <span class="text-xs text-slate-400 dark:text-slate-500 mr-0.5">{{ t('quickSelect') }}</span>
        <button
          v-for="srv in quickServers"
          :key="srv"
          type="button"
          class="rounded border px-2 py-0.5 text-xs transition"
          :class="form.server === srv
            ? 'border-emerald-600 bg-emerald-50 font-medium text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400'
            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700'"
          @click="form.server = srv"
        >
          {{ srv }}
        </button>
      </div>

      <!-- Messages -->
      <div v-if="errorMessage" class="mt-3.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="mt-3.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">
        {{ successMessage }}
      </div>

      <!-- Form -->
      <form class="mt-4 flex flex-col gap-3.5" @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-1.5">
          <label for="server" class="text-xs font-medium text-slate-700 dark:text-slate-300">
            {{ t('serverLabel') }}
          </label>
          <input
            id="server"
            v-model="form.server"
            type="text"
            :placeholder="t('serverPlaceholder')"
            required
            autocomplete="off"
            class="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600 dark:focus:border-emerald-500 dark:focus:bg-slate-950"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="accountNumber" class="text-xs font-medium text-slate-700 dark:text-slate-300">
            {{ t('accountLabel') }}
          </label>
          <input
            id="accountNumber"
            v-model="form.accountNumber"
            type="text"
            inputmode="numeric"
            :placeholder="t('accountPlaceholder')"
            required
            autocomplete="username"
            class="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600 dark:focus:border-emerald-500 dark:focus:bg-slate-950"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <div class="flex items-center justify-between">
            <label for="password" class="text-xs font-medium text-slate-700 dark:text-slate-300">
              {{ t('passwordLabel') }}
            </label>
            <button
              type="button"
              class="text-xs text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? t('hide') : t('show') }}
            </button>
          </div>
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="t('passwordPlaceholder')"
            required
            autocomplete="current-password"
            class="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-600 dark:focus:border-emerald-500 dark:focus:bg-slate-950"
          />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="mt-2 w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white shadow-xs transition hover:bg-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
        >
          {{ isSubmitting ? t('connectingBtn') : t('connectBtn') }}
        </button>
      </form>

      <div class="mt-5 border-t border-slate-200 pt-4 text-center dark:border-slate-800">
        <NuxtLink to="/" class="text-xs text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
          {{ t('backToDashboard') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const { t } = useLocale()
const { login } = useMt5Auth()

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

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.server.trim()) {
    errorMessage.value = t('errorServer')
    return
  }
  if (!form.accountNumber.trim()) {
    errorMessage.value = t('errorAccount')
    return
  }
  if (!form.password.trim()) {
    errorMessage.value = t('errorPassword')
    return
  }

  isSubmitting.value = true

  try {
    await login({
      server: form.server,
      accountNumber: form.accountNumber,
      password: form.password
    })

    successMessage.value = t('successRedirect')

    // Redirect to / page
    setTimeout(async () => {
      await navigateTo('/')
    }, 400)
  } catch (err: any) {
    errorMessage.value = err?.message || t('connectionFailed')
    isSubmitting.value = false
  }
}
</script>
