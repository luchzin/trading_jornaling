<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- Status Bar: Shows MT5 Connection state -->
      <section v-if="account?.isLoggedIn" class="panel connection-panel">
        <div class="connection-left">
          <span class="status-indicator"></span>
          <div>
            <div class="panel-heading">Connected to {{ account.server }}</div>
            <div class="panel-sub">Account ID: #{{ account.accountNumber }} &bull; MT5 bridge operational</div>
          </div>
        </div>
        <NuxtLink to="/login" class="btn-subtle">
          Change Account
        </NuxtLink>
      </section>

      <section v-else class="panel empty-panel">
        <div>
          <div class="panel-heading">No MT5 account connected</div>
          <div class="panel-sub">Sign in with your server, account ID, and password to view synchronized trades.</div>
        </div>
        <NuxtLink to="/login" class="btn-primary">
          Connect MT5
        </NuxtLink>
      </section>

      <!-- Clean Metrics Row -->
      <section class="metrics-grid">
        <div class="metric-card">
          <span class="metric-title">Net P&L</span>
          <span class="metric-value text-green">+$4,820.50</span>
          <span class="metric-meta">+12.4% this month</span>
        </div>
        <div class="metric-card">
          <span class="metric-title">Win Rate</span>
          <span class="metric-value">68.0%</span>
          <span class="metric-meta">34W / 16L</span>
        </div>
        <div class="metric-card">
          <span class="metric-title">Profit Factor</span>
          <span class="metric-value">2.41</span>
          <span class="metric-meta">Gross: $8.2k / $3.4k</span>
        </div>
        <div class="metric-card">
          <span class="metric-title">Trades Recorded</span>
          <span class="metric-value">50</span>
          <span class="metric-meta">Avg R:R 1:2.2</span>
        </div>
      </section>

      <!-- Recent Trades Journal Table -->
      <section class="panel table-panel">
        <div class="table-header">
          <h2 class="table-title">Trade Journal</h2>
          <span class="table-caption">Recent MT5 sync</span>
        </div>

        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Volume</th>
                <th>Open Price</th>
                <th>Close Price</th>
                <th>P&L (USD)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trade in sampleTrades" :key="trade.id">
                <td class="font-mono"><strong>{{ trade.symbol }}</strong></td>
                <td>
                  <span :class="['tag', trade.type.toLowerCase()]">{{ trade.type }}</span>
                </td>
                <td class="font-mono">{{ trade.volume }}</td>
                <td class="font-mono">{{ trade.openPrice }}</td>
                <td class="font-mono">{{ trade.closePrice }}</td>
                <td :class="['font-mono', trade.profit >= 0 ? 'text-green' : 'text-red']">
                  {{ trade.profit >= 0 ? '+' : '' }}${{ trade.profit.toFixed(2) }}
                </td>
                <td><span class="tag tag-neutral">Closed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const { account } = useMt5Auth()

const sampleTrades = [
  { id: '101', symbol: 'EURUSD', type: 'BUY', volume: '1.00', openPrice: '1.08450', closePrice: '1.08920', profit: 470.00 },
  { id: '102', symbol: 'XAUUSD', type: 'BUY', volume: '0.50', openPrice: '2730.10', closePrice: '2748.50', profit: 920.00 },
  { id: '103', symbol: 'NAS100', type: 'SELL', volume: '0.20', openPrice: '20450.0', closePrice: '20310.0', profit: 280.00 },
  { id: '104', symbol: 'GBPUSD', type: 'SELL', volume: '1.00', openPrice: '1.29800', closePrice: '1.30050', profit: -250.00 },
  { id: '105', symbol: 'BTCUSD', type: 'BUY', volume: '0.10', openPrice: '68200.0', closePrice: '69450.0', profit: 1250.00 }
]
</script>

<style scoped>
.page-container {
  min-height: calc(100vh - 55px);
  padding: 1.5rem 1.25rem 3rem;
}

.content-wrapper {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.panel {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem 1.25rem;
}

.connection-panel,
.empty-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.connection-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-indicator {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #10b981;
  flex-shrink: 0;
}

.panel-heading {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.panel-sub {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.btn-primary {
  background: var(--accent);
  color: var(--accent-text);
  text-decoration: none;
  font-size: 0.825rem;
  font-weight: 500;
  padding: 0.45rem 0.9rem;
  border-radius: 6px;
  transition: background 0.15s;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.btn-subtle {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.8rem;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  transition: all 0.15s;
}

.btn-subtle:hover {
  color: var(--text-primary);
  border-color: var(--border-hover);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.metric-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
}

.metric-title {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.metric-value {
  font-size: 1.45rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0.2rem 0;
  font-variant-numeric: tabular-nums;
}

.metric-meta {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.text-green {
  color: #10b981;
}

.text-red {
  color: #ef4444;
}

.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.85rem;
}

.table-panel {
  padding: 0;
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.table-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.table-caption {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.table-wrap {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th {
  background: var(--table-head-bg);
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.7rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.data-table td {
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
  font-size: 0.85rem;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.tag {
  display: inline-block;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.tag.buy {
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
}

.tag.sell {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
}

.tag-neutral {
  background: var(--bg-hover);
  color: var(--text-muted);
}
</style>
