import React from 'react';
import DeleteContent from '../modals/DeleteContent';
import About from './About';
import ContactUs from './ContactUs';
import Faq from './Faq';
import DeleteAccount from '../modals/DeleteAccount';
import HeroSection from './HeroSection';


export default function HomeWrapper() {
    console.log("in home wrapper");
    return (
        <div>
            <DeleteAccount/>
            <HeroSection/>
        </div>
    )
  }