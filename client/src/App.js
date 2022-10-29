// import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeWrapper from './components/screens/HomeWrapper';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" exact element={<HomeWrapper />} />
        <Route path="/login" exact element={<LoginScreen />} />
        <Route path="/register" exact element={<RegisterScreen />} />
        <Route path="/profile" exact element={<ProfileScreen />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
