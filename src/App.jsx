import AppRoutes from './Routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <AppRoutes />
      <Toaster
        position='top-right'
        containerStyle={{
          top: 12,
          right: 20,
        }}
        toastOptions={{
          className: 'text-[11px] font-normal',
        }}
      />
    </div>
  )
}

export default App
