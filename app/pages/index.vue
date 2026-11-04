<template>
  <div class="dashboard-wrapper">
    <!-- Navigation Bar -->
    <header class="navbar">
      <div class="brand">
        <div class="logo-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="brand-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <span class="brand-name">TradingJournal</span>
        <span class="badge-tag">MT5 Connected</span>
      </div>

      <div class="nav-actions">
        <!-- Connected Account Status or Login Prompt -->
        <template v-if="account?.isLoggedIn">
          <div class="account-pill">
            <span class="status-dot"></span>
            <span class="account-info">
              <strong>{{ account.server }}</strong> &bull; #{{ account.accountNumber }}
            </span>
          </div>
          <button class="logout-btn" @click="handleLogout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Disconnect</span>
          </button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="connect-btn">
            Connect MT5 Account
          </NuxtLink>
        </template>
      </div>
    </header>

    <main class="main-content">
      <!-- Account Header Banner -->
      <section v-if="account?.isLoggedIn" class="connected-banner">
        <div class="banner-content">
          <div class="banner-title-area">
            <span class="live-chip">
              <span class="pulse-circle"></span> Live MT5 Feed Active
            </span>
            <h1 class="welcome-title">Welcome back, Trader</h1>
            <p class="welcome-sub">
              Synchronized with <strong>{{ account.server }}</strong> (Account #{{ account.accountNumber }}).
            </p>
          </div>
          <NuxtLink to="/login" class="switch-account-link">
            Switch MT5 Account &rarr;
          </NuxtLink>
        </div>
      </section>

      <!-- If Not Connected Banner -->
      <section v-else class="not-connected-banner">
        <div class="not-connected-inner">
          <div class="alert-circle">!</div>
          <div>
            <h3>No MT5 Account Linked</h3>
            <p>Connect your MetaTrader 5 broker credentials to automatically record trades and track your edge.</p>
          </div>
          <NuxtLink to="/login" class="action-btn">
            Open MT5 Login Portal
          </NuxtLink>
        </div>
      </section>

      <!-- Key Performance Metrics Grid -->
      <section class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Net Profit / Loss</span>
          <div class="stat-value text-green">+$4,820.50</div>
          <span class="stat-change positive">+12.4% this month</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Win Rate</span>
          <div class="stat-value">68.2%</div>
          <span class="stat-sub">34 wins / 16 losses</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Profit Factor</span>
          <div class="stat-value">2.41</div>
          <span class="stat-sub">Gross: $8,240 / $3,420</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Total Trades</span>
          <div class="stat-value">50</div>
          <span class="stat-sub">Avg R:R 1 : 2.2</span>
        </div>
      </section>

      <!-- Journal Trade Log -->
      <section class="journal-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">Recent Journal Entries</h2>
            <p class="section-sub">Synced trades from your MT5 terminal</p>
          </div>
          <NuxtLink to="/login" class="reconnect-link">
            MT5 Server Settings
          </NuxtLink>
        </div>

        <div class="table-container">
          <table class="trades-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Volume</th>
                <th>Open Price</th>
                <th>Close Price</th>
                <th>Profit (USD)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trade in sampleTrades" :key="trade.id">
                <td class="symbol-col">
                  <strong>{{ trade.symbol }}</strong>
                </td>
                <td>
                  <span :class="['type-badge', trade.type.toLowerCase()]">{{ trade.type }}</span>
                </td>
                <td>{{ trade.volume }} Lots</td>
                <td>{{ trade.openPrice }}</td>
                <td>{{ trade.closePrice }}</td>
                <td :class="['profit-col', trade.profit >= 0 ? 'text-green' : 'text-red']">
                  {{ trade.profit >= 0 ? '+' : '' }}${{ trade.profit.toFixed(2) }}
                </td>
                <td>
                  <span class="status-badge closed">Closed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const { account, logout } = useMt5Auth()

const handleLogout = async () => {
  logout()
  await navigateTo('/login')
}

const sampleTrades = [
  { id: '101', symbol: 'EURUSD', type: 'BUY', volume: '1.00', openPrice: '1.08450', closePrice: '1.08920', profit: 470.00 },
  { id: '102', symbol: 'XAUUSD', type: 'BUY', volume: '0.50', openPrice: '2730.10', closePrice: '2748.50', profit: 920.00 },
  { id: '103', symbol: 'NAS100', type: 'SELL', volume: '0.20', openPrice: '20450.0', closePrice: '20310.0', profit: 280.00 },
  { id: '104', symbol: 'GBPUSD', type: 'SELL', volume: '1.00', openPrice: '1.29800', closePrice: '1.30050', profit: -250.00 },
  { id: '105', symbol: 'BTCUSD', type: 'BUY', volume: '0.10', openPrice: '68200.0', closePrice: '69450.0', profit: 1250.00 }
]
</script>

<style scoped>
.dashboard-wrapper {
  min-height: 100vh;
  background-color: #0b0f17;
  color: #e2e8f0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(15, 23, 36, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(12px);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-mark {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, rgba(0, 210, 106, 0.2), rgba(0, 180, 216, 0.2));
  border: 1px solid rgba(0, 210, 106, 0.4);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-icon {
  width: 20px;
  height: 20px;
  color: #00d26a;
}

.brand-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.badge-tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  background: rgba(0, 210, 106, 0.12);
  border: 1px solid rgba(0, 210, 106, 0.3);
  color: #00d26a;
  border-radius: 12px;
  font-weight: 600;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.account-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.825rem;
  color: #cbd5e1;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: #00d26a;
  border-radius: 50%;
  box-shadow: 0 0 8px #00d26a;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  padding: 0.45rem 0.8rem;
  border-radius: 8px;
  font-size: 0.825rem;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #f87171;
}

.btn-icon {
  width: 15px;
  height: 15px;
}

.connect-btn,
.action-btn {
  background: #00d26a;
  color: #071910;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.connect-btn:hover,
.action-btn:hover {
  background: #05e073;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.connected-banner {
  background: linear-gradient(135deg, rgba(16, 26, 40, 0.9) 0%, rgba(13, 20, 31, 0.9) 100%);
  border: 1px solid rgba(0, 210, 106, 0.2);
  border-radius: 14px;
  padding: 1.5rem 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.live-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #00d26a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
}

.pulse-circle {
  width: 7px;
  height: 7px;
  background-color: #00d26a;
  border-radius: 50%;
  box-shadow: 0 0 6px #00d26a;
}

.welcome-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #ffffff;
}

.welcome-sub {
  font-size: 0.9rem;
  color: #94a3b8;
  margin: 0;
}

.switch-account-link {
  color: #00d26a;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(0, 210, 106, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.switch-account-link:hover {
  background: rgba(0, 210, 106, 0.1);
}

.not-connected-banner {
  background: rgba(30, 41, 59, 0.5);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
}

.not-connected-inner {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}

.alert-circle {
  width: 36px;
  height: 36px;
  background: #f59e0b;
  color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.stat-card {
  background: rgba(18, 26, 38, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 1.25rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stat-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0.3rem 0;
}

.text-green {
  color: #00d26a;
}

.text-red {
  color: #f87171;
}

.stat-change.positive {
  font-size: 0.775rem;
  color: #00d26a;
}

.stat-sub {
  font-size: 0.775rem;
  color: #64748b;
}

.journal-section {
  background: rgba(18, 26, 38, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 0.2rem 0;
  color: #ffffff;
}

.section-sub {
  font-size: 0.825rem;
  color: #64748b;
  margin: 0;
}

.reconnect-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.825rem;
}

.reconnect-link:hover {
  color: #ffffff;
}

.table-container {
  overflow-x: auto;
}

.trades-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.875rem;
}

.trades-table th {
  padding: 0.75rem 1rem;
  color: #64748b;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.trades-table td {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.type-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.725rem;
  font-weight: 700;
}

.type-badge.buy {
  background: rgba(0, 210, 106, 0.15);
  color: #00d26a;
}

.type-badge.sell {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
}

.status-badge.closed {
  font-size: 0.75rem;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}
</style>

