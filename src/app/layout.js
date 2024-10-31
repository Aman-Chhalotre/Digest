"use client";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Navbar from "@/components/Navbar"
import './globals.css'
import Footer from '@/components/Footer';
import { ThemeProvider } from '../context/theme.js';
import { useEffect, useState } from 'react';
// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// }

export default function RootLayout({ children }) {
  const [themeMode, setThemeMode] = useState("light")

  const darkTheme = () =>{
    setThemeMode("dark")
  }

  const lightTheme = () =>{
    setThemeMode("light")
  }

  useEffect(()=>{
    document.querySelector("html").classList.remove( "dark","light")
    document.querySelector("html").classList.add( themeMode)
  },[themeMode])

  return (
    <html lang="en">
      <body className='bg-white dark:bg-black'>
        <AppRouterCacheProvider>
        <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
          <Navbar/>
          {children}
          <Footer/>
        </ThemeProvider>  
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
