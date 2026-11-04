export type Locale = 'km' | 'en'

export const translations = {
  km: {
    // Brand & Navigation
    brandTitle: 'កំណត់ហេតុ MT5',
    homeTitle: 'ទៅកាន់ទំព័រដើម (Home)',
    themeDark: 'ប្តូរទៅទម្រង់ពន្លឺ (Light)',
    themeLight: 'ប្តូរទៅទម្រង់ងងឹត (Dark)',
    langToggle: 'ប្តូរភាសា (Language)',
    disconnect: 'ផ្តាច់ការភ្ជាប់',
    connectMt5: 'ភ្ជាប់ MT5',

    // Login Portal
    loginTitle: 'ចូលគណនី MT5',
    loginSubtitle: 'ភ្ជាប់គណនី MetaTrader 5 របស់អ្នកដើម្បីកត់ត្រា និងតាមដានការជួញដូរ។',
    quickSelect: 'ជ្រើសរើសរហ័ស:',
    serverLabel: 'ឈ្មោះម៉ាស៊ីនបម្រើ (Server Name)',
    serverPlaceholder: 'ឧទាហរណ៍ ICMarketsSC-Live ឬ FTMO-Demo',
    accountLabel: 'លេខគណនី / លេខសម្គាល់ (Account ID)',
    accountPlaceholder: 'ឧទាហរណ៍ 5092143',
    passwordLabel: 'ពាក្យសម្ងាត់ (Password)',
    passwordPlaceholder: 'ពាក្យសម្ងាត់ Master ឬ Investor',
    show: 'បង្ហាញ',
    hide: 'លាក់',
    connectBtn: 'ភ្ជាប់ទៅកាន់ MT5',
    connectingBtn: 'កំពុងភ្ជាប់...',
    errorServer: 'សូមបញ្ចូលឈ្មោះ Server របស់ MT5។',
    errorAccount: 'សូមបញ្ចូលលេខគណនី MT5។',
    errorPassword: 'សូមបញ្ចូលពាក្យសម្ងាត់ MT5។',
    connectionFailed: 'ការភ្ជាប់បានបរាជ័យ។ សូមពិនិត្យព័ត៌មានសម្ងាត់ឡើងវិញ។',
    successRedirect: 'ភ្ជាប់ជោគជ័យ! កំពុងបញ្ជូនទៅទំព័រដើម...',
    backToDashboard: '← ត្រឡប់ទៅផ្ទាំងគ្រប់គ្រង',

    // Dashboard
    connectedTo: 'បានភ្ជាប់ជាមួយ',
    accountId: 'លេខគណនី',
    bridgeActive: 'MT5 ដំណើរការប្រក្រតី',
    changeAccount: 'ប្តូរគណនី',
    notConnectedTitle: 'មិនទាន់ភ្ជាប់គណនី MT5 នៅឡើយទេ',
    notConnectedDesc: 'សូមចូលគណនីដោយប្រើ Server, លេខសម្គាល់ និងពាក្យសម្ងាត់ ដើម្បីទាញយកទិន្នន័យជួញដូរ។',
    openLoginBtn: 'ភ្ជាប់ MT5 ឥឡូវនេះ',
    netPnl: 'ប្រាក់ចំណេញ/ខាតសរុប (Net P&L)',
    monthPerformance: '+12.4% ក្នុងខែនេះ',
    winRate: 'អត្រាឈ្នះ (Win Rate)',
    winLossStats: 'ឈ្នះ 34 / ចាញ់ 16',
    profitFactor: 'កត្តាចំណេញ (Profit Factor)',
    grossStats: 'ចំណូល: $8.2k / ខាត: $3.4k',
    tradesRecorded: 'ការជួញដូរសរុប (Trades)',
    avgRr: 'មធ្យមភាគ R:R 1:2.2',
    journalHeading: 'កំណត់ត្រាជួញដូរ (Trade Journal)',
    recentSync: 'ទិន្នន័យថ្មីៗពី MT5',
    colSymbol: 'រូបិយប័ណ្ណ',
    colType: 'ប្រភេទ',
    colVolume: 'ទំហំ (Lots)',
    colOpen: 'តម្លៃបើក',
    colClose: 'តម្លៃបិទ',
    colProfit: 'ចំណេញ/ខាត (USD)',
    colStatus: 'ស្ថានភាព',
    statusClosed: 'បានបិទ'
  },
  en: {
    // Brand & Navigation
    brandTitle: 'MT5 Journal',
    homeTitle: 'Go to Home (/)',
    themeDark: 'Switch to Light theme',
    themeLight: 'Switch to Dark theme',
    langToggle: 'Switch Language',
    disconnect: 'Disconnect',
    connectMt5: 'Connect MT5',

    // Login Portal
    loginTitle: 'MT5 Trader Login',
    loginSubtitle: 'Connect your MetaTrader 5 account to view and journal your trades.',
    quickSelect: 'Quick select:',
    serverLabel: 'Server Name',
    serverPlaceholder: 'e.g. ICMarketsSC-Live or FTMO-Demo',
    accountLabel: 'Account Number / Login ID',
    accountPlaceholder: 'e.g. 5092143',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Trader or investor password',
    show: 'Show',
    hide: 'Hide',
    connectBtn: 'Connect to MT5',
    connectingBtn: 'Connecting...',
    errorServer: 'Please provide your MT5 Server Name.',
    errorAccount: 'Please enter your MT5 Account Number.',
    errorPassword: 'Please enter your MT5 Password.',
    connectionFailed: 'Connection failed. Please check credentials.',
    successRedirect: 'Connected! Redirecting to /',
    backToDashboard: '← Back to Dashboard',

    // Dashboard
    connectedTo: 'Connected to',
    accountId: 'Account ID',
    bridgeActive: 'MT5 bridge operational',
    changeAccount: 'Change Account',
    notConnectedTitle: 'No MT5 account connected',
    notConnectedDesc: 'Sign in with your server, account ID, and password to view synchronized trades.',
    openLoginBtn: 'Connect MT5',
    netPnl: 'Net P&L',
    monthPerformance: '+12.4% this month',
    winRate: 'Win Rate',
    winLossStats: '34W / 16L',
    profitFactor: 'Profit Factor',
    grossStats: 'Gross: $8.2k / $3.4k',
    tradesRecorded: 'Trades Recorded',
    avgRr: 'Avg R:R 1:2.2',
    journalHeading: 'Trade Journal',
    recentSync: 'Recent MT5 sync',
    colSymbol: 'Symbol',
    colType: 'Type',
    colVolume: 'Volume',
    colOpen: 'Open Price',
    colClose: 'Close Price',
    colProfit: 'P&L (USD)',
    colStatus: 'Status',
    statusClosed: 'Closed'
  }
}

export type TranslationKey = keyof typeof translations.en

export const useLocale = () => {
  // Khmer as default ('km')
  const localeCookie = useCookie<Locale>('app_locale', {
    default: () => 'km',
    maxAge: 60 * 60 * 24 * 365 // 1 year
  })

  const currentLocale = useState<Locale>('current_locale', () => localeCookie.value || 'km')

  const setLocale = (lang: Locale) => {
    currentLocale.value = lang
    localeCookie.value = lang
    if (import.meta.client) {
      localStorage.setItem('locale', lang)
      document.documentElement.setAttribute('lang', lang)
    }
  }

  const toggleLocale = () => {
    setLocale(currentLocale.value === 'km' ? 'en' : 'km')
  }

  const t = (key: TranslationKey): string => {
    const lang = currentLocale.value || 'km'
    return translations[lang]?.[key] || translations.en[key] || key
  }

  const initLocale = () => {
    if (import.meta.client) {
      const saved = (localStorage.getItem('locale') as Locale | null) || localeCookie.value
      if (saved === 'en' || saved === 'km') {
        setLocale(saved)
      } else {
        setLocale('km')
      }
    }
  }

  return {
    locale: currentLocale,
    setLocale,
    toggleLocale,
    t,
    initLocale
  }
}

