import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'

const error = console.error
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0]))
    return
  error(...args)
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
