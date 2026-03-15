import { StrictMode, Component, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'

class ErrorBoundary extends Component<{children: ReactNode}, {error: Error | null}> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) { return { error }; }
  componentDidCatch(error: Error, info: any) { console.error('EB caught:', error, info.componentStack); }
  render() {
    if (this.state.error) return <div style={{color:'red', background:'white', padding:20, zIndex:99999, position:'fixed', inset:0, overflow:'auto'}}><h1 id="error-title">React Error</h1><pre id="error-stack">{String(this.state.error.stack)}</pre></div>;
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
