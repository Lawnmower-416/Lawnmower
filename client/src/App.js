// import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store';
import { EditorContextProvider } from './editor';

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
import ExpandedCommunityScreen from './components/screens/ExpandedCommunityScreen';
import Header from './components/screens/Header';
import VerifiedAccountScreen from './components/screens/VerifiedAccountScreen';
import PasswordChangedScreen from "./components/screens/PasswordChangedScreen";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GlobalStoreContextProvider>
          <EditorContextProvider>

            <Routes>
              <Route path="/" exact element={<HomeWrapper/>} />
              <Route path="/login" exact element={<LoginScreen/>} />
              <Route path="/register" exact element={<RegisterScreen/>} />
              <Route path="/faq" exact element={<Faq/>} />
              <Route path="/about" exact element={<About/>} />
              <Route path="/support" exact element={<ContactUs/>} />
              <Route path="/profile/:userId" exact element={<ProfileScreen/>} />
              <Route path="/mapEditor/:mapId" exact element={<MapEditor/>} />
              <Route path="/tilesetEditor/:tilesetId" exact element={<TilesetEditor/>} />
              <Route path="/community" exact element={<CommunityScreen/>} />
              <Route path="/change-password" exact element={<PasswordChange/>} />
              <Route path="/expandedcommunity" component={() => { window.location.replace('https://ephemeral-vacherin-baeb54.netlify.app/expandedcommunity'); } }/>
              <Route path="/verified-account" exact element={<VerifiedAccountScreen/>} />
              <Route path="/verified-password-change" exact element={<PasswordChangedScreen/>} />
              <Route path="*" element={
              <div>
                <Header />
                <h1>Error...</h1>
              </div>} />
            </Routes>

          </EditorContextProvider>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
