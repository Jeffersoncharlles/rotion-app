
import { Routes } from './routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/reactQuery'
import './styles/global.scss'



export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  )
}
