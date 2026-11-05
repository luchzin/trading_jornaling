# MT5 Trading Journal & Portfolio Compounding System

A clean, modern trading journal and capital growth management web application built with **Nuxt 4**, **Vue 3**, and **Tailwind CSS v4**.

Designed to help forex and gold (XAUUSD) traders manage portfolio risk, systematically compound capital, hit milestone targets, and maintain trading discipline with structured withdrawal rewards.

---

## 🎯 Project Goal

The primary objective of this project is to move beyond simple trade recording by providing an active **Portfolio Management System based on Progressive Compounding Strategies**:

1. **Systematic Capital Scale-Up**: Rather than gambling or arbitrary lot sizing, capital is compounded across structured milestone stages (from a base capital of **$300 – $1,000** up to a final **$10,000+** balance).
2. **Disciplined Risk Management**: Strictly controlled risk-per-trade parameters (5% to 20% max), fixed 1:2 Risk-to-Reward targets (e.g. 50 pips SL / 100 pips TP on XAUUSD), and predetermined 5-step position sizing.
3. **Structured Trader Cashout Rewards**: Each completed compounding stage rewards the trader with planned profit withdrawals (**$1,000** &rarr; **$2,000** &rarr; **$3,000** &rarr; **$9,000** = **$15,000 Total**), preventing greed and locking in tangible profits.

---

## ✨ Key Features

### 1. MetaTrader 5 (MT5) Account Connection
- **Trader Login Portal**: Secure input for **MT5 Server Name**, **Account Number / Login ID**, and **Trader Password** (with show/hide toggle).
- **Popular Broker Quick-Select**: One-click fill for `MetaQuotes-Demo`, `FTMO-Demo`, `ICMarketsSC-Live`, and `Exness-Real`.
- **Instant Redirection**: Automatically authenticates session credentials and routes directly to `/`.

### 2. Scale Up Compound Strategy Engine
- Based on the customized **4-Stage XAUUSD Scaling Model**:
  - **Challenge Part 1**: Base $1,000 &rarr; Target $2,000 &bull; **Withdrawal Reward: $1,000**
  - **Part 2**: Base $1,000 &rarr; Target $3,000 &bull; **Withdrawal Reward: $2,000**
  - **Part 3**: Base $1,000 &rarr; Target $5,000 &bull; **Withdrawal Reward: $3,000**
  - **Part 4**: Base $2,000 &rarr; Target $10,000 &bull; **Withdrawal Reward: $9,000**
  - **Withdrawal Roadmap**: Complete breakdown totaling **$15,000** in cashout rewards from a $300 initial baseline.
- **5-Step Compounding Matrix Table**: Live view of Lot Size, Risk ($), Stop Loss, Take Profit, Growth on Account (GOA %), and Account Balance progression.

### 3. Performance Analytics & Infographics
- **Equity Growth Curve**: SVG area chart visualizing portfolio trajectory from $10,000 baseline to current equity milestones.
- **Win / Loss Distribution Donut**: Visual 68% win rate breakdown with Buy (Long) vs Sell (Short) directional execution rates.
- **Summary Metrics**: High-contrast cards for Net P&L, Win Rate, Profit Factor, and Total Trades with mini sparklines and ratio gauges.

### 4. Trade Logs & Recent Trades
- **Homepage Recent Trades**: Compact overview of latest closed positions with quick access to full history.
- **Dedicated Trade Logs (`/logs`)**: High-density tabular view with Ticket #, Open Time, Symbol, Type, Volume, Open/Close Prices, and P&L.
- **Instant Filtering & Search**: Filter by *All*, *Wins*, *Losses*, *Buy*, *Sell*, or search by Symbol / Ticket.

### 5. Out-of-the-Box Bilingual Support
- **Khmer (`km`) as default** with full **English (`en`)** localization.
- Instant header toggle (`ខ្មែរ / EN`) without full page reloads, persisted via cookies and localStorage.

### 6. Clean, Non-AI-Slop Interface
- High-contrast typography and subtle 1px borders inspired by Linear and GitHub.
- Seamless **Dark & Light Mode** toggle with Tailwind CSS v4 class-based variants.

---

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) (Vue 3, Vite, SSR/SPA)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State & Storage**: Nuxt Composables (`useCookie`, `useState`, `localStorage`)
- **Typography**: Native system font stack with Khmer script support (`Kantumruy Pro`, `Battambang`, `Siemreap`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v20+` or `v22+`
- npm, pnpm, yarn, or bun

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd trading_jornaling
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
trading_jornaling/
├── app/
│   ├── app.vue                   # Root layout with theme & locale initialization
│   ├── assets/css/main.css       # Tailwind CSS v4 entry & dark mode variants
│   ├── components/
│   │   └── AppHeader.vue         # Header with branding, nav, theme & language switchers
│   ├── composables/
│   │   ├── useLocale.ts          # Bilingual translation dictionary (Khmer default + English)
│   │   ├── useMt5Auth.ts         # MT5 session cookie & authentication state
│   │   └── useTheme.ts           # Dark/Light mode switcher with persistence
│   └── pages/
│       ├── index.vue             # Dashboard, analytics, compound strategy & recent trades
│       ├── login.vue             # MT5 Trader login portal
│       └── logs.vue              # Comprehensive filtered trading logs page
├── nuxt.config.ts                # Nuxt configuration with Tailwind Vite plugin
├── package.json
└── README.md
```

---

## 📄 License

Private / Proprietary. Built for disciplined trader portfolio growth.
