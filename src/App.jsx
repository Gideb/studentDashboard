import AppRoutes from './Routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <AppRoutes />
      <Toaster
        position='top-right'
        toastOptions={{
          className: 'text-xs font-medium',
          style: {
            borderRadius: '5px',
            padding: '4px',
          },
          success: {
            iconTheme: {
              primary: '#043927',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}

export default App
