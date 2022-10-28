import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeWrapper from './components/screens/HomeWrapper';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" exact element={<HomeWrapper/>} />
        <Route path="/login" exact element={<LoginScreen/>} />
        <Route path="/register" exact element={<RegisterScreen/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
