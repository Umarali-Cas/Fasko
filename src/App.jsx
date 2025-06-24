import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { routes } from './routes/routes'
import store from './store/store'
import './styles/global.scss'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  )
}

export default App
