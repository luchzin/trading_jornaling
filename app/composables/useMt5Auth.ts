export interface Mt5Account {
  server: string
  accountNumber: string
  isLoggedIn: boolean
  connectedAt?: string
}

export const useMt5Auth = () => {
  const accountCookie = useCookie<Mt5Account | null>('mt5_account_session', {
    default: () => null,
    watch: true,
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })

  const login = async (credentials: { server: string; accountNumber: string; password: string }) => {
    // Simulate MT5 authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    accountCookie.value = {
      server: credentials.server.trim(),
      accountNumber: credentials.accountNumber.trim(),
      isLoggedIn: true,
      connectedAt: new Date().toISOString()
    }

    return true
  }

  const logout = () => {
    accountCookie.value = null
  }

  return {
    account: accountCookie,
    login,
    logout
  }
}

