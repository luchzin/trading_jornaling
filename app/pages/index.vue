<template>
  <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 flex flex-col gap-6">
    <!-- Status Bar: Shows MT5 Connection state -->
    <section v-if="account?.isLoggedIn" class="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5 dark:border-slate-800 dark:bg-slate-900">
      <div class="flex items-center gap-3">
        <span class="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
        <div>
          <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {{ t('connectedTo') }} {{ account.server }}
          </div>
          <div class="text-xs text-slate-500 dark:text-slate-400">
            {{ t('accountId') }}: #{{ account.accountNumber }} &bull; {{ t('bridgeActive') }}
          </div>
        </div>
      </div>
      <NuxtLink
        to="/login"
        class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800"
      >
        {{ t('changeAccount') }}
      </NuxtLink>
    </section>

    <section v-else class="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5 dark:border-slate-800 dark:bg-slate-900">
      <div>
        <div class="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {{ t('notConnectedTitle') }}
        </div>
        <div class="text-xs text-slate-500 dark:text-slate-400">
          {{ t('notConnectedDesc') }}
        </div>
      </div>
      <NuxtLink
        to="/login"
        class="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-xs transition hover:bg-emerald-500 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-400"
      >
        {{ t('openLoginBtn') }}
      </NuxtLink>
    </section>

    <!-- SUMMARY SECTION -->
    <div class="flex flex-col gap-4">
      <!-- Summary Metrics with Mini Infographic Sparklines -->
      <section class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <!-- Net P&L Card with Sparkline -->
        <div class="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {{ t('netPnl') }}
            </span>
            <span class="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 px-1.5 py-0.5 rounded">
              +48.2%
            </span>
          </div>
          <div class="mt-1 text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 sm:text-2xl">
            +$4,820.50
          </div>
          <div class="mt-2 flex items-center justify-between gap-2">
            <span class="text-xs text-slate-500 dark:text-slate-400 truncate">
              {{ t('monthPerformance') }}
            </span>
            <!-- Mini SVG Sparkline -->
            <svg class="h-6 w-16 shrink-0 text-emerald-500 overflow-visible" viewBox="0 0 60 20" fill="none">
              <path d="M 0 16 L 10 14 L 20 17 L 30 11 L 40 8 L 50 10 L 60 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="60" cy="2" r="2.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        <!-- Win Rate Card with Donut Mini Bar -->
        <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {{ t('winRate') }}
            </span>
            <span class="text-[10px] font-semibold text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-1.5 py-0.5 rounded">
              50 Trades
            </span>
          </div>
          <div class="mt-1 text-xl font-bold font-mono text-slate-900 dark:text-slate-100 sm:text-2xl">
            68.0%
          </div>
          <div class="mt-2 flex flex-col gap-1">
            <div class="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{{ t('winLossStats') }}</span>
            </div>
            <!-- Visual Win/Loss Ratio Bar -->
            <div class="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div class="bg-emerald-500" style="width: 68%;"></div>
              <div class="bg-rose-500" style="width: 32%;"></div>
            </div>
          </div>
        </div>

        <!-- Profit Factor Card with Visual Gauge -->
        <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {{ t('profitFactor') }}
            </span>
            <span class="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 px-1.5 py-0.5 rounded">
              Target &gt; 2.0
            </span>
          </div>
          <div class="mt-1 text-xl font-bold font-mono text-slate-900 dark:text-slate-100 sm:text-2xl">
            2.41
          </div>
          <div class="mt-2 flex flex-col gap-1">
            <span class="text-xs text-slate-500 dark:text-slate-400 truncate">
              {{ t('grossStats') }}
            </span>
            <!-- Gross Profit vs Loss ratio scale -->
            <div class="flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div class="bg-emerald-500" style="width: 70.6%;"></div>
              <div class="bg-rose-500" style="width: 29.4%;"></div>
            </div>
          </div>
        </div>

        <!-- Trades Recorded Card with Activity Sparks -->
        <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {{ t('tradesRecorded') }}
            </span>
            <span class="text-[10px] font-semibold text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-1.5 py-0.5 rounded">
              Active
            </span>
          </div>
          <div class="mt-1 text-xl font-bold font-mono text-slate-900 dark:text-slate-100 sm:text-2xl">
            50
          </div>
          <div class="mt-2 flex items-center justify-between">
            <span class="text-xs text-slate-500 dark:text-slate-400">
              {{ t('avgRr') }}
            </span>
            <!-- Mini volume bars infographic -->
            <div class="flex items-end gap-0.5 h-4">
              <span class="w-1 bg-emerald-500/70 rounded-xs h-2"></span>
              <span class="w-1 bg-emerald-500 rounded-xs h-3.5"></span>
              <span class="w-1 bg-rose-500/70 rounded-xs h-1.5"></span>
              <span class="w-1 bg-emerald-500 rounded-xs h-4"></span>
              <span class="w-1 bg-emerald-500 rounded-xs h-3"></span>
            </div>
          </div>
        </div>
      </section>

      <!-- Detailed Infographic Section: Equity Growth Curve & Win/Loss Breakdown -->
      <section class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- 1. Equity Growth Curve Infographic (Spans 2 cols on lg) -->
        <div class="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {{ t('equityGrowth') }}
              </h2>
              <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {{ t('baseline') }} &bull; {{ t('currentEquity') }}
              </div>
            </div>
            <div class="flex items-center gap-1.5 text-xs font-mono">
              <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                +$4,820.50 (+48.2%)
              </span>
            </div>
          </div>

          <!-- Clean SVG Equity Chart -->
          <div class="relative w-full h-44 sm:h-52">
            <svg class="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#10b981" stop-opacity="0.25" />
                  <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
                </linearGradient>
              </defs>

              <!-- Grid Lines -->
              <line x1="0" y1="20" x2="500" y2="20" stroke="currentColor" class="text-slate-200 dark:text-slate-800/80" stroke-dasharray="3 3" stroke-width="1" />
              <line x1="0" y1="65" x2="500" y2="65" stroke="currentColor" class="text-slate-200 dark:text-slate-800/80" stroke-dasharray="3 3" stroke-width="1" />
              <line x1="0" y1="110" x2="500" y2="110" stroke="currentColor" class="text-slate-200 dark:text-slate-800/80" stroke-dasharray="3 3" stroke-width="1" />
              <line x1="0" y1="145" x2="500" y2="145" stroke="currentColor" class="text-slate-200 dark:text-slate-800/80" stroke-width="1" />

              <!-- Grid Labels -->
              <text x="5" y="18" class="text-[9px] fill-slate-400 font-mono">$15,000</text>
              <text x="5" y="63" class="text-[9px] fill-slate-400 font-mono">$13,000</text>
              <text x="5" y="108" class="text-[9px] fill-slate-400 font-mono">$11,500</text>
              <text x="5" y="142" class="text-[9px] fill-slate-400 font-mono">$10,000 (Base)</text>

              <!-- Area Fill -->
              <path
                d="M 40 145 
                   C 90 142, 120 130, 160 115 
                   C 200 100, 230 112, 270 88 
                   C 310 68, 350 78, 390 52 
                   C 430 30, 460 28, 490 22 
                   L 490 145 Z"
                fill="url(#equityGrad)"
              />

              <!-- Main Equity Curve Line -->
              <path
                d="M 40 145 
                   C 90 142, 120 130, 160 115 
                   C 200 100, 230 112, 270 88 
                   C 310 68, 350 78, 390 52 
                   C 430 30, 460 28, 490 22"
                fill="none"
                stroke="#10b981"
                stroke-width="2.5"
                stroke-linecap="round"
              />

              <!-- Milestone Points with Pulsing Peak -->
              <circle cx="40" cy="145" r="3.5" fill="#10b981" />
              <circle cx="160" cy="115" r="3" fill="#10b981" />
              <circle cx="270" cy="88" r="3" fill="#10b981" />
              <circle cx="390" cy="52" r="3" fill="#10b981" />
              <circle cx="490" cy="22" r="4.5" fill="#10b981" class="animate-pulse" />
              <circle cx="490" cy="22" r="2" fill="#ffffff" />
            </svg>
          </div>

          <!-- Timeline Axis Labels -->
          <div class="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>T0 (Entry)</span>
            <span>Week 1 (12 trades)</span>
            <span>Week 2 (25 trades)</span>
            <span>Week 3 (38 trades)</span>
            <span class="font-semibold text-emerald-600 dark:text-emerald-400">Today (50 trades)</span>
          </div>
        </div>

        <!-- 2. Win / Loss & Trade Execution Infographic (1 col on lg) -->
        <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
          <div>
            <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {{ t('winLossDistribution') }}
            </h2>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              50 Synchronized Positions
            </div>
          </div>

          <!-- Circular Donut Infographic with Center Stats -->
          <div class="my-4 flex items-center justify-center gap-6">
            <div class="relative flex items-center justify-center">
              <svg class="w-24 h-24 -rotate-90 transform" viewBox="0 0 100 100">
                <!-- Background Ring -->
                <circle cx="50" cy="50" r="38" stroke="currentColor" class="text-slate-100 dark:text-slate-800" stroke-width="9" fill="none" />
                <!-- Win Arc (68% of 238.76 = ~162.3) -->
                <circle
                  cx="50" cy="50" r="38"
                  stroke="#10b981"
                  stroke-width="9"
                  stroke-dasharray="162.3 238.76"
                  stroke-linecap="round"
                  fill="none"
                />
                <!-- Loss Arc (32% with offset) -->
                <circle
                  cx="50" cy="50" r="38"
                  stroke="#ef4444"
                  stroke-width="9"
                  stroke-dasharray="74 238.76"
                  stroke-dashoffset="-164"
                  stroke-linecap="round"
                  fill="none"
                />
              </svg>
              <!-- Center Label -->
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span class="text-base font-bold font-mono text-slate-900 dark:text-slate-100 leading-none">68%</span>
                <span class="text-[10px] text-slate-400 mt-0.5">Win Rate</span>
              </div>
            </div>

            <!-- Legend & Counts -->
            <div class="flex flex-col gap-2 text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span class="text-slate-700 dark:text-slate-300 font-medium">{{ t('winsLabel') }}:</span>
                <span class="font-mono font-semibold text-emerald-600 dark:text-emerald-400">34</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                <span class="text-slate-700 dark:text-slate-300 font-medium">{{ t('lossesLabel') }}:</span>
                <span class="font-mono font-semibold text-rose-600 dark:text-rose-400">16</span>
              </div>
            </div>
          </div>

          <!-- Long vs Short Execution Breakdown Bars -->
          <div class="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <div class="flex justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span>{{ t('longWinRate') }} (30 Trades)</span>
                <span class="font-mono font-semibold text-slate-700 dark:text-slate-300">73.3% Win</span>
              </div>
              <div class="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: 73.3%;"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span>{{ t('shortWinRate') }} (20 Trades)</span>
                <span class="font-mono font-semibold text-slate-700 dark:text-slate-300">60.0% Win</span>
              </div>
              <div class="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div class="bg-emerald-500 h-full rounded-full" style="width: 60.0%;"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- SCALE UP COMPOUND STRATEGY SECTION (Based on Scale Up Updated.xlsx) -->
    <section class="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <!-- Section Header -->
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div class="flex items-center gap-3">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">
                {{ t('scaleUpTitle') }}
              </h2>
              <span class="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-bold font-mono text-slate-700 dark:text-slate-300">
                XAUUSD
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {{ t('scaleUpSub') }}
            </p>
          </div>
        </div>

        <!-- Strategy Summary Badges -->
        <div class="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            {{ t('startingBalance') }}: <strong class="text-slate-900 dark:text-slate-100">$300</strong> &rarr; <strong class="text-emerald-600 dark:text-emerald-400">$10,000</strong>
          </div>
          <div class="rounded-lg border border-emerald-500/30 bg-emerald-50/70 px-2.5 py-1 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
            {{ t('totalWithdrawals') }}: <strong>$15,000.00</strong>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs: Part 1, Part 2, Part 3, Part 4, Overview Roadmap -->
      <div class="mt-4 flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        <button
          v-for="part in scaleUpParts"
          :key="part.id"
          type="button"
          class="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition"
          :class="activePartId === part.id
            ? 'border-emerald-500 bg-emerald-50/80 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950/50 dark:text-emerald-300 shadow-xs'
            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700'"
          @click="activePartId = part.id"
        >
          <span class="font-bold font-mono">{{ part.title }}</span>
          <span class="text-[10px] rounded px-1.5 py-0.2" :class="part.badgeClass">
            {{ part.badgeText }}
          </span>
          <span class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            ${{ part.withdrawReward.toLocaleString() }}
          </span>
        </button>

        <button
          type="button"
          class="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ml-auto"
          :class="activePartId === 'overview'
            ? 'border-emerald-500 bg-emerald-50/80 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950/50 dark:text-emerald-300 shadow-xs'
            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700'"
          @click="activePartId = 'overview'"
        >
          <span>{{ t('stageOverview') }}</span>
        </button>
      </div>

      <!-- ACTIVE PART VIEW -->
      <div v-if="activePartId !== 'overview' && currentPartData" class="mt-4 flex flex-col gap-4">
        <!-- Part Parameters & Milestone Reward Banner -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <div class="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5 dark:border-slate-800 dark:bg-slate-950/50">
            <span class="text-[10px] uppercase tracking-wider text-slate-400">{{ t('accountSize') }}</span>
            <div class="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
              ${{ currentPartData.accountSize.toLocaleString() }}
            </div>
          </div>
          <div class="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5 dark:border-slate-800 dark:bg-slate-950/50">
            <span class="text-[10px] uppercase tracking-wider text-slate-400">{{ t('riskPerTrade') }}</span>
            <div class="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
              ${{ currentPartData.riskPerTradeUsd }} ({{ currentPartData.riskPercent }}%)
            </div>
          </div>
          <div class="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5 dark:border-slate-800 dark:bg-slate-950/50">
            <span class="text-[10px] uppercase tracking-wider text-slate-400">{{ t('riskRewardRatio') }}</span>
            <div class="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
              1 : {{ currentPartData.riskReward }} (SL {{ currentPartData.slPips }}p / TP {{ currentPartData.tpPips }}p)
            </div>
          </div>
          <div class="rounded-lg border border-slate-200 bg-slate-50/70 p-2.5 dark:border-slate-800 dark:bg-slate-950/50">
            <span class="text-[10px] uppercase tracking-wider text-slate-400">{{ t('targetBalance') }}</span>
            <div class="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
              ${{ currentPartData.targetBalance.toLocaleString() }}
            </div>
          </div>
          <div class="col-span-2 sm:col-span-1 rounded-lg border border-emerald-500/30 bg-emerald-50/60 p-2.5 dark:border-emerald-500/30 dark:bg-emerald-950/30">
            <span class="text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold">{{ t('withdrawReward') }}</span>
            <div class="text-sm font-bold font-mono text-emerald-700 dark:text-emerald-300">
              ${{ currentPartData.withdrawReward.toLocaleString() }}.00
            </div>
          </div>
        </div>

        <!-- 5-Step Compounding Matrix Table (Exact Match from Excel Sheet) -->
        <div class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                <th class="px-3 py-2.5 font-semibold uppercase text-slate-500 dark:text-slate-400 w-12">No</th>
                <th class="px-3 py-2.5 font-semibold uppercase text-slate-500 dark:text-slate-400">{{ t('lotSize') }}</th>
                <th class="px-3 py-2.5 font-semibold uppercase text-slate-500 dark:text-slate-400">Risk ($)</th>
                <th class="px-3 py-2.5 font-semibold uppercase text-slate-500 dark:text-slate-400">SL (Pip / $)</th>
                <th class="px-3 py-2.5 font-semibold uppercase text-slate-500 dark:text-slate-400">TP (Pip / $)</th>
                <th class="px-3 py-2.5 font-semibold uppercase text-slate-500 dark:text-slate-400">Result</th>
                <th class="px-3 py-2.5 font-semibold uppercase text-slate-500 dark:text-slate-400">{{ t('goa') }}</th>
                <th class="px-3 py-2.5 font-semibold uppercase text-slate-500 dark:text-slate-400">{{ t('balance') }}</th>
                <th class="px-3 py-2.5 font-semibold uppercase text-emerald-700 dark:text-emerald-400">Trader Reward</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/80">
              <tr
                v-for="row in currentPartData.rows"
                :key="row.no"
                class="transition hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
              >
                <td class="px-3 py-2.5 font-mono font-bold text-slate-900 dark:text-slate-100">
                  #{{ row.no }}
                </td>
                <td class="px-3 py-2.5 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {{ row.lotSize }} Lots
                </td>
                <td class="px-3 py-2.5 font-mono text-slate-700 dark:text-slate-300">
                  ${{ row.riskUsd }}
                </td>
                <td class="px-3 py-2.5 font-mono text-rose-600 dark:text-rose-400">
                  {{ row.slPips }}p (-${{ Math.abs(row.slUsd) }})
                </td>
                <td class="px-3 py-2.5 font-mono text-emerald-600 dark:text-emerald-400">
                  {{ row.tpPips }}p (+${{ row.tpUsd }})
                </td>
                <td class="px-3 py-2.5">
                  <span class="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                    {{ row.result }}
                  </span>
                </td>
                <td class="px-3 py-2.5 font-mono font-semibold text-slate-800 dark:text-slate-200">
                  +{{ (row.goa * 100).toFixed(0) }}%
                </td>
                <td class="px-3 py-2.5 font-mono font-bold text-slate-900 dark:text-slate-100">
                  ${{ row.balance.toLocaleString() }}
                </td>
                <td class="px-3 py-2.5 font-mono">
                  <span v-if="row.no === 5" class="inline-flex items-center rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300">
                    Withdraw ${{ currentPartData.withdrawReward.toLocaleString() }}
                  </span>
                  <span v-else class="text-[11px] text-slate-400 dark:text-slate-500">
                    Compound to #{{ row.no + 1 }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- OVERVIEW WITHDRAWAL ROADMAP VIEW -->
      <div v-else class="mt-4 flex flex-col gap-4">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div
            v-for="part in scaleUpParts"
            :key="part.id"
            class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {{ part.title }}
                </span>
                <span class="text-[10px] rounded px-1.5 py-0.5" :class="part.badgeClass">
                  {{ part.badgeText }}
                </span>
              </div>
              <div class="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
                Target: ${{ part.targetBalance.toLocaleString() }}
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Base: ${{ part.accountSize.toLocaleString() }} &bull; Risk: {{ part.riskPercent }}%
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span class="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 block">
                Withdrawal Reward
              </span>
              <span class="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                ${{ part.withdrawReward.toLocaleString() }}.00
              </span>
            </div>
          </div>
        </div>

        <!-- Overall Balance Sheet Summary Box (From Balance Sheet) -->
        <div class="rounded-xl border border-emerald-500/30 bg-emerald-50/50 p-4 dark:bg-emerald-950/20 dark:border-emerald-500/20">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Full 4-Stage Compound Execution Goal
              </h3>
              <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Starting capital of $300 compounds to an ending balance of $10,000 while yielding $15,000 in total trader withdrawal rewards.
              </p>
            </div>
            <div class="flex items-center gap-4 text-xs font-mono">
              <div class="text-right">
                <span class="text-slate-500 block text-[10px]">TOTAL PROFIT TARGET</span>
                <span class="text-sm font-bold text-slate-900 dark:text-slate-100">+$14,700.00</span>
              </div>
              <div class="text-right">
                <span class="text-emerald-700 dark:text-emerald-400 block text-[10px] font-bold">TOTAL CASH REWARDS</span>
                <span class="text-base font-bold text-emerald-600 dark:text-emerald-400">+$15,000.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Trades Journal Table -->
    <section class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
      <div class="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
        <div>
          <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {{ t('journalHeading') }}
          </h2>
          <span class="text-xs text-slate-500 dark:text-slate-400">
            {{ t('recentSync') }}
          </span>
        </div>
        <!-- Link to the dedicated all-trading-logs page -->
        <NuxtLink
          to="/logs"
          class="text-xs font-medium text-emerald-600 transition hover:text-emerald-500 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          {{ t('viewAllLogs') }}
        </NuxtLink>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/60">
              <th class="px-4 py-3 font-semibold uppercase tracking-wider text-slate-500 sm:px-5 dark:text-slate-400">{{ t('colSymbol') }}</th>
              <th class="px-4 py-3 font-semibold uppercase tracking-wider text-slate-500 sm:px-5 dark:text-slate-400">{{ t('colType') }}</th>
              <th class="px-4 py-3 font-semibold uppercase tracking-wider text-slate-500 sm:px-5 dark:text-slate-400">{{ t('colVolume') }}</th>
              <th class="px-4 py-3 font-semibold uppercase tracking-wider text-slate-500 sm:px-5 dark:text-slate-400">{{ t('colOpen') }}</th>
              <th class="px-4 py-3 font-semibold uppercase tracking-wider text-slate-500 sm:px-5 dark:text-slate-400">{{ t('colClose') }}</th>
              <th class="px-4 py-3 font-semibold uppercase tracking-wider text-slate-500 sm:px-5 dark:text-slate-400">{{ t('colProfit') }}</th>
              <th class="px-4 py-3 font-semibold uppercase tracking-wider text-slate-500 sm:px-5 dark:text-slate-400">{{ t('colStatus') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800/70">
            <tr v-for="trade in sampleTrades" :key="trade.id" class="transition hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td class="px-4 py-3.5 font-mono font-semibold text-slate-900 sm:px-5 dark:text-slate-100">{{ trade.symbol }}</td>
              <td class="px-4 py-3.5 sm:px-5">
                <span :class="trade.type === 'BUY'
                  ? 'rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                  : 'rounded bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'">
                  {{ trade.type }}
                </span>
              </td>
              <td class="px-4 py-3.5 font-mono sm:px-5">{{ trade.volume }}</td>
              <td class="px-4 py-3.5 font-mono sm:px-5">{{ trade.openPrice }}</td>
              <td class="px-4 py-3.5 font-mono sm:px-5">{{ trade.closePrice }}</td>
              <td class="px-4 py-3.5 font-mono font-medium sm:px-5" :class="trade.profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                {{ trade.profit >= 0 ? '+' : '' }}${{ trade.profit.toFixed(2) }}
              </td>
              <td class="px-4 py-3.5 sm:px-5">
                <span class="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {{ t('statusClosed') }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const { account } = useMt5Auth()
const { t } = useLocale()

// Active Part Selector: 'part1' | 'part2' | 'part3' | 'part4' | 'overview'
const activePartId = ref<string>('part1')

// Exact Data from Scale Up Updated.xlsx
const scaleUpParts = [
  {
    id: 'part1',
    title: 'Challenge Part 1',
    badgeText: 'Stage 1',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 font-bold',
    accountSize: 1000,
    riskPerTradeUsd: 50,
    riskPercent: 5,
    riskReward: 2.0,
    slPips: 50,
    tpPips: 100,
    targetBalance: 2000,
    withdrawReward: 1000,
    rows: [
      { no: 1, lotSize: '0.10', riskUsd: 50, slPips: 50, slUsd: -50, tpPips: 100, tpUsd: 100, result: 'Win', goa: 0.10, balance: 1100 },
      { no: 2, lotSize: '0.10', riskUsd: 100, slPips: 50, slUsd: -50, tpPips: 100, tpUsd: 100, result: 'Win', goa: 0.20, balance: 1200 },
      { no: 3, lotSize: '0.20', riskUsd: 100, slPips: 50, slUsd: -100, tpPips: 100, tpUsd: 200, result: 'Win', goa: 0.40, balance: 1400 },
      { no: 4, lotSize: '0.20', riskUsd: 200, slPips: 50, slUsd: -100, tpPips: 100, tpUsd: 200, result: 'Win', goa: 0.60, balance: 1600 },
      { no: 5, lotSize: '0.40', riskUsd: 200, slPips: 50, slUsd: -200, tpPips: 100, tpUsd: 400, result: 'Win', goa: 1.00, balance: 2000 }
    ]
  },
  {
    id: 'part2',
    title: 'Part 2',
    badgeText: 'Stage 2',
    badgeClass: 'bg-emerald-500 text-white dark:text-slate-950 font-bold',
    accountSize: 1000,
    riskPerTradeUsd: 100,
    riskPercent: 10,
    riskReward: 2.0,
    slPips: 50,
    tpPips: 100,
    targetBalance: 3000,
    withdrawReward: 2000,
    rows: [
      { no: 1, lotSize: '0.20', riskUsd: 100, slPips: 50, slUsd: -100, tpPips: 100, tpUsd: 200, result: 'Win', goa: 0.20, balance: 1200 },
      { no: 2, lotSize: '0.20', riskUsd: 200, slPips: 50, slUsd: -100, tpPips: 100, tpUsd: 200, result: 'Win', goa: 0.40, balance: 1400 },
      { no: 3, lotSize: '0.40', riskUsd: 200, slPips: 50, slUsd: -200, tpPips: 100, tpUsd: 400, result: 'Win', goa: 0.80, balance: 1800 },
      { no: 4, lotSize: '0.40', riskUsd: 400, slPips: 50, slUsd: -200, tpPips: 100, tpUsd: 400, result: 'Win', goa: 1.20, balance: 2200 },
      { no: 5, lotSize: '0.80', riskUsd: 400, slPips: 50, slUsd: -400, tpPips: 100, tpUsd: 800, result: 'Win', goa: 2.00, balance: 3000 }
    ]
  },
  {
    id: 'part3',
    title: 'Part 3',
    badgeText: 'Stage 3',
    badgeClass: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-bold',
    accountSize: 1000,
    riskPerTradeUsd: 200,
    riskPercent: 20,
    riskReward: 2.0,
    slPips: 50,
    tpPips: 100,
    targetBalance: 5000,
    withdrawReward: 3000,
    rows: [
      { no: 1, lotSize: '0.40', riskUsd: 200, slPips: 50, slUsd: -200, tpPips: 100, tpUsd: 400, result: 'Win', goa: 0.40, balance: 1400 },
      { no: 2, lotSize: '0.40', riskUsd: 400, slPips: 50, slUsd: -200, tpPips: 100, tpUsd: 400, result: 'Win', goa: 0.80, balance: 1800 },
      { no: 3, lotSize: '0.80', riskUsd: 400, slPips: 50, slUsd: -400, tpPips: 100, tpUsd: 800, result: 'Win', goa: 1.60, balance: 2600 },
      { no: 4, lotSize: '0.80', riskUsd: 800, slPips: 50, slUsd: -400, tpPips: 100, tpUsd: 800, result: 'Win', goa: 2.40, balance: 3400 },
      { no: 5, lotSize: '1.60', riskUsd: 800, slPips: 50, slUsd: -800, tpPips: 100, tpUsd: 1600, result: 'Win', goa: 4.00, balance: 5000 }
    ]
  },
  {
    id: 'part4',
    title: 'Part 4',
    badgeText: 'Stage 4',
    badgeClass: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-bold',
    accountSize: 2000,
    riskPerTradeUsd: 400,
    riskPercent: 20,
    riskReward: 2.0,
    slPips: 40,
    tpPips: 80,
    targetBalance: 10000,
    withdrawReward: 9000,
    rows: [
      { no: 1, lotSize: '1.00', riskUsd: 400, slPips: 40, slUsd: -400, tpPips: 80, tpUsd: 800, result: 'Win', goa: 0.40, balance: 2800 },
      { no: 2, lotSize: '1.00', riskUsd: 800, slPips: 40, slUsd: -400, tpPips: 80, tpUsd: 800, result: 'Win', goa: 0.80, balance: 3600 },
      { no: 3, lotSize: '2.00', riskUsd: 800, slPips: 40, slUsd: -800, tpPips: 80, tpUsd: 1600, result: 'Win', goa: 1.60, balance: 5200 },
      { no: 4, lotSize: '2.00', riskUsd: 1600, slPips: 40, slUsd: -800, tpPips: 80, tpUsd: 1600, result: 'Win', goa: 2.40, balance: 6800 },
      { no: 5, lotSize: '4.00', riskUsd: 1600, slPips: 40, slUsd: -1600, tpPips: 80, tpUsd: 3200, result: 'Win', goa: 4.00, balance: 10000 }
    ]
  }
]

const currentPartData = computed(() => {
  return scaleUpParts.find(p => p.id === activePartId.value) || scaleUpParts[0]
})

const sampleTrades = [
  { id: '101', symbol: 'EURUSD', type: 'BUY', volume: '1.00', openPrice: '1.08450', closePrice: '1.08920', profit: 470.00 },
  { id: '102', symbol: 'XAUUSD', type: 'BUY', volume: '0.50', openPrice: '2730.10', closePrice: '2748.50', profit: 920.00 },
  { id: '103', symbol: 'NAS100', type: 'SELL', volume: '0.20', openPrice: '20450.0', closePrice: '20310.0', profit: 280.00 },
  { id: '104', symbol: 'GBPUSD', type: 'SELL', volume: '1.00', openPrice: '1.29800', closePrice: '1.30050', profit: -250.00 },
  { id: '105', symbol: 'BTCUSD', type: 'BUY', volume: '0.10', openPrice: '68200.0', closePrice: '69450.0', profit: 1250.00 }
]
</script>
