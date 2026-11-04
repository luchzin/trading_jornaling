<template>
  <div class="app-root">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<style>
/* CSS Variables for Clean Dark & Light Modes */
:root,
html.dark {
  --bg-page: #0d1117;
  --bg-header: rgba(13, 17, 23, 0.85);
  --bg-card: #161b22;
  --bg-input: #0d1117;
  --bg-hover: #21262d;
  --border-color: #30363d;
  --border-hover: #484f58;
  --text-primary: #f0f6fc;
  --text-secondary: #8b949e;
  --text-muted: #6e7681;
  --accent: #2ea043;
  --accent-hover: #3fb950;
  --accent-text: #ffffff;
  --symbol-bg: #1f242c;
  --danger: #f85149;
  --danger-bg: rgba(248, 81, 73, 0.1);
  --danger-border: rgba(248, 81, 73, 0.3);
  --success-bg: rgba(46, 160, 67, 0.1);
  --success-border: rgba(46, 160, 67, 0.3);
  --table-head-bg: #161b22;
}

html.light {
  --bg-page: #f6f8fa;
  --bg-header: rgba(255, 255, 255, 0.9);
  --bg-card: #ffffff;
  --bg-input: #f6f8fa;
  --bg-hover: #f3f4f6;
  --border-color: #d0d7de;
  --border-hover: #8c959f;
  --text-primary: #1f2328;
  --text-secondary: #57604a;
  --text-muted: #656d76;
  --accent: #1a7f37;
  --accent-hover: #2da44e;
  --accent-text: #ffffff;
  --symbol-bg: #eaeef2;
  --danger: #cf222e;
  --danger-bg: rgba(207, 34, 46, 0.08);
  --danger-border: rgba(207, 34, 46, 0.25);
  --success-bg: rgba(26, 127, 55, 0.08);
  --success-border: rgba(26, 127, 55, 0.25);
  --table-head-bg: #f6f8fa;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-page);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  line-height: 1.5;
  transition: background-color 0.2s ease, color 0.2s ease;
}

a {
  color: inherit;
}
</style>
