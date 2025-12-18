import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './Component/Redux/Store.js'
import Context from './Component/AllCourseContext/Context.jsx'


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <StrictMode>
      <Context>
        <App />
      </Context>

    </StrictMode>,
  </Provider>

)

