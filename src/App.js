import React from 'react';
import "./App.scss"
import Header from "./components/Header/Header";
import {Outlet } from "react-router";
import PerfectScrollbar from 'react-perfect-scrollbar'

const App = () => {
  
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header/>
      </div>
      <div className='main-container'>
        <div className='sidenav-container'></div>
        <div className='app-content'>
          <PerfectScrollbar>
            <Outlet/>
          </PerfectScrollbar>
        </div>
         
        {/* outlet dùng để xác định thay đổi theo router */}
      </div>
      
      
      
    </div>
  )

    
}

export default App;