import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import './css/icheck-bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import './css/login.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
let persistor = persistStore(store);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
