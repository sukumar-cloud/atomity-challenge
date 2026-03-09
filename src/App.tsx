// src/App.tsx

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles/global.css'
import { useDarkMode } from './hooks/useDarkMode'
import { useClusterData } from './hooks/useClusterData'
import { Hero } from './components/Hero'
import { CostExplorer } from './components/CostExplorer'
import { ThemeToggle } from './components/ThemeToggle'
import { LoadingState, ErrorState } from './components/States'
import { CLUSTERS } from './data/clusters'

const queryClient = new QueryClient()

function AppContent() {
  const { isDark, toggle } = useDarkMode()
  const { data, isLoading, isError, error } = useClusterData()

  // Use API data when available, fallback to static data
  const clusters = data ?? CLUSTERS

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      <ThemeToggle isDark={isDark} onToggle={toggle} />
      <Hero />
      <main>
        {isLoading && <LoadingState />}
        {isError && <ErrorState message={(error as Error).message} />}
        <CostExplorer clusters={clusters} />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}
