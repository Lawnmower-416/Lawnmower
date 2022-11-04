// import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './auth';

import HomeWrapper from './components/screens/HomeWrapper';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import Faq from './components/screens/Faq';
import About from './components/screens/About';
import ContactUs from './components/screens/ContactUs';
import CommunityScreen from './components/screens/CommunityScreen';
import PasswordChange from './components/screens/PasswordChange';
import MapEditor from './components/screens/MapEditor';
import TilesetEditor from './components/screens/TilesetEditor';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>

        <Routes>
          <Route path="/" exact element={<HomeWrapper/>} />
          <Route path="/login" exact element={<LoginScreen/>} />
          <Route path="/register" exact element={<RegisterScreen/>} />
          <Route path="/faq" exact element={<Faq/>} />
          <Route path="/about" exact element={<About/>} />
          <Route path="/support" exact element={<ContactUs/>} />
          <Route path="/profile" exact element={<ProfileScreen/>} />
          <Route path="/mapEditor" exact element={<MapEditor/>} />
          <Route path="/tilesetEditor" exact element={<TilesetEditor/>} />
          <Route path="/community" exact element={<CommunityScreen/>} />
          <Route path="/change-password" exact element={<PasswordChange/>} />
        </Routes>
        
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
