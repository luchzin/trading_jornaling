<template>
  <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 flex flex-col gap-5">
    <!-- Page Header (Clean, minimal, no AI slop) -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
      <div>
        <h1 class="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {{ t('allLogsTitle') }}
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {{ t('allLogsSub') }}
        </p>
      </div>

      <!-- Quick Stats Strip -->
      <div class="flex flex-wrap items-center gap-2 text-xs font-mono">
        <div class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900">
          <span class="text-slate-400 mr-1.5">{{ t('totalTradesFound') }}:</span>
          <strong class="text-slate-900 dark:text-slate-100">{{ filteredTrades.length }}</strong>
        </div>
        <div class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900">
          <span class="text-slate-400 mr-1.5">Net P&L:</span>
          <strong :class="totalPnl >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
            {{ totalPnl >= 0 ? '+' : '' }}${{ totalPnl.toFixed(2) }}
          </strong>
        </div>
      </div>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <!-- Filter Chips -->
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="f in filterOptions"
          :key="f.value"
          type="button"
          class="rounded-md px-2.5 py-1 text-xs font-medium transition"
          :class="activeFilter === f.value
            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
            : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700'"
          @click="activeFilter = f.value"
        >
          {{ f.label }}
        </button>
      </div>

      <!-- Search Input -->
      <div class="relative w-full sm:w-64">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('searchPlaceholder')"
          class="w-full rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="absolute right-2.5 top-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          @click="searchQuery = ''"
        >
          &times;
        </button>
      </div>
    </div>

    <!-- Clean High-Density Trading Log Table (No AI slop icons) -->
    <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/60">
              <th class="px-3.5 py-3 font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ t('colTicket') }}</th>
              <th class="px-3.5 py-3 font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ t('colOpenTime') }}</th>
              <th class="px-3.5 py-3 font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ t('colSymbol') }}</th>
              <th class="px-3.5 py-3 font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ t('colType') }}</th>
              <th class="px-3.5 py-3 font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ t('colVolume') }}</th>
              <th class="px-3.5 py-3 font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ t('colOpen') }}</th>
              <th class="px-3.5 py-3 font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ t('colClose') }}</th>
              <th class="px-3.5 py-3 font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ t('colProfit') }}</th>
              <th class="px-3.5 py-3 font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ t('colStatus') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800/70">
            <tr
              v-for="trade in filteredTrades"
              :key="trade.id"
              class="transition hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
            >
              <td class="px-3.5 py-3 font-mono text-slate-500 dark:text-slate-400">
                #{{ trade.ticket }}
              </td>
              <td class="px-3.5 py-3 font-mono text-slate-600 dark:text-slate-300">
                {{ trade.openTime }}
              </td>
              <td class="px-3.5 py-3 font-mono font-semibold text-slate-900 dark:text-slate-100">
                {{ trade.symbol }}
              </td>
              <td class="px-3.5 py-3">
                <span
                  class="rounded px-2 py-0.5 text-[11px] font-bold"
                  :class="trade.type === 'BUY'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'"
                >
                  {{ trade.type }}
                </span>
              </td>
              <td class="px-3.5 py-3 font-mono text-slate-800 dark:text-slate-200">
                {{ trade.volume }} Lots
              </td>
              <td class="px-3.5 py-3 font-mono text-slate-700 dark:text-slate-300">
                {{ trade.openPrice }}
              </td>
              <td class="px-3.5 py-3 font-mono text-slate-700 dark:text-slate-300">
                {{ trade.closePrice }}
              </td>
              <td
                class="px-3.5 py-3 font-mono font-bold"
                :class="trade.profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'"
              >
                {{ trade.profit >= 0 ? '+' : '' }}${{ trade.profit.toFixed(2) }}
              </td>
              <td class="px-3.5 py-3">
                <span class="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {{ t('statusClosed') }}
                </span>
              </td>
            </tr>

            <tr v-if="filteredTrades.length === 0">
              <td colspan="9" class="px-4 py-8 text-center text-xs text-slate-400 dark:text-slate-500">
                No trading logs match the selected filter.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { t } = useLocale()

const activeFilter = ref<'all' | 'wins' | 'losses' | 'buy' | 'sell'>('all')
const searchQuery = ref('')

const filterOptions = computed(() => [
  { value: 'all' as const, label: t('filterAll') },
  { value: 'wins' as const, label: t('filterWins') },
  { value: 'losses' as const, label: t('filterLosses') },
  { value: 'buy' as const, label: t('filterBuy') },
  { value: 'sell' as const, label: t('filterSell') }
])

// Complete Synchronized MT5 Trade Logs
const allTrades = [
  { id: '1', ticket: '8492011', openTime: '2026-11-04 14:10', symbol: 'XAUUSD', type: 'BUY', volume: '0.50', openPrice: '2730.10', closePrice: '2748.50', profit: 920.00 },
  { id: '2', ticket: '8492012', openTime: '2026-11-04 11:32', symbol: 'EURUSD', type: 'BUY', volume: '1.00', openPrice: '1.08450', closePrice: '1.08920', profit: 470.00 },
  { id: '3', ticket: '8492013', openTime: '2026-11-03 16:45', symbol: 'NAS100', type: 'SELL', volume: '0.20', openPrice: '20450.0', closePrice: '20310.0', profit: 280.00 },
  { id: '4', ticket: '8492014', openTime: '2026-11-03 09:15', symbol: 'GBPUSD', type: 'SELL', volume: '1.00', openPrice: '1.29800', closePrice: '1.30050', profit: -250.00 },
  { id: '5', ticket: '8492015', openTime: '2026-11-02 20:04', symbol: 'BTCUSD', type: 'BUY', volume: '0.10', openPrice: '68200.0', closePrice: '69450.0', profit: 1250.00 },
  { id: '6', ticket: '8492016', openTime: '2026-11-02 13:22', symbol: 'XAUUSD', type: 'BUY', volume: '0.40', openPrice: '2715.40', closePrice: '2732.10', profit: 668.00 },
  { id: '7', ticket: '8492017', openTime: '2026-11-01 17:50', symbol: 'USDJPY', type: 'SELL', volume: '1.00', openPrice: '152.800', closePrice: '152.220', profit: 380.00 },
  { id: '8', ticket: '8492018', openTime: '2026-11-01 10:11', symbol: 'XAUUSD', type: 'SELL', volume: '0.30', openPrice: '2740.00', closePrice: '2745.20', profit: -156.00 },
  { id: '9', ticket: '8492019', openTime: '2026-10-31 15:40', symbol: 'EURUSD', type: 'BUY', volume: '1.20', openPrice: '1.08200', closePrice: '1.08640', profit: 528.00 },
  { id: '10', ticket: '8492020', openTime: '2026-10-30 19:15', symbol: 'US30', type: 'BUY', volume: '0.15', openPrice: '42100.0', closePrice: '42380.0', profit: 420.00 },
  { id: '11', ticket: '8492021', openTime: '2026-10-30 08:30', symbol: 'GBPUSD', type: 'BUY', volume: '0.80', openPrice: '1.29400', closePrice: '1.29810', profit: 328.00 },
  { id: '12', ticket: '8492022', openTime: '2026-10-29 14:05', symbol: 'XAUUSD', type: 'BUY', volume: '0.50', openPrice: '2710.00', closePrice: '2704.00', profit: -300.00 },
  { id: '13', ticket: '8492023', openTime: '2026-10-28 11:20', symbol: 'NAS100', type: 'BUY', volume: '0.25', openPrice: '20150.0', closePrice: '20320.0', profit: 425.00 },
  { id: '14', ticket: '8492024', openTime: '2026-10-27 16:45', symbol: 'EURUSD', type: 'SELL', volume: '1.00', openPrice: '1.08900', closePrice: '1.08550', profit: 350.00 },
  { id: '15', ticket: '8492025', openTime: '2026-10-26 13:10', symbol: 'XAUUSD', type: 'BUY', volume: '0.40', openPrice: '2698.50', closePrice: '2712.50', profit: 560.00 }
]

const filteredTrades = computed(() => {
  return allTrades.filter(t => {
    // Tab filter
    if (activeFilter.value === 'wins' && t.profit < 0) return false
    if (activeFilter.value === 'losses' && t.profit >= 0) return false
    if (activeFilter.value === 'buy' && t.type !== 'BUY') return false
    if (activeFilter.value === 'sell' && t.type !== 'SELL') return false

    // Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      const matchSymbol = t.symbol.toLowerCase().includes(q)
      const matchTicket = t.ticket.toLowerCase().includes(q)
      if (!matchSymbol && !matchTicket) return false
    }

    return true
  })
})

const totalPnl = computed(() => {
  return filteredTrades.value.reduce((acc, t) => acc + t.profit, 0)
})
</script>

