import React from 'react';
import ReactDOM from 'react-dom/client';

//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider} from 'react-redux';
import store from './store.js';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import FilterScreen from './screens/FilterScreen.jsx';
import ProgresoScreen from './screens/progresoScreen.jsx';

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}></Route>
      <Route path='/filter' element={<FilterScreen/>}></Route>
      <Route path='/progreso' element={<ProgresoScreen/>}></Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
     </Provider>
  </React.StrictMode>
);

reportWebVitals();
