'use client'

import Navbar from "./components/Navbar";

import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation'
import Graph from "./components/Graph";
import LoginPage from "./login/page";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Slide from "./components/Slide";
import HeroSection from "./components/HeroSection";
import SecondSection from "./components/SecondSection ";
import CareSection from "./components/CareSection";
import Footer from "./components/Footer";



export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  if(session) router.replace("/homepage");
 
  
  return (
    <>
    

    
    <Navbar/>
    
    <main  className="max-w-7xl mx-auto pt-20 px-6">

    <HeroSection/>
    <SecondSection/>
    <CareSection/>

    <Footer/>
    </main>
    
    

    {/* <Slide/> */}
    

    

   


   
   
  
    </>
  );
}
