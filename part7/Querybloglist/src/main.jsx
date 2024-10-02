import ReactDOM from 'react-dom/client'
import { NotificationContextProvider } from './NotificationContext'
import { LoginContextProvider } from './LoginContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import App from './App'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <LoginContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </LoginContextProvider>
    </QueryClientProvider>
  </Router>
)
