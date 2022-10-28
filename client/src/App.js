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
        <Route path="/" exact component={HomeWrapper} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/register" exact component={RegisterScreen} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
