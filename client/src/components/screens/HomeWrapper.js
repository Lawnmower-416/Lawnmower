import React from 'react';
import HomeScreen from './HomeScreen';
import Header from './Header';


export default function HomeWrapper() {
    console.log("in home wrapper");
    return (
        <div>
            <Header/>
            <HomeScreen/>
        </div>
    )
  }